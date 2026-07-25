// 量 .demo-readout 有没有横向溢出（该样式是 white-space:nowrap + overflow-x:auto，
// 一超宽就变成要拖滚动条才看得全，读者往往根本不知道右边还有内容）。
//
//   node scripts/measure-readout.mjs                     # 全站所有讲，1280px 桌面宽
//   node scripts/measure-readout.mjs /calculus/derivative # 单页，逐个宽度档
//
// 前置：先起 dev server（npm run dev -- --port 5191 --strictPort），并装有 playwright。
// 本机 playwright 在 npx 缓存里，故下面按需回退到那个路径；系统 chrome 用 channel:'chrome'。
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
    const rows = await page.$$eval('.demo-readout', (els) =>
      els.map((el) => ({
        over: el.scrollWidth - el.clientWidth,
        client: el.clientWidth,
        scroll: el.scrollWidth,
        text: el.innerText.replace(/\s+/g, ' ').slice(0, 52),
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

console.log(`\n共 ${bad} 条溢出${one ? '' : '（1280px 桌面宽）'}`)
await browser.close()
