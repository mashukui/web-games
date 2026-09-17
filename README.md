# 🎮 Web Games

> A collection of free online games — no install, no signup, no downloads. Every game is a single self-contained HTML file that plays instantly in your browser.
> Made by [@mashukui](https://github.com/mashukui)

[![Play Online](https://img.shields.io/badge/%F0%9F%8E%AE_Play-GitHub_Pages-ff9f1c?style=flat-square)](https://mashukui.github.io/web-games/)
[![Games](https://img.shields.io/badge/Games-4-4db6ac?style=flat-square)](https://mashukui.github.io/web-games/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./)
[![Made with Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)](./index.html)

**🎮 Play the whole collection:** https://mashukui.github.io/web-games/

---

## 🕹️ The Games

| Game | | One-liner | Play |
|---|:---:|---|---|
| **Ant Flap** | 🐜 | A tiny flying ant adventure — tap to flap, squeeze through the branches | [Play](https://mashukui.github.io/web-games/ant-flap/) |
| **Snake** | 🐍 | The all-time classic — eat, grow, speed up, don't bite yourself | [Play](https://mashukui.github.io/web-games/snake/) |
| **Minesweeper** | 💣 | Three difficulties, first-click-safe, timer & flag counter | [Play](https://mashukui.github.io/web-games/minesweeper/) |
| **Breakout** | 🧱 | Angle-perfect paddle physics, brick-shattering particles, endless levels | [Play](https://mashukui.github.io/web-games/breakout/) |

## ✨ Shared Features

Every game in this collection follows the same engineering spec:

- **One file per game** — a single `index.html` with zero dependencies. No frameworks, no build tools, no external assets, no tracking
- **Cross-platform input** — touch, mouse, and keyboard; fully responsive, mobile-first
- **Frame-rate independent** — delta-time based loops, identical speed on 60Hz and 120Hz screens
- **Built-in sound** — WebAudio synthesized SFX (no audio files), one-tap mute
- **Best scores saved locally** — localStorage, nothing leaves your browser
- **Share your score** — one tap copies a challenge message to the clipboard
- **Hand-drawn graphics** — Canvas vectors that render identically on every platform
- **SEO ready** — full meta / Open Graph tags on every page

## 🚀 Run Locally

```bash
git clone https://github.com/mashukui/web-games.git
cd web-games
python3 -m http.server 8080
# open http://localhost:8080
```

> Most games also work by double-clicking the file directly (only clipboard sharing needs an http context).

## 📁 Project Structure

```
web-games/
├── index.html            # arcade hub — game registry + cards
├── ant-flap/index.html   # 🐜 flappy-style arcade
├── snake/index.html      # 🐍 classic snake
├── minesweeper/index.html# 💣 three difficulties
├── breakout/index.html   # 🧱 brick breaker
├── README.md
└── LICENSE               # MIT
```

The hub's game registry lives in the `GAMES` array inside `index.html` — one entry per game.

## 🛠️ Add a Game (Contributing)

This is an open collection — PRs adding new games are very welcome! Keep the spec:

1. Create `yourgame/index.html` — a **single self-contained file**: zero dependencies, English UI, responsive controls (touch + keyboard/mouse), best score in localStorage, mute toggle, SEO/OG meta tags, footer linking back to `../`
2. Add one entry to the `GAMES` array in the root `index.html` (id, icon emoji, name, one-line desc, tag)
3. Add one row to the games table in this README
4. Open a pull request 🎉

Quality over quantity — a polished game people replay beats ten rough ones.

## 📣 About the Author

**mashukui** — indie developer, Python & web tools.

- 💻 GitHub: https://github.com/mashukui
- 🌐 SaveOne — free online video downloader: https://saveone.pro

> This project is for learning and fun, released under the MIT license. Fork freely (attribution appreciated).

## 📄 License

[MIT](./LICENSE) © 2026 mashukui

---

**中文说明**:本项目是一个纯前端网页小游戏合集,每款游戏均为零依赖的单文件 HTML5 游戏,MIT 协议开源。作者:马哥python说(@mashukui)。在线试玩:https://mashukui.github.io/web-games/
