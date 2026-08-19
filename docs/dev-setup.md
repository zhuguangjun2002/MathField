# 开发环境搭建

> 换机器 / 新装系统时照着做。写给人，也写给 Claude Code——每条命令都可以直接执行。
> 原始环境是 Windows + WSL2 + Ubuntu（6 核 / 8GB），2026-08-19 迁移到原生 Ubuntu 26.04。

## 这个项目需要什么

纯前端静态站：Vue 3 + Vite + vue-router（hash 路由）+ KaTeX，交互动画是**手写 Canvas 2D**。
没有原生模块、没有需要编译的扩展、没有数据库、没有后端服务。

因此**不需要**装：CUDA / NVIDIA 驱动（Canvas 2D 与 headless 截图都走 CPU 软件光栅化，
GPU 一块都用不上）、Docker、任何 Python 第三方包、playwright 自带的那份 chromium。

硬件上只有内存和核心数影响体验（`vite build` 要过 40 讲的页面，playwright 体检脚本
要逐页起浏览器）。8GB / 6 核已经够用，更多只是更快。

## 一、系统依赖

```bash
sudo apt update
sudo apt install -y git curl build-essential python3
```

`scripts/scan-math-katex.py` 只用 `re / sys / pathlib` 标准库，**不需要 pip 装任何东西**。

## 二、Node 22

`.node-version` 写的是 **22**，Cloudflare Pages 的构建环境也按它取版本，本地保持一致最省事
（更高版本如 26 实测也能构建，但没必要制造差异）。用 nvm 装，避免和系统包管理器打架：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc          # zsh 用户改 source ~/.zshrc
nvm install 22 && nvm use 22
nvm alias default 22
node -v                   # 期望 v22.x
```

## 三、Google Chrome（必装，不能用 chromium 代替）

两个体检脚本用 `chromium.launch({ channel: 'chrome' })` 启动**系统装的 Chrome**；
CLAUDE.md 里的截图检查也用它。`channel: 'chrome'` 找的是 `google-chrome` 这个可执行文件，
发行版的 `chromium` / snap 版路径对不上。

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb
google-chrome --version   # 期望 Google Chrome 1xx.x
```

## 四、中文字体（最容易漏的一条）

Ubuntu 桌面版一般自带；**server / minimal / 容器镜像里没有**，
后果是 headless 截图和 playwright 量出来的页面全是豆腐块，宽度数据也跟着失真。

```bash
sudo apt install -y fonts-noto-cjk
fc-list :lang=zh | wc -l   # 不为 0 才算装好
```

## 五、拉代码

```bash
git clone git@github.com:zhuguangjun2002/MathField.git mathfield
cd mathfield
npm ci                     # 不要用 npm install，锁定 package-lock.json
```

`node_modules/`（约 250MB）、`dist/`、`.wrangler/` 都在 `.gitignore` 里，
**不要从旧机器拷贝**，重装即可。

SSH key 若没迁移，就在新机 `ssh-keygen -t ed25519 -C "zhuguangjun2002@gmail.com"`
生成后把公钥加到 GitHub；或先用 HTTPS clone。git 身份：

```bash
git config --global user.name  zhuguangjun2002
git config --global user.email zhuguangjun2002@163.com
```

## 六、验收（每一条都跑一遍，对上预期才算搭好）

```bash
npx vite build
```
预期：`✓ built in ~3s`，无报错。

```bash
python3 scripts/scan-math-katex.py
```
预期：**合计 5 处可疑**——这 5 处是刻意保留的，不是待办：
站标 logo 的 `∫`（App.vue）、三处「句子在讨论这个符号本身」
（NewtonMethodDemo 的"计算器芯片不认识 √ 这个符号"、FTCView 的"共用一个 ∫ 记号"、
PdeIntroView 的"∂ 这个弯尾巴的 d"）、以及 WaveView 里一条被误报的 `MathBlock`。
**多于 5 处就是新引入的欠账**，逐条按 CLAUDE.md「公式书写约定」处理。

另外两个脚本要先起 dev server（另开一个终端，端口写死 5191）：

```bash
npm run dev -- --port 5191 --strictPort
```

```bash
node scripts/measure-readout.mjs      # 预期：共 0 条溢出（1280px 桌面宽）
node scripts/measure-mathblock.mjs    # 预期：共 0 块溢出（1280px 桌面宽）
```

最后截一张图确认渲染（中文不是方块、公式排出来了）：

```bash
google-chrome --headless=new --no-sandbox --screenshot=/tmp/shot.png \
  --window-size=1280,4200 --virtual-time-budget=8000 \
  'http://localhost:5191/#/calculus/limit'
```

## 七、部署凭据（只在要手动部署时才需要）

本仓库已接 Cloudflare Pages 的 Git 集成，**`git push origin master` 即自动构建上线**，
日常开发不需要任何 Cloudflare 凭据。只有要走应急的手动部署（`npm run deploy`）时才：

```bash
npx wrangler login    # 浏览器 OAuth；无图形界面的机器改用 CLOUDFLARE_API_TOKEN 环境变量
```

查某次 push 有没有上线：
`npx wrangler pages deployment list --project-name=mathfield`，看 Source 列的 commit。

## 八、排错

| 症状 | 原因与处理 |
|---|---|
| 截图/量宽结果里中文是豆腐块 | 缺 `fonts-noto-cjk`，见第四节 |
| 脚本报 `Cannot find module 'playwright-core'` | 没跑 `npm ci`，或跑成了别的目录 |
| 脚本报找不到 chrome / `channel: 'chrome'` 启动失败 | 只装了 chromium 或 snap 版，按第三节装官方 `.deb` |
| 脚本卡住不出结果 | dev server 没起在 **5191**，或没加 `--strictPort` 被顶到了别的端口 |
| `npm run dev` 报端口被占 | `pgrep -af "port 5191"` 找出残留进程再杀；注意别用 `pkill -f` 匹配到自己的命令行 |
| headless Chrome 在有 NVIDIA 卡的机器上启动异常 | 加 `--disable-gpu`；本项目不需要 GPU 加速 |

## 九、WSL 与原生 Ubuntu 的差异

从 WSL2 迁到原生系统，项目侧没有需要改的东西。只有两处习惯变了：

- **不再需要 `networkingMode=mirrored` 那套端口转发**，`localhost:5191` 直接就是本机的。
  `vite.config.js` 里的 `server.host: true` 保留着无妨（局域网内其他设备也能访问）。
- **不再有 `/mnt/c` 跨文件系统的性能陷阱**——原来项目放在 WSL 原生盘上才快，现在无所谓。
