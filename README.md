# 🐜 Ant Flap

> A tiny flying ant adventure — zero-dependency, single-file HTML5 game. No install, no signup, just open and play.
> Made by [@mashukui](https://github.com/mashukui)

[![Play Online](https://img.shields.io/badge/%F0%9F%8E%AE_Play-GitHub_Pages-ff9f1c?style=flat-square)](https://mashukui.github.io/ant-flap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./)
[![Made with Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)](./index.html)

**🎮 Play online:** https://mashukui.github.io/ant-flap/

---

## 🎯 How to Play

- Tap the screen or press <kbd>SPACE</kbd> to flap upward
- Squeeze through the gaps between branches — each set cleared = +1 point
- Hitting a branch or the ground ends the run. The higher your score, the narrower the gaps and the faster you fly!

| Score | Medal |
|:---:|:---:|
| 5+ | 🥉 Hard Worker |
| 10+ | 🥈 Ant Power |
| 20+ | 🥇 Ant Legend |
| 30+ | 👑 Ant God |

Your best score is saved locally (localStorage). Hit **SHARE SCORE** to copy your result and challenge friends.

## ✨ Features

- **Zero dependencies** — one single `index.html`, raw HTML5 Canvas + vanilla JS. No frameworks, no build tools, no assets
- **Cross-platform** — touch, mouse, and keyboard all supported; fully responsive
- **Frame-rate independent** — delta-time based physics, identical speed on 60Hz and 120Hz screens
- **Built-in sound** — WebAudio synthesized SFX, no audio files, one-tap mute
- **SEO ready** — full meta / Open Graph tags
- **Vector drawn** — the ant, branches, and clouds are all hand-drawn Canvas vectors. No images, renders identically everywhere

## 🚀 Run Locally

```bash
git clone https://github.com/mashukui/ant-flap.git
cd ant-flap
# serve with any static server, e.g.:
python3 -m http.server 8080
# open http://localhost:8080
```

> You can also just double-click `index.html` (only the share-link feature needs an http context).

## 🛠️ Deploy Your Own (GitHub Pages)

1. Fork this repo (or push it to a new one)
2. Go to **Settings → Pages → Source**, pick branch `main` / `root`
3. Wait ~1 minute, then visit `https://<your-username>.github.io/ant-flap/`

## 📁 Project Structure

```
ant-flap/
├── index.html   # entire game — logic + styles in one file (~600 lines, commented)
├── README.md
└── LICENSE      # MIT
```

## 🧩 Want to Reskin It?

All tunable parameters live at the top of the `<script>` section in `index.html`:

| Parameter | Description | Default |
|---|---|---|
| `GRAVITY` | Gravity acceleration | `0.42` |
| `FLAP_V` | Upward velocity per flap | `-7.8` |
| `GAP_INIT` / `GAP_MIN` | Initial / minimum branch gap width | `165` / `122` |
| `speed` cap | Max flying speed | `4.6` |

PRs welcome: night mode, new characters, new obstacles...

## 📣 About the Author

**mashukui** — indie developer, Python & web tools.

- 💻 GitHub: https://github.com/mashukui
- 🌐 SaveOne — free online video downloader: https://saveone.pro

> This project is for learning and fun, released under the MIT license. Fork freely (attribution appreciated).

## 📄 License

[MIT](./LICENSE) © 2026 mashukui

---

**中文说明**:本项目为纯前端单文件 HTML5 小游戏(蚂蚁题材 Flappy 类),零依赖,MIT 协议开源。作者:马哥python说(@mashukui)。在线试玩:https://mashukui.github.io/ant-flap/
