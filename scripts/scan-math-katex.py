#!/usr/bin/env python3
"""扫全站（python3 scripts/scan-math-katex.py）：找出「渲染给用户看、但没走 KaTeX」的公式。

思路：
- .vue 只看 <template> 段（script 里的 ^ _ 是代码，不是公式）
- 先抠掉 <MathInline .../> <MathBlock .../> 整个标签（那些已经是 KaTeX）
- 再抠掉 {{ ... }} 插值（里面是 JS 表达式）
- 剩下的可见散文里，凡出现下列信号即报：
    ^  脱字符指数        _  下划线下标（x_n）
    √  裸根号            {} 花括号（e^{...} 残留）
    ∫ ∑ ∏ ∮ ∂ ∇ 等大符号（Unicode 大算符在正文里排版很差）
    \frac \sqrt 等裸 TeX 命令（没包进 tex 属性）
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / 'src'

SIGNALS = [
    ('caret', re.compile(r'\^')),
    ('subscript', re.compile(r'[A-Za-zα-ωΑ-Ω0-9)]_[A-Za-z0-9({]')),
    ('sqrt', re.compile(r'√')),
    ('bigop', re.compile(r'[∫∑∏∮∂∇⨁⊗]')),
    ('rawtex', re.compile(r'\\(frac|sqrt|sum|int|cdot|alpha|beta|lambda|partial|to|le|ge|infty)')),
    ('brace', re.compile(r'\{[^{}]*\}')),   # 已排除 {{ }} 插值
]

TAG_MATH = re.compile(r'<Math(Inline|Block)\b[^>]*/?>', re.S)
TAG_MATH_PAIR = re.compile(r'<Math(Inline|Block)\b.*?</Math\1>', re.S)
# QuizBox 的 question/hint/options 全部经 RichText 走 KaTeX（同 courses.js 文案字段），
# 里面的 $...$、{ } 不是泄漏；整个标签（含多行 props）抠掉，保留行数以免行号错位
TAG_QUIZ = re.compile(r'<QuizBox\b.*?/>', re.S)
INTERP = re.compile(r'\{\{.*?\}\}', re.S)
VBIND = re.compile(r'\s(?::|v-)[\w:.-]+="[^"]*"')     # :min="0.4" v-model=... 等绑定值是 JS
TEXTAG = re.compile(r'\btex="[^"]*"')

def template_of(text, path):
    if path.suffix != '.vue':
        return None
    m = re.search(r'<template>(.*)</template>', text, re.S)
    return m.group(1) if m else None

def scan_vue(path):
    text = path.read_text(encoding='utf-8')
    tpl = template_of(text, path)
    if tpl is None:
        return []
    # 行号基准：模板起始行
    start_line = text[:text.index(tpl)].count('\n') + 1
    tpl = TAG_QUIZ.sub(lambda m: '\n' * m.group(0).count('\n'), tpl)
    hits = []
    for i, line in enumerate(tpl.split('\n')):
        clean = TAG_MATH_PAIR.sub(' ', line)
        clean = TAG_MATH.sub(' ', clean)
        clean = TEXTAG.sub(' ', clean)
        clean = INTERP.sub(' ', clean)
        clean = VBIND.sub(' ', clean)
        clean = re.sub(r'<[^>]*>', ' ', clean)      # 剩余 HTML 标签
        found = [name for name, rx in SIGNALS if rx.search(clean)]
        if found:
            hits.append((start_line + i, ','.join(found), line.strip()))
    return hits

def scan_courses():
    """courses.js：只有 intro / timeline title,text / concept subtitle,question 接了 RichText。
    其余字段（如 title）里写 $...$ 会原样显示；反过来这些字段里出现 ^ _ √ 也没人渲染。"""
    p = ROOT / 'data' / 'courses.js'
    out = []
    for i, line in enumerate(p.read_text(encoding='utf-8').split('\n'), 1):
        if re.search(r"[\^√∫∑∏]", line) and '$' not in line:
            out.append((i, 'no-katex', line.strip()))
        m = re.match(r"\s*(\w+):\s*'", line)
        if m and '$' in line and m.group(1) not in {
                'intro', 'title', 'text', 'subtitle', 'question'}:
            out.append((i, 'dollar-in-unwired-field:' + m.group(1), line.strip()))
    return out

total = 0
for path in sorted(ROOT.rglob('*.vue')):
    hits = scan_vue(path)
    if hits:
        print(f'\n=== {path.relative_to(ROOT)}')
        for ln, kind, src in hits:
            print(f'  {ln:4d} [{kind}] {src[:150]}')
            total += 1
ch = scan_courses()
if ch:
    print('\n=== data/courses.js')
    for ln, kind, src in ch:
        print(f'  {ln:4d} [{kind}] {src[:150]}')
        total += 1
print(f'\n合计 {total} 处可疑')
