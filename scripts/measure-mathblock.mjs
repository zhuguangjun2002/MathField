// 量 .math-block（MathBlock 渲染出来的独立成行公式）有没有横向溢出。
// 该样式是 overflow-x:auto，一超宽就只剩一条细滚动条，公式右半截读者根本看不见
// （曾经"② 用乘积卡住 a、b"那条的 "= ∛125 = 5" 就这么被吃掉过）。
// 会自动点开页面上所有 RevealBox，否则折叠着的推导量不到。
//
//   node scripts/measure-mathblock.mjs                    # 全站所有讲，1280px 桌面宽
//   node scripts/measure-mathblock.mjs /calculus/taylor   # 单页，逐个宽度档
//
// 前置：先起 dev server（npm run dev -- --port 5191 --strictPort），并装有 playwright。
// 本机 playwright 在 npx 缓存里，故下面按需回退到那个路径；系统 chrome 用 channel:'chrome'。
//
// 超宽了怎么办：① \begin{aligned} 按等号断行（&= 对齐）；② 把公式尾巴上的中文注释
// （\text{（辐角相加）}）挪回正文；③ 实在断不开就拆成两个 MathBlock。
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  ;({ chromium } = await import(
    '/home/laozhu/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs'
  ))
}

const BASE = process.env.BASE_URL || 'http://localhost:5191'
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const one = process.argv[2]
const WIDTHS = [1440, 1280, 1024, 820, 640, 390]

const routes = one
  ? [one]
  : [...readFileSync(path.join(ROOT, 'src/router.js'), 'utf8').matchAll(/path: '([^']+)'/g)]
      .map((m) => m[1])
      .filter((p) => p.split('/').length > 2)

const browser = await chromium.launch({ channel: 'chrome' })
let bad = 0

for (const w of one ? WIDTHS : [1280]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } })
  for (const r of routes) {
    await page.goto(BASE + '/#' + r, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(900)
    // 折叠框里的公式也要量：全部点开
    const btns = page.locator('.reveal .reveal-btn')
    for (let k = 0, n = await btns.count(); k < n; k++) await btns.nth(k).click()
    await page.waitForTimeout(300)
    const rows = await page.$$eval('.math-block', (els) =>
      els.map((el) => ({
        over: el.scrollWidth - el.clientWidth,
        client: el.clientWidth,
        scroll: el.scrollWidth,
        text: el.innerText.replace(/\s+/g, ' ').slice(0, 44),
      })),
    )
    for (const x of rows) {
      if (x.over > 0) bad++
      if (x.over > 0 || one)
        console.log(
          `${String(w).padStart(5)}px  ${x.over > 0 ? '溢出 ' + String(x.over).padStart(3) + 'px' : '合适       '}  (${x.scroll}/${x.client})  ${one ? '' : r + '  '}${x.text}`,
        )
    }
  }
  await page.close()
}

console.log(`\n共 ${bad} 块溢出${one ? '' : '（1280px 桌面宽）'}`)
await browser.close()
