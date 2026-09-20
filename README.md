# 🎮 Web Games

> A collection of free online games — no install, no signup, no downloads. Every game is a single self-contained HTML file that plays instantly in your browser.
> Made by [@mashukui](https://github.com/mashukui)

[![Play Online](https://img.shields.io/badge/%F0%9F%8E%AE_Play-GitHub_Pages-ff9f1c?style=flat-square)](https://mashukui.github.io/web-games/)
[![Games](https://img.shields.io/badge/Games-19-4db6ac?style=flat-square)](https://mashukui.github.io/web-games/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./)
[![Made with Vanilla JS](https://img.shields.io/badge/Made%20with%20Vanilla%20JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)](./index.html)

**🎮 Play the whole collection:** https://mashukui.github.io/web-games/

---

## 🕹️ The Games

| Game | | Category | One-liner | Play |
|---|:---:|:---:|---|---|
| **Ant Flap** | 🐜 | Arcade | A tiny flying ant adventure — tap to flap, squeeze through the branches | [Play](https://mashukui.github.io/web-games/ant-flap/) |
| **Ant Jump** | 🦗 | Arcade | Bounce the ant up endless platforms — moving, fragile and springy ones ahead | [Play](https://mashukui.github.io/web-games/ant-jump/) |
| **Block Drop** | 🧊 | Arcade | Falling blocks, perfect clears. Speed up, survive, stack them high | [Play](https://mashukui.github.io/web-games/block-drop/) |
| **Breakout** | 🧱 | Arcade | Angle-perfect paddle physics, brick-shattering particles, endless levels | [Play](https://mashukui.github.io/web-games/breakout/) |
| **Paddle Duel** | 🏓 | Arcade | Pong-style paddle duel vs AI in three difficulties. First to 7 wins | [Play](https://mashukui.github.io/web-games/paddle-duel/) |
| **Stack Tower** | 🏗️ | Arcade | One tap, one block. Line up each layer and build the tallest tower you can | [Play](https://mashukui.github.io/web-games/stack-tower/) |
| **Whack-a-Mole** | 🔨 | Arcade | 60 seconds of pure reflex. Whack the moles, grab the gold, dodge the bombs | [Play](https://mashukui.github.io/web-games/whack-a-mole/) |
| **Snake** | 🐍 | Classic | The all-time classic — eat, grow, speed up, don't bite yourself | [Play](https://mashukui.github.io/web-games/snake/) |
| **Tic Tac Toe** | 🎯 | Classic | Three in a row vs an unbeatable AI — or two players on one device | [Play](https://mashukui.github.io/web-games/tic-tac-toe/) |
| **Connect Four** | 🔴 | Classic | Drop a disc, line up four. Beat the computer in three difficulties | [Play](https://mashukui.github.io/web-games/connect-four/) |
| **2048** | 🔢 | Puzzle | Swipe and merge the tiles. Reach 2048, then keep going | [Play](https://mashukui.github.io/web-games/2048/) |
| **Minesweeper** | 💣 | Puzzle | Three difficulties, first-click-safe, timer & flag counter | [Play](https://mashukui.github.io/web-games/minesweeper/) |
| **Memory Match** | 🃏 | Puzzle | Flip two cards, remember what you saw, find every pair in three difficulties | [Play](https://mashukui.github.io/web-games/memory-match/) |
| **Star Defender** | 🚀 | Action | Wave after wave of enemies. Shoot, dodge, survive | [Play](https://mashukui.github.io/web-games/star-defender/) |
| **Dino Run** | 🦖 | Action | Endless desert dash. Jump the cacti, duck the birds, speed up forever | [Play](https://mashukui.github.io/web-games/dino-run/) |
| **Piano Tap** | 🎹 | Arcade | Smash the lowest black tile before the board rolls past — touch the white and you are out | [Play](https://mashukui.github.io/web-games/piano-tap/) |
| **Cross Road** | 🐸 | Arcade | Hop one tile at a time, dodge the traffic and ride the logs across the river | [Play](https://mashukui.github.io/web-games/cross-road/) |
| **Slide Puzzle** | 🧩 | Puzzle | The classic 15 puzzle — slide the tiles back into order in as few moves as you can | [Play](https://mashukui.github.io/web-games/slide-puzzle/) |
| **Fruit Slice** | 🍉 | Action | Swipe through the fruit, chain combos and keep well clear of the bombs | [Play](https://mashukui.github.io/web-games/fruit-slice/) |

Filter the collection by category on the [hub page](https://mashukui.github.io/web-games/) — e.g. [`?cat=puzzle`](https://mashukui.github.io/web-games/?cat=puzzle).

## ✨ Shared Features

Every game in this collection follows the same engineering spec:

- **One file per game** — a single `index.html` with zero dependencies. No frameworks, no build tools, no external assets, no tracking
- **Cross-platform input** — touch, mouse, and keyboard; fully responsive, mobile-first
- **Frame-rate independent** — delta-time based loops, identical speed on 60Hz and 120Hz screens
- **Built-in sound** — WebAudio synthesized SFX (no audio files), one-tap mute
- **Best scores saved locally** — localStorage, nothing leaves your browser
- **Share your score** — one tap copies a challenge message to the clipboard
- **Hand-drawn graphics** — Canvas vectors that render identically on every platform
- **8 languages** — one shared `i18n.js` layer (EN / 中文 / ES / PT / FR / DE / JA / KO)
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
├── index.html              # arcade hub — game registry + category filters
├── i18n.js                 # shared language layer (8 languages, zero deps)
├── ant-flap/index.html     # 🐜 flappy-style arcade
├── ant-jump/index.html     # 🦗 vertical platform climber
├── block-drop/index.html   # 🧊 falling-block puzzle
├── breakout/index.html     # 🧱 brick breaker
├── paddle-duel/index.html  # 🏓 pong-style duel vs AI
├── stack-tower/index.html  # 🏗️ one-tap stacking game
├── whack-a-mole/index.html # 🔨 60-second reflex arcade
├── snake/index.html        # 🐍 classic snake
├── tic-tac-toe/index.html  # 🎯 three-in-a-row vs AI / 2P
├── connect-four/index.html # 🔴 four-in-a-row vs AI
├── 2048/index.html         # 🔢 merge-the-tiles puzzle
├── minesweeper/index.html  # 💣 mine-hunting puzzle
├── memory-match/index.html # 🃏 memory card pairs
├── star-defender/index.html# 🚀 wave shooter
├── dino-run/index.html     # 🦖 endless runner
├── piano-tap/index.html    # 🎹 reaction tapping arcade
├── cross-road/index.html   # 🐸 hopper vs traffic
├── slide-puzzle/index.html # 🧩 sliding number puzzle
├── fruit-slice/index.html  # 🍉 swipe-and-slice arcade
├── README.md
└── LICENSE                 # MIT
```

The hub's game registry lives in the `GAMES` array inside `index.html` — one entry per game (`id`, `icon`, `nameKey`, `descKey`, `category`).

## 🛠️ Add a Game (Contributing)

This is an open collection — PRs adding new games are very welcome! Keep the spec:

1. Create `yourgame/index.html` — a **single self-contained file**: zero dependencies, responsive controls (touch + mouse/keyboard), best score in localStorage, mute toggle, SEO/OG meta tags, footer linking back to `../`
2. Add the strings to `i18n.js` (`game.<id>`, `hub.desc.<id>`, plus your own `<prefix>.*` keys) for all 8 languages — never hardcode UI text
3. Add one entry to the `GAMES` array in the root `index.html` (pick an existing category: Arcade / Classic / Puzzle / Action)
4. Add one row to the games table in this README
5. Open a pull request 🎉

Quality over quantity — a polished game people replay beats ten rough ones.

## 📣 About the Author

**mashukui** — indie developer, Python & web tools.

- 💻 GitHub: https://github.com/mashukui
- 🌐 SaveOne — free online video downloader: https://saveone.pro

> This project is for learning and fun, released under the MIT license. Fork freely (attribution appreciated).

## 📄 License

[MIT](./LICENSE) © 2026 mashukui

---

**中文说明**:本项目是一个纯前端网页小游戏合集(19 款),每款游戏均为零依赖的单文件 HTML5 游戏,内置 8 语言界面,PC 与手机端均已适配,MIT 协议开源。作者:马哥python说(@mashukui)。在线试玩:https://mashukui.github.io/web-games/
