# Sudoku Pro

一个基于纯 HTML/CSS/JavaScript 的数独游戏，支持经典模式和杀手模式，内置 PWA 支持，可安装到手机主屏幕离线游玩。

## 在线体验

**https://yulivu.github.io/sudoku/**

## 功能特性

### 两种游戏模式
- **经典数独** — 标准 9×9 数独，预填部分数字，玩家补全剩余
- **杀手数独** — 全空棋盘，玩家需同时满足数独规则和笼子内数字之和约束

### 三种难度
| 难度 | 挖空率 | 血量 |
|------|--------|------|
| 简单 | 55%    | 5 ❤️ |
| 中等 | 68%    | 4 ❤️ |
| 困难 | 82%    | 3 ❤️ |

### 核心机制
- **血量系统** — 填错数字扣一滴血，血量耗尽游戏结束；困难模式仅 3 滴血
- **计时器** — 正向计时，支持暂停/继续
- **笔记模式** — 在空格中标记候选数字
- **撤销** — 支持 Ctrl+Z 撤销操作（含血量恢复）
- **提示** — 自动填入一个正确数字
- **冲突检测** — 实时高亮行/列/宫内的重复数字
- **自动跳格** — 填入正确数字后自动选中下一个空格
- **存档/读档** — 游戏进度自动保存到 localStorage，刷新不丢失

### 操作方式
- **鼠标/触屏** — 点击格子选中，点击数字键盘输入
- **键盘** — 方向键移动、数字键输入、N 切换笔记、Delete 擦除、P/Esc 暂停、Ctrl+Z 撤销

### 视觉体验
- 淡色系/冷色系主题
- 错误输入震动动画
- 扣血心碎动画
- 杀手模式笼子使用图着色算法，相邻笼子颜色一定不同

### PWA 支持
- 可安装到手机/桌面主屏幕
- 离线游玩（Service Worker 网络优先策略 + 缓存回退）

## 技术栈

- 纯 HTML + CSS + JavaScript，无任何外部依赖
- 响应式设计，适配 320px ~ 768px+ 各种屏幕
- Service Worker 实现 PWA 离线支持

## 项目结构

```
sudoku/
├── index.html      # 主页面（HTML + CSS + JS 全部内联）
├── sounds.js       # 音效清单（由 build-sounds.js 自动生成）
├── build-sounds.js # 音效扫描脚本
├── manifest.json   # PWA 配置文件
├── sw.js           # Service Worker
├── sudoku.png      # 应用图标
├── icon-192.png    # PWA 图标 192px
├── icon-512.png    # PWA 图标 512px
└── sounds/
    └── click/
        ├── YES/    # 点对音效
        ├── NO/     # 点错音效
        ├── HELP/   # 提示音效
        └── win/    # 胜利音效
```

## 音效管理

音效文件夹结构：
- `sounds/click/YES/` — 点对时随机播放其中一个
- `sounds/click/NO/` — 点错时随机播放其中一个
- `sounds/click/HELP/` — 点提示时随机播放其中一个
- `sounds/click/win/` — 胜利时随机播放其中一个

增删音效后，运行以下命令更新清单：

```bash
node build-sounds.js
```

脚本会扫描上述四个文件夹，重新生成 `sounds.js`。删掉的文件会自动从清单中移除，新增的文件会自动加入。无需手动修改任何代码。

## 本地运行

直接在浏览器中打开 `index.html` 即可，无需构建工具或服务器。

如需 PWA 功能，需要通过 HTTP 服务器访问：

```bash
# 使用 Python
python -m http.server 8080

# 或使用 Node.js
npx serve .
```

然后访问 `http://localhost:8080`

## 部署

项目是纯静态文件，可部署到任何静态托管服务：

- **GitHub Pages** — 推送到 main 分支后在仓库 Settings > Pages 中启用
- **Vercel / Netlify** — 直接导入仓库即可
- 任何支持静态文件的 Web 服务器

## License

MIT
