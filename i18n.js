/*!
 * Web Games — i18n
 * ---------------------------------------------------------------------------
 * One shared language layer for the whole collection. Zero dependencies.
 *
 *   <script src="../i18n.js"></script>            <!-- in <head>, before page scripts -->
 *   <h1 data-i18n="snake.title">SNAKE</h1>        <!-- static text  -->
 *   <div data-i18n-html="snake.tip"></div>        <!-- text containing markup -->
 *   <button data-i18n-title="common.toggleSound"></button>
 *   <button data-i18n-aria="blockDrop.ariaLeft"></button>
 *
 *   t('snake.share', { n: 10, url: location.href })   // in page scripts
 *   WG.onChange(function (lang) { ... })              // re-render dynamic bits
 *
 * Language is remembered in localStorage and can be forced with ?lang=ja
 * ---------------------------------------------------------------------------
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Available languages. Order = order shown in the picker.             */
  /* ------------------------------------------------------------------ */
  var LANGS = [
    { code: 'en', short: 'EN', name: 'English' },
    { code: 'zh', short: '中', name: '简体中文' },
    { code: 'es', short: 'ES', name: 'Español' },
    { code: 'pt', short: 'PT', name: 'Português' },
    { code: 'fr', short: 'FR', name: 'Français' },
    { code: 'de', short: 'DE', name: 'Deutsch' },
    { code: 'ja', short: 'JA', name: '日本語' },
    { code: 'ko', short: 'KO', name: '한국어' }
  ];

  var DEFAULT = 'en';
  var STORE_KEY = 'wg_lang';

  /* ------------------------------------------------------------------ */
  /* Strings. English is the source of truth; every other language       */
  /* falls back to English for any key it is missing.                    */
  /* ------------------------------------------------------------------ */
  var S = {

    en: {
      /* ---- shared ---- */
      'common.play': 'PLAY',
      'common.start': 'START',
      'common.playAgain': 'PLAY AGAIN',
      'common.newGame': 'NEW GAME',
      'common.shareScore': 'SHARE SCORE',
      'common.copied': '✅ Copied!',
      'common.best': 'BEST',
      'common.score': 'SCORE',
      'common.paused': 'PAUSED',
      'common.newRecord': '🏆 NEW RECORD!',
      'common.toggleSound': 'Toggle sound',
      'common.language': 'Language',
      'common.madeBy': 'Made by',
      'common.moreGames': '🎮 More games',
      'common.freeVideo': '— free online video downloader',
      'common.bestScore': '🏅 Best score: {n}',
      'common.bestLabel': 'Best: {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — Free Online Games, No Install, No Signup',
      'hub.docTitleCat': '{cat} Games — Free Online Games, No Install',
      'hub.title': '🎮 Web Games',
      'hub.tagline': 'Free online games you can play <b>instantly</b> — no install, no signup, no downloads.<br>Pure HTML5. Works on your phone, tablet, and desktop.',
      'hub.heading': 'Games',
      'hub.count': '{n} GAMES · ALL FREE · ZERO INSTALL',
      'hub.empty': 'No games in this category yet.',
      'hub.about': '<b>About this collection.</b> Every game here is a single self-contained HTML file — no frameworks, no build tools, no tracking, no external assets. Open a card and you\'re playing in under a second. Best scores are saved locally in your browser. Free and open source under the MIT license.',
      'hub.contribute': '🛠️ <b>Want to add a game?</b> This is an open collection — build a single-file, zero-dependency HTML5 game, add it to the registry, and <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">open a pull request</a>. See the <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">contributing guide</a> in the README.',
      'hub.catAll': 'All',
      'hub.catArcade': 'Arcade',
      'hub.catClassic': 'Classic',
      'hub.catPuzzle': 'Puzzle',
      'hub.catAction': 'Action',
      'hub.playCard': 'PLAY',
      'hub.ldName': 'Web Games — Free Online Games',
      'hub.openSource': 'Free &amp; open source on',
      'hub.alsoTry': 'Also try',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': 'A tiny flying ant adventure. Tap to flap, squeeze through the branches.',
      'hub.desc.ant-jump': 'Bounce the ant up endless platforms. Moving, fragile and springy ones ahead.',
      'hub.desc.block-drop': 'Falling blocks, perfect clears. Speed up, survive, stack them high.',
      'hub.desc.breakout': 'Smash every brick with angle-perfect paddle physics. Three lives, endless levels.',
      'hub.desc.paddle-duel': 'Pong-style paddle duel vs AI in three difficulties. First to 7 wins.',
      'hub.desc.snake': 'The all-time classic. Eat, grow, speed up — just don\'t bite yourself.',
      'hub.desc.2048': 'Swipe and merge the tiles. Reach 2048, then keep going.',
      'hub.desc.minesweeper': 'Three difficulties, first-click-safe. Flag the mines, clear the field.',
      'hub.desc.star-defender': 'Wave after wave of enemies. Shoot, dodge, survive as long as you can.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — Free Online Flappy Game',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': 'A TINY FLYING ANT ADVENTURE',
      'antFlap.tip': 'Tap the screen or press <b>SPACE</b> to flap<br>Squeeze through the branches — don\'t crash!',
      'antFlap.first': 'First flight — good luck!',
      'antFlap.share': 'I scored {n} points in Ant Flap 🐜 Can you beat me? Play here: {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — Free Online Jumping Game',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'CLIMB AS HIGH AS YOU CAN',
      'antJump.tip': 'The ant bounces <b>automatically</b>.<br>Steer with <b>← →</b> / <b>A D</b>, or <b>touch</b> the left/right side<br>Hold both to slow down. Wrap around the edges!',
      'antJump.hudHeight': 'HEIGHT',
      'antJump.hudBest': 'BEST',
      'antJump.finalLabel': 'HEIGHT CLIMBED',
      'antJump.first': 'First climb — good luck!',
      'antJump.bestH': '🏅 Best: {n} m',
      'antJump.bestLabelH': 'Best: {n} m',
      'antJump.canvasBest': 'BEST {n} m',
      'antJump.share': 'I climbed {n} m in Ant Jump 🐜 Can you go higher? Play here: {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — Free Tetris-style Block Game',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': 'STACK · CLEAR · SURVIVE',
      'blockDrop.tip': '<b>← →</b> move · <b>↑</b> rotate · <b>↓</b> soft drop · <b>SPACE</b> hard drop · <b>C</b> hold<br>On mobile: use the buttons at the bottom',
      'blockDrop.hudScore': 'SCORE',
      'blockDrop.hudLevel': 'LEVEL',
      'blockDrop.hudLines': 'LINES',
      'blockDrop.hudBest': 'BEST',
      'blockDrop.finalLabel': 'FINAL SCORE',
      'blockDrop.fourLineClear': '{n} × four-line clear',
      'blockDrop.first': 'First stack — good luck!',
      'blockDrop.ariaLeft': 'Move left',
      'blockDrop.ariaRight': 'Move right',
      'blockDrop.ariaRotate': 'Rotate',
      'blockDrop.ariaSoft': 'Soft drop',
      'blockDrop.ariaHard': 'Hard drop',
      'blockDrop.canvasNext': 'NEXT',
      'blockDrop.canvasHold': 'HOLD',
      'blockDrop.paused': 'PAUSED',
      'blockDrop.resume': 'Press P or Esc to resume',
      'blockDrop.linesCleared': '{n} lines cleared',
      'blockDrop.finalLevel': 'Level {n}',
      'blockDrop.share': 'I scored {n} in Block Drop 🧊 ({lines} lines, level {level}). Can you beat me? Play here: {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — Free Online Brick Breaker Game',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'SMASH EVERY BRICK',
      'breakout.tip': 'Move with <b>mouse</b> / <b>touch</b> / <b>arrow keys</b><br>Click or press <b>SPACE</b> to launch',
      'breakout.hudScore': 'SCORE',
      'breakout.hudLevel': 'LEVEL',
      'breakout.hudLives': 'LIVES',
      'breakout.levelTitle': 'LEVEL {n}',
      'breakout.levelTip': 'Ball gets faster. Bricks get tougher.',
      'breakout.levelWord': 'LEVEL',
      'breakout.continue': 'CONTINUE',
      'breakout.launch': 'Click or press SPACE to launch',
      'breakout.first': 'First run — good luck!',
      'breakout.share': 'I scored {n} points in Breakout 🧱 (level {level}). Can you beat me? Play here: {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — Free Online Pong-Style Game',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': 'FIRST TO 7 WINS',
      'paddleDuel.tip': 'Move your paddle with <b>mouse</b>, <b>touch</b>, or <b>↑ ↓</b><br>Hit the ball off-center to angle your shot',
      'paddleDuel.hudYou': 'YOU',
      'paddleDuel.hudAi': 'AI',
      'paddleDuel.hudLongest': 'LONGEST RALLY',
      'paddleDuel.diffEasy': 'EASY',
      'paddleDuel.diffMedium': 'MEDIUM',
      'paddleDuel.diffHard': 'HARD',
      'paddleDuel.newRecord': '🏆 NEW RECORD RALLY!',
      'paddleDuel.serve': 'Click or press SPACE to serve',
      'paddleDuel.canvasRally': 'RALLY {n}',
      'paddleDuel.bestRally': '🏅 Best: longest rally {n} hits',
      'paddleDuel.bestRallyLabel': 'Best rally: {n} hits',
      'paddleDuel.first': 'First duel — good luck!',
      'paddleDuel.shareWin': 'I beat the AI {you}:{cpu} in Paddle Duel 🏓 My longest rally: {rally} hits. Play here: {url}',
      'paddleDuel.shareLose': 'The AI beat me {cpu}:{you} in Paddle Duel 🏓 My longest rally: {rally} hits. Play here: {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — Free Online Space Shooter',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': 'SURVIVE THE WAVES',
      'starDefender.tip': 'Move with <b>mouse</b> / <b>touch</b> / <b>← →</b><br>Your ship <b>fires automatically</b> — just dodge and aim by moving',
      'starDefender.hudScore': 'SCORE',
      'starDefender.hudWave': 'WAVE',
      'starDefender.hudLives': 'LIVES',
      'starDefender.finalLabel': 'FINAL SCORE',
      'starDefender.canvasWave': 'WAVE {n}',
      'starDefender.first': 'First flight, pilot!',
      'starDefender.share': 'I scored {n} points in Star Defender 🚀 (wave {w}). Can you beat me? Play here: {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — Free Online Snake Game',
      'snake.title': 'SNAKE',
      'snake.subtitle': 'THE ALL-TIME CLASSIC',
      'snake.tip': 'Arrow keys / <b>WASD</b> to turn · <b>swipe</b> on mobile<br>Press <b>P</b> or <b>Esc</b> to pause',
      'snake.hudScore': 'SCORE',
      'snake.hudLevel': 'SPEED LV',
      'snake.hudLength': 'LENGTH',
      'snake.paused': 'PAUSED',
      'snake.first': 'First run — good luck!',
      'snake.share': 'I scored {n} points in Snake 🐍 Can you beat me? Play here: {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — Free Online 2048 Puzzle Game',
      'g2048.hudScore': 'SCORE',
      'g2048.hudBest': 'BEST',
      'g2048.hint': '<b>Swipe</b> or use <b>arrow keys</b> / <b>WASD</b> to move tiles · <b>U</b> to undo',
      'g2048.intro': 'Merge matching tiles to reach <b>2048</b>.<br>Every move adds a new tile — plan ahead!',
      'g2048.winTitle': 'YOU MADE 2048!',
      'g2048.scoreLabel': 'Score',
      'g2048.keepGoing': 'KEEP GOING',
      'g2048.newGame': 'NEW GAME',
      'g2048.noMoves': 'NO MOVES LEFT',
      'g2048.undoTitle': 'Undo last move',
      'g2048.share': 'I scored {n} points in 2048 🔢 Can you beat me? Play here: {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — Free Online Minesweeper Game',
      'minesweeper.hudMines': 'MINES',
      'minesweeper.hudTime': 'TIME',
      'minesweeper.newGame': 'New game',
      'minesweeper.hint': 'Left click / tap to reveal · Right click / long-press to flag 🚩',
      'minesweeper.boom': '💥 BOOM! You hit a mine.',
      'minesweeper.cleared': '🏆 CLEARED! {cols}×{rows} in {sec}s',
      'minesweeper.shareWin': 'I cleared {diff} Minesweeper 💣 in {sec} seconds — a new personal best! Can you beat me? Play here: {url}',
      'minesweeper.shareWinPlain': 'I cleared {diff} Minesweeper 💣 in {sec} seconds. Can you beat me? Play here: {url}',
      'minesweeper.shareLose': 'Minesweeper got me 💥 Think you can clear it? Play here: {url}'
    },

    /* @@MORE_LANGS@@ */

    zh: {
      /* ---- shared ---- */
      'common.play': '开始游戏',
      'common.start': '开始',
      'common.playAgain': '再玩一次',
      'common.newGame': '新游戏',
      'common.shareScore': '分享成绩',
      'common.copied': '✅ 已复制！',
      'common.best': '最高',
      'common.score': '得分',
      'common.paused': '已暂停',
      'common.newRecord': '🏆 新纪录！',
      'common.toggleSound': '开关声音',
      'common.language': '语言',
      'common.madeBy': '作者',
      'common.moreGames': '🎮 更多游戏',
      'common.freeVideo': '— 免费在线视频下载工具',
      'common.bestScore': '🏅 最高分：{n}',
      'common.bestLabel': '最高分：{n}',

      /* ---- hub ---- */
      'hub.docTitle': '网页游戏合集 — 免安装免注册，打开即玩',
      'hub.docTitleCat': '{cat}游戏 — 免安装，打开即玩',
      'hub.title': '🎮 网页游戏',
      'hub.tagline': '免安装、免注册、免下载，<b>打开即玩</b>的在线小游戏合集。<br>纯 HTML5 实现，手机、平板、电脑通用。',
      'hub.heading': '游戏列表',
      'hub.count': '{n} 款游戏 · 全部免费 · 零安装',
      'hub.empty': '该分类下暂时还没有游戏。',
      'hub.about': '<b>关于这个合集。</b>这里的每一款游戏都是一个自包含的 HTML5 单文件 —— 没有框架、没有构建工具、没有追踪，也没有任何外部资源。点开卡片，一秒内就能开玩。最高分保存在你的浏览器本地。基于 MIT 协议开源。',
      'hub.contribute': '🛠️ <b>想加一款游戏？</b>这是个开放的合集 —— 做一个单文件、零依赖的 HTML5 游戏，注册进列表，然后 <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">提交一个 PR</a>。具体步骤见 README 里的 <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">贡献指南</a>。',
      'hub.catAll': '全部',
      'hub.catArcade': '街机',
      'hub.catClassic': '经典',
      'hub.catPuzzle': '益智',
      'hub.catAction': '动作',
      'hub.playCard': '开始',
      'hub.ldName': '网页游戏合集 — 免费在线游戏',
      'hub.openSource': '开源免费，代码托管在',
      'hub.alsoTry': '也可以试试',

      /* ---- game names ---- */
      'game.ant-flap': '蚂蚁快飞',
      'game.ant-jump': '蚂蚁跳跳',
      'game.block-drop': '方块下落',
      'game.breakout': '打砖块',
      'game.paddle-duel': '球拍对决',
      'game.snake': '贪吃蛇',
      'game.2048': '2048',
      'game.minesweeper': '扫雷',
      'game.star-defender': '星际守卫',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': '小蚂蚁的飞行冒险。点击拍翅，穿过树枝缝隙。',
      'hub.desc.ant-jump': '让小蚂蚁不断向上弹跳，当心移动平台、易碎平台和弹簧。',
      'hub.desc.block-drop': '方块下落，完美消行。速度越来越快，堆得越高越难。',
      'hub.desc.breakout': '靠挡板击球角度精准清空所有砖块。三条命，关卡无尽。',
      'hub.desc.paddle-duel': '乒乓球式对战 AI，三档难度，先到 7 分者胜。',
      'hub.desc.snake': '永远的经典。吃、变长、加速 —— 就是别咬到自己。',
      'hub.desc.2048': '滑动合并数字方块。凑出 2048，然后继续挑战。',
      'hub.desc.minesweeper': '三档难度，首点必安全。插旗标雷，扫清全场。',
      'hub.desc.star-defender': '一波接一波的敌人。射击、闪避，活得越久越好。',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': '蚂蚁快飞 — 免费在线飞行躲避小游戏',
      'antFlap.title': '蚂蚁快飞',
      'antFlap.subtitle': '小蚂蚁的飞行冒险',
      'antFlap.tip': '点击屏幕或按 <b>空格键</b> 拍翅<br>从树枝缝隙穿过去 —— 千万别撞上！',
      'antFlap.first': '第一次飞行 —— 祝你好运！',
      'antFlap.share': '我在《蚂蚁快飞》🐜 拿了 {n} 分，你能超过我吗？来玩：{url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': '蚂蚁跳跳 — 免费在线跳跃攀升小游戏',
      'antJump.title': '蚂蚁跳跳',
      'antJump.subtitle': '能爬多高就爬多高',
      'antJump.tip': '小蚂蚁会<b>自动弹跳</b>。<br>用 <b>← →</b> / <b>A D</b> 键操控，或者<b>触摸</b>屏幕左右两侧<br>两侧同时按住可以减速。屏幕左右边缘会穿越相连！',
      'antJump.hudHeight': '高度',
      'antJump.hudBest': '最高',
      'antJump.finalLabel': '攀爬高度',
      'antJump.first': '第一次攀爬 —— 祝你好运！',
      'antJump.bestH': '🏅 最高：{n} 米',
      'antJump.bestLabelH': '最高：{n} 米',
      'antJump.canvasBest': '最高 {n} 米',
      'antJump.share': '我在《蚂蚁跳跳》🐜 爬到了 {n} 米，你能更高吗？来玩：{url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': '方块下落 — 免费在线俄罗斯方块类游戏',
      'blockDrop.title': '方块下落',
      'blockDrop.subtitle': '堆叠 · 消行 · 生存',
      'blockDrop.tip': '<b>← →</b> 移动 · <b>↑</b> 旋转 · <b>↓</b> 软降 · <b>空格</b> 硬降 · <b>C</b> 暂存<br>手机上请用屏幕底部的按钮',
      'blockDrop.hudScore': '得分',
      'blockDrop.hudLevel': '等级',
      'blockDrop.hudLines': '消行',
      'blockDrop.hudBest': '最高',
      'blockDrop.finalLabel': '最终得分',
      'blockDrop.fourLineClear': '{n} 次四行消除',
      'blockDrop.first': '第一次堆叠 —— 祝你好运！',
      'blockDrop.ariaLeft': '向左移动',
      'blockDrop.ariaRight': '向右移动',
      'blockDrop.ariaRotate': '旋转',
      'blockDrop.ariaSoft': '软降',
      'blockDrop.ariaHard': '硬降',
      'blockDrop.canvasNext': '下一个',
      'blockDrop.canvasHold': '暂存',
      'blockDrop.paused': '已暂停',
      'blockDrop.resume': '按 P 或 Esc 继续',
      'blockDrop.linesCleared': '消除 {n} 行',
      'blockDrop.finalLevel': '第 {n} 关',
      'blockDrop.share': '我在《方块下落》🧊 拿了 {n} 分（消了 {lines} 行，到第 {level} 关），你能超过我吗？来玩：{url}',

      /* ---- breakout ---- */
      'breakout.docTitle': '打砖块 — 免费在线弹球破砖小游戏',
      'breakout.title': '打砖块',
      'breakout.subtitle': '砸碎每一块砖',
      'breakout.tip': '用<b>鼠标</b> / <b>触摸</b> / <b>方向键</b>移动挡板<br>点击或按 <b>空格键</b> 发球',
      'breakout.hudScore': '得分',
      'breakout.hudLevel': '关卡',
      'breakout.hudLives': '生命',
      'breakout.levelTitle': '第 {n} 关',
      'breakout.levelTip': '球会越来越快，砖也会越来越硬。',
      'breakout.levelWord': '关卡',
      'breakout.continue': '继续',
      'breakout.launch': '点击或按空格键发球',
      'breakout.first': '第一次挑战 —— 祝你好运！',
      'breakout.share': '我在《打砖块》🧱 拿了 {n} 分（第 {level} 关），你能超过我吗？来玩：{url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': '球拍对决 — 免费在线乒乓球对战小游戏',
      'paddleDuel.title': '球拍对决',
      'paddleDuel.subtitle': '先到 7 分者胜',
      'paddleDuel.tip': '用<b>鼠标</b>、<b>触摸</b>或 <b>↑ ↓</b> 键移动球拍<br>用球拍边缘击球可以打出角度',
      'paddleDuel.hudYou': '你',
      'paddleDuel.hudAi': '电脑',
      'paddleDuel.hudLongest': '最长回合',
      'paddleDuel.diffEasy': '简单',
      'paddleDuel.diffMedium': '普通',
      'paddleDuel.diffHard': '困难',
      'paddleDuel.newRecord': '🏆 回合新纪录！',
      'paddleDuel.serve': '点击或按空格键发球',
      'paddleDuel.canvasRally': '回合 {n}',
      'paddleDuel.bestRally': '🏅 最佳：最长回合 {n} 拍',
      'paddleDuel.bestRallyLabel': '最长回合：{n} 拍',
      'paddleDuel.first': '第一次对决 —— 祝你好运！',
      'paddleDuel.shareWin': '我在《球拍对决》🏓 以 {you}:{cpu} 赢了电脑，最长回合 {rally} 拍。来玩：{url}',
      'paddleDuel.shareLose': '我在《球拍对决》🏓 以 {cpu}:{you} 输给了电脑，最长回合 {rally} 拍。来玩：{url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': '星际守卫 — 免费在线太空射击小游戏',
      'starDefender.title': '星际守卫',
      'starDefender.subtitle': '在敌潮中活下去',
      'starDefender.tip': '用<b>鼠标</b> / <b>触摸</b> / <b>← →</b> 移动<br>你的飞船会<b>自动开火</b> —— 只要走位闪避就行',
      'starDefender.hudScore': '得分',
      'starDefender.hudWave': '波次',
      'starDefender.hudLives': '生命',
      'starDefender.finalLabel': '最终得分',
      'starDefender.canvasWave': '第 {n} 波',
      'starDefender.first': '第一次出击，飞行员！',
      'starDefender.share': '我在《星际守卫》🚀 拿了 {n} 分（第 {w} 波），你能超过我吗？来玩：{url}',

      /* ---- snake ---- */
      'snake.docTitle': '贪吃蛇 — 免费在线经典贪吃蛇游戏',
      'snake.title': '贪吃蛇',
      'snake.subtitle': '永远的经典',
      'snake.tip': '用方向键 / <b>WASD</b> 转向 · 手机上<b>滑动</b>屏幕<br>按 <b>P</b> 或 <b>Esc</b> 暂停',
      'snake.hudScore': '得分',
      'snake.hudLevel': '速度等级',
      'snake.hudLength': '长度',
      'snake.paused': '已暂停',
      'snake.first': '第一次玩 —— 祝你好运！',
      'snake.share': '我在《贪吃蛇》🐍 拿了 {n} 分，你能超过我吗？来玩：{url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — 免费在线 2048 数字合并小游戏',
      'g2048.hudScore': '得分',
      'g2048.hudBest': '最高',
      'g2048.hint': '<b>滑动</b>屏幕，或用<b>方向键</b> / <b>WASD</b> 移动方块 · 按 <b>U</b> 撤销',
      'g2048.intro': '合并相同的数字方块，凑出 <b>2048</b>。<br>每走一步都会新增一个方块 —— 提前规划！',
      'g2048.winTitle': '你凑出 2048 了！',
      'g2048.scoreLabel': '得分',
      'g2048.keepGoing': '继续挑战',
      'g2048.newGame': '新游戏',
      'g2048.noMoves': '无路可走',
      'g2048.undoTitle': '撤销上一步',
      'g2048.share': '我在《2048》🔢 拿了 {n} 分，你能超过我吗？来玩：{url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': '扫雷 — 免费在线经典扫雷小游戏',
      'minesweeper.hudMines': '雷数',
      'minesweeper.hudTime': '用时',
      'minesweeper.newGame': '新游戏',
      'minesweeper.hint': '左键点击 / 轻触翻开 · 右键 / 长按插旗 🚩',
      'minesweeper.boom': '💥 轰！你踩到雷了。',
      'minesweeper.cleared': '🏆 通关！{cols}×{rows} 用时 {sec} 秒',
      'minesweeper.shareWin': '我用了 {sec} 秒扫清了 {diff} 扫雷 💣 —— 个人最好成绩！你能超过我吗？来玩：{url}',
      'minesweeper.shareWinPlain': '我用了 {sec} 秒扫清了 {diff} 扫雷 💣，你能超过我吗？来玩：{url}',
      'minesweeper.shareLose': '我被扫雷 💣 干掉了，你觉得自己能清场吗？来玩：{url}'
    },

    es: {
      /* ---- shared ---- */
      'common.play': 'JUGAR',
      'common.start': 'EMPEZAR',
      'common.playAgain': 'JUGAR OTRA VEZ',
      'common.newGame': 'NUEVA PARTIDA',
      'common.shareScore': 'COMPARTIR PUNTOS',
      'common.copied': '✅ ¡Copiado!',
      'common.best': 'RÉCORD',
      'common.score': 'PUNTOS',
      'common.paused': 'EN PAUSA',
      'common.newRecord': '🏆 ¡NUEVO RÉCORD!',
      'common.toggleSound': 'Activar o desactivar el sonido',
      'common.language': 'Idioma',
      'common.madeBy': 'Creado por',
      'common.moreGames': '🎮 Más juegos',
      'common.freeVideo': '— descargador de vídeo online gratis',
      'common.bestScore': '🏅 Mejor puntuación: {n}',
      'common.bestLabel': 'Récord: {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — Juegos online gratis, sin instalar ni registrarse',
      'hub.docTitleCat': 'Juegos {cat} — Online y gratis, sin instalar',
      'hub.title': '🎮 Web Games',
      'hub.tagline': 'Juegos online gratis para jugar <b>al instante</b>: sin instalar, sin registro y sin descargas.<br>HTML5 puro. Funciona en móvil, tablet y ordenador.',
      'hub.heading': 'Juegos',
      'hub.count': '{n} JUEGOS · TODOS GRATIS · SIN INSTALAR',
      'hub.empty': 'Todavía no hay juegos en esta categoría.',
      'hub.about': '<b>Sobre esta colección.</b> Cada juego es un único archivo HTML autocontenido: sin frameworks, sin herramientas de compilación, sin rastreo y sin recursos externos. Abre una tarjeta y estarás jugando en menos de un segundo. Las mejores puntuaciones se guardan en tu navegador. Gratis y de código abierto bajo licencia MIT.',
      'hub.contribute': '🛠️ <b>¿Quieres añadir un juego?</b> Esta colección está abierta: crea un juego HTML5 de un solo archivo y sin dependencias, añádelo al registro y <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">envía un pull request</a>. Consulta la <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">guía de contribución</a> en el README.',
      'hub.catAll': 'Todos',
      'hub.catArcade': 'Arcade',
      'hub.catClassic': 'Clásicos',
      'hub.catPuzzle': 'Puzles',
      'hub.catAction': 'Acción',
      'hub.playCard': 'JUGAR',
      'hub.ldName': 'Web Games — Juegos online gratis',
      'hub.openSource': 'Gratis y de código abierto en',
      'hub.alsoTry': 'Prueba también',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': 'La aventura de una pequeña hormiga voladora. Toca para aletear y pasa entre las ramas.',
      'hub.desc.ant-jump': 'Haz rebotar a la hormiga por plataformas infinitas, con algunas móviles, frágiles y elásticas.',
      'hub.desc.block-drop': 'Bloques que caen, líneas perfectas. Cada vez más rápido: sobrevive y apila alto.',
      'hub.desc.breakout': 'Rompe todos los ladrillos con una física de pala milimétrica. Tres vidas, niveles infinitos.',
      'hub.desc.paddle-duel': 'Duelo de palas estilo Pong contra la IA en tres dificultades. Gana el primero en llegar a 7.',
      'hub.desc.snake': 'El clásico de siempre. Come, crece y acelera: solo no te muerdas a ti mismo.',
      'hub.desc.2048': 'Desliza y combina las fichas. Llega a 2048 y sigue jugando.',
      'hub.desc.minesweeper': 'Tres dificultades y primer clic siempre seguro. Marca las minas y despeja el campo.',
      'hub.desc.star-defender': 'Oleada tras oleada de enemigos. Dispara, esquiva y aguanta todo lo que puedas.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — Juego de volar online y gratis',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': 'LA AVENTURA DE UNA HORMIGA VOLADORA',
      'antFlap.tip': 'Toca la pantalla o pulsa <b>ESPACIO</b> para aletear<br>Pasa entre las ramas: ¡no choques!',
      'antFlap.first': 'Primer vuelo, ¡buena suerte!',
      'antFlap.share': 'He hecho {n} puntos en Ant Flap 🐜 ¿Puedes superarme? Juega aquí: {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — Juego de saltos online y gratis',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'SUBE TODO LO ALTO QUE PUEDAS',
      'antJump.tip': 'La hormiga rebota <b>automáticamente</b>.<br>Muévete con <b>← →</b> / <b>A D</b> o <b>toca</b> el lado izquierdo o derecho<br>Mantén ambos para frenar. ¡Los bordes están conectados!',
      'antJump.hudHeight': 'ALTURA',
      'antJump.hudBest': 'RÉCORD',
      'antJump.finalLabel': 'ALTURA ALCANZADA',
      'antJump.first': 'Primer ascenso, ¡buena suerte!',
      'antJump.bestH': '🏅 Récord: {n} m',
      'antJump.bestLabelH': 'Récord: {n} m',
      'antJump.canvasBest': 'RÉCORD {n} m',
      'antJump.share': 'He subido {n} m en Ant Jump 🐜 ¿Puedes llegar más alto? Juega aquí: {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — Juego de bloques estilo Tetris, gratis',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': 'APILA · LIMPIA · SOBREVIVE',
      'blockDrop.tip': '<b>← →</b> mover · <b>↑</b> girar · <b>↓</b> bajar · <b>ESPACIO</b> caída rápida · <b>C</b> reservar<br>En móvil: usa los botones de abajo',
      'blockDrop.hudScore': 'PUNTOS',
      'blockDrop.hudLevel': 'NIVEL',
      'blockDrop.hudLines': 'LÍNEAS',
      'blockDrop.hudBest': 'RÉCORD',
      'blockDrop.finalLabel': 'PUNTUACIÓN FINAL',
      'blockDrop.fourLineClear': '{n} × cuatro líneas',
      'blockDrop.first': 'Primera partida, ¡buena suerte!',
      'blockDrop.ariaLeft': 'Mover a la izquierda',
      'blockDrop.ariaRight': 'Mover a la derecha',
      'blockDrop.ariaRotate': 'Girar',
      'blockDrop.ariaSoft': 'Bajar despacio',
      'blockDrop.ariaHard': 'Caída rápida',
      'blockDrop.canvasNext': 'SIGUIENTE',
      'blockDrop.canvasHold': 'RESERVA',
      'blockDrop.paused': 'EN PAUSA',
      'blockDrop.resume': 'Pulsa P o Esc para continuar',
      'blockDrop.linesCleared': '{n} líneas eliminadas',
      'blockDrop.finalLevel': 'Nivel {n}',
      'blockDrop.share': 'He hecho {n} en Block Drop 🧊 ({lines} líneas, nivel {level}). ¿Puedes superarme? Juega aquí: {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — Rompeladrillos online y gratis',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'ROMPE TODOS LOS LADRILLOS',
      'breakout.tip': 'Muévete con el <b>ratón</b>, el <b>tacto</b> o las <b>flechas</b><br>Haz clic o pulsa <b>ESPACIO</b> para lanzar',
      'breakout.hudScore': 'PUNTOS',
      'breakout.hudLevel': 'NIVEL',
      'breakout.hudLives': 'VIDAS',
      'breakout.levelTitle': 'NIVEL {n}',
      'breakout.levelTip': 'La bola va más rápido. Los ladrillos son más duros.',
      'breakout.levelWord': 'NIVEL',
      'breakout.continue': 'CONTINUAR',
      'breakout.launch': 'Haz clic o pulsa ESPACIO para lanzar',
      'breakout.first': 'Primera partida, ¡buena suerte!',
      'breakout.share': 'He hecho {n} puntos en Breakout 🧱 (nivel {level}). ¿Puedes superarme? Juega aquí: {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — Juego estilo Pong online y gratis',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': 'EL PRIMERO EN LLEGAR A 7',
      'paddleDuel.tip': 'Mueve tu pala con el <b>ratón</b>, el <b>tacto</b> o <b>↑ ↓</b><br>Golpea la bola descentrada para darle ángulo',
      'paddleDuel.hudYou': 'TÚ',
      'paddleDuel.hudAi': 'IA',
      'paddleDuel.hudLongest': 'MEJOR INTERCAMBIO',
      'paddleDuel.diffEasy': 'FÁCIL',
      'paddleDuel.diffMedium': 'MEDIO',
      'paddleDuel.diffHard': 'DIFÍCIL',
      'paddleDuel.newRecord': '🏆 ¡NUEVO RÉCORD DE INTERCAMBIO!',
      'paddleDuel.serve': 'Haz clic o pulsa ESPACIO para sacar',
      'paddleDuel.canvasRally': 'INTERCAMBIO {n}',
      'paddleDuel.bestRally': '🏅 Récord: mejor intercambio de {n} golpes',
      'paddleDuel.bestRallyLabel': 'Mejor intercambio: {n} golpes',
      'paddleDuel.first': 'Primer duelo, ¡buena suerte!',
      'paddleDuel.shareWin': 'He ganado a la IA {you}:{cpu} en Paddle Duel 🏓 Mi mejor intercambio: {rally} golpes. Juega aquí: {url}',
      'paddleDuel.shareLose': 'La IA me ha ganado {cpu}:{you} en Paddle Duel 🏓 Mi mejor intercambio: {rally} golpes. Juega aquí: {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — Matamarcianos online y gratis',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': 'SOBREVIVE A LAS OLEADAS',
      'starDefender.tip': 'Muévete con el <b>ratón</b>, el <b>tacto</b> o <b>← →</b><br>Tu nave <b>dispara sola</b>: solo esquiva y apunta moviéndote',
      'starDefender.hudScore': 'PUNTOS',
      'starDefender.hudWave': 'OLEADA',
      'starDefender.hudLives': 'VIDAS',
      'starDefender.finalLabel': 'PUNTUACIÓN FINAL',
      'starDefender.canvasWave': 'OLEADA {n}',
      'starDefender.first': '¡Primer vuelo, piloto!',
      'starDefender.share': 'He hecho {n} puntos en Star Defender 🚀 (oleada {w}). ¿Puedes superarme? Juega aquí: {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — Juego de la serpiente online y gratis',
      'snake.title': 'SNAKE',
      'snake.subtitle': 'EL CLÁSICO DE SIEMPRE',
      'snake.tip': 'Usa las flechas / <b>WASD</b> para girar · <b>desliza</b> en el móvil<br>Pulsa <b>P</b> o <b>Esc</b> para pausar',
      'snake.hudScore': 'PUNTOS',
      'snake.hudLevel': 'NIVEL VEL.',
      'snake.hudLength': 'LONGITUD',
      'snake.paused': 'EN PAUSA',
      'snake.first': 'Primera partida — ¡buena suerte!',
      'snake.share': 'He hecho {n} puntos en Snake 🐍 ¿Puedes superarme? Juega aquí: {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — Puzle 2048 online y gratis',
      'g2048.hudScore': 'PUNTOS',
      'g2048.hudBest': 'RÉCORD',
      'g2048.hint': '<b>Desliza</b> o usa las <b>flechas</b> / <b>WASD</b> para mover las fichas · <b>U</b> para deshacer',
      'g2048.intro': 'Combina fichas iguales para llegar a <b>2048</b>.<br>Cada movimiento añade una ficha nueva: ¡planifica!',
      'g2048.winTitle': '¡HAS LLEGADO A 2048!',
      'g2048.scoreLabel': 'Puntos',
      'g2048.keepGoing': 'SEGUIR JUGANDO',
      'g2048.newGame': 'NUEVA PARTIDA',
      'g2048.noMoves': 'SIN MOVIMIENTOS',
      'g2048.undoTitle': 'Deshacer el último movimiento',
      'g2048.share': 'He hecho {n} puntos en 2048 🔢 ¿Puedes superarme? Juega aquí: {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — Juego online y gratis',
      'minesweeper.hudMines': 'MINAS',
      'minesweeper.hudTime': 'TIEMPO',
      'minesweeper.newGame': 'Nueva partida',
      'minesweeper.hint': 'Clic izquierdo o toque para descubrir · Clic derecho o pulsación larga para marcar 🚩',
      'minesweeper.boom': '💥 ¡BOOM! Has pisado una mina.',
      'minesweeper.cleared': '🏆 ¡DESPEJADO! {cols}×{rows} en {sec} s',
      'minesweeper.shareWin': 'He despejado el Minesweeper {diff} 💣 en {sec} segundos: ¡mi mejor marca! ¿Puedes superarme? Juega aquí: {url}',
      'minesweeper.shareWinPlain': 'He despejado el Minesweeper {diff} 💣 en {sec} segundos. ¿Puedes superarme? Juega aquí: {url}',
      'minesweeper.shareLose': 'El Minesweeper me ha ganado 💥 ¿Crees que puedes despejarlo? Juega aquí: {url}'
    },

    pt: {
      /* ---- shared ---- */
      'common.play': 'JOGAR',
      'common.start': 'COMEÇAR',
      'common.playAgain': 'JOGAR DE NOVO',
      'common.newGame': 'NOVO JOGO',
      'common.shareScore': 'COMPARTILHAR PONTOS',
      'common.copied': '✅ Copiado!',
      'common.best': 'RECORDE',
      'common.score': 'PONTOS',
      'common.paused': 'PAUSADO',
      'common.newRecord': '🏆 NOVO RECORDE!',
      'common.toggleSound': 'Ligar ou desligar o som',
      'common.language': 'Idioma',
      'common.madeBy': 'Criado por',
      'common.moreGames': '🎮 Mais jogos',
      'common.freeVideo': '— baixador de vídeos online grátis',
      'common.bestScore': '🏅 Melhor pontuação: {n}',
      'common.bestLabel': 'Recorde: {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — Jogos online grátis, sem instalar e sem cadastro',
      'hub.docTitleCat': 'Jogos de {cat} — Online e grátis, sem instalar',
      'hub.title': '🎮 Web Games',
      'hub.tagline': 'Jogos online grátis para jogar <b>na hora</b> — sem instalar, sem cadastro e sem download.<br>HTML5 puro. Funciona no celular, no tablet e no computador.',
      'hub.heading': 'Jogos',
      'hub.count': '{n} JOGOS · TODOS GRÁTIS · SEM INSTALAR',
      'hub.empty': 'Ainda não há jogos nesta categoria.',
      'hub.about': '<b>Sobre esta coleção.</b> Cada jogo é um único arquivo HTML autossuficiente: sem frameworks, sem ferramentas de build, sem rastreamento e sem recursos externos. Abra um cartão e você já está jogando em menos de um segundo. As melhores pontuações ficam salvas no seu navegador. Grátis e de código aberto sob a licença MIT.',
      'hub.contribute': '🛠️ <b>Quer adicionar um jogo?</b> Esta coleção é aberta: crie um jogo HTML5 de arquivo único e sem dependências, adicione-o ao registro e <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">envie um pull request</a>. Veja o <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">guia de contribuição</a> no README.',
      'hub.catAll': 'Todos',
      'hub.catArcade': 'Arcade',
      'hub.catClassic': 'Clássicos',
      'hub.catPuzzle': 'Quebra-cabeças',
      'hub.catAction': 'Ação',
      'hub.playCard': 'JOGAR',
      'hub.ldName': 'Web Games — Jogos online grátis',
      'hub.openSource': 'Grátis e de código aberto no',
      'hub.alsoTry': 'Experimente também',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': 'A aventura de uma formiguinha voadora. Toque para bater as asas e passe entre os galhos.',
      'hub.desc.ant-jump': 'Faça a formiga quicar por plataformas infinitas, com algumas móveis, frágeis e elásticas.',
      'hub.desc.block-drop': 'Blocos caindo, linhas perfeitas. Cada vez mais rápido: sobreviva e empilhe alto.',
      'hub.desc.breakout': 'Destrua todos os tijolos com uma física de raquete milimétrica. Três vidas, fases infinitas.',
      'hub.desc.paddle-duel': 'Duelo de raquetes estilo Pong contra a IA em três dificuldades. Vence quem chegar a 7 primeiro.',
      'hub.desc.snake': 'O clássico de sempre. Coma, cresça e acelere — só não morda a si mesmo.',
      'hub.desc.2048': 'Deslize e combine as peças. Chegue a 2048 e continue jogando.',
      'hub.desc.minesweeper': 'Três dificuldades e primeiro clique sempre seguro. Marque as minas e limpe o campo.',
      'hub.desc.star-defender': 'Onda após onda de inimigos. Atire, desvie e sobreviva o máximo que puder.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — Jogo de voar online e grátis',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': 'A AVENTURA DE UMA FORMIGA VOADORA',
      'antFlap.tip': 'Toque na tela ou aperte <b>ESPAÇO</b> para bater as asas<br>Passe entre os galhos — não bata!',
      'antFlap.first': 'Primeiro voo — boa sorte!',
      'antFlap.share': 'Fiz {n} pontos no Ant Flap 🐜 Consegue me superar? Jogue aqui: {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — Jogo de pulo online e grátis',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'SUBA O MAIS ALTO QUE PUDER',
      'antJump.tip': 'A formiga quica <b>automaticamente</b>.<br>Mova com <b>← →</b> / <b>A D</b> ou <b>toque</b> no lado esquerdo/direito<br>Segure os dois para frear. As bordas são conectadas!',
      'antJump.hudHeight': 'ALTURA',
      'antJump.hudBest': 'RECORDE',
      'antJump.finalLabel': 'ALTURA ALCANÇADA',
      'antJump.first': 'Primeira escalada — boa sorte!',
      'antJump.bestH': '🏅 Recorde: {n} m',
      'antJump.bestLabelH': 'Recorde: {n} m',
      'antJump.canvasBest': 'RECORDE {n} m',
      'antJump.share': 'Subi {n} m no Ant Jump 🐜 Consegue ir mais alto? Jogue aqui: {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — Jogo de blocos estilo Tetris, grátis',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': 'EMPILHE · LIMPE · SOBREVIVA',
      'blockDrop.tip': '<b>← →</b> mover · <b>↑</b> girar · <b>↓</b> descer devagar · <b>ESPAÇO</b> queda rápida · <b>C</b> guardar<br>No celular: use os botões na parte de baixo',
      'blockDrop.hudScore': 'PONTOS',
      'blockDrop.hudLevel': 'NÍVEL',
      'blockDrop.hudLines': 'LINHAS',
      'blockDrop.hudBest': 'RECORDE',
      'blockDrop.finalLabel': 'PONTUAÇÃO FINAL',
      'blockDrop.fourLineClear': '{n} × quatro linhas',
      'blockDrop.first': 'Primeira pilha — boa sorte!',
      'blockDrop.ariaLeft': 'Mover para a esquerda',
      'blockDrop.ariaRight': 'Mover para a direita',
      'blockDrop.ariaRotate': 'Girar',
      'blockDrop.ariaSoft': 'Descer devagar',
      'blockDrop.ariaHard': 'Queda rápida',
      'blockDrop.canvasNext': 'PRÓXIMO',
      'blockDrop.canvasHold': 'GUARDADO',
      'blockDrop.paused': 'PAUSADO',
      'blockDrop.resume': 'Aperte P ou Esc para continuar',
      'blockDrop.linesCleared': '{n} linhas eliminadas',
      'blockDrop.finalLevel': 'Nível {n}',
      'blockDrop.share': 'Fiz {n} no Block Drop 🧊 ({lines} linhas, nível {level}). Consegue me superar? Jogue aqui: {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — Quebra-tijolos online e grátis',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'QUEBRE TODOS OS TIJOLOS',
      'breakout.tip': 'Mova com o <b>mouse</b> / <b>toque</b> / <b>setas</b><br>Clique ou aperte <b>ESPAÇO</b> para lançar',
      'breakout.hudScore': 'PONTOS',
      'breakout.hudLevel': 'NÍVEL',
      'breakout.hudLives': 'VIDAS',
      'breakout.levelTitle': 'NÍVEL {n}',
      'breakout.levelTip': 'A bola fica mais rápida. Os tijolos ficam mais duros.',
      'breakout.levelWord': 'NÍVEL',
      'breakout.continue': 'CONTINUAR',
      'breakout.launch': 'Clique ou aperte ESPAÇO para lançar',
      'breakout.first': 'Primeira partida — boa sorte!',
      'breakout.share': 'Fiz {n} pontos no Breakout 🧱 (nível {level}). Consegue me superar? Jogue aqui: {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — Jogo estilo Pong online e grátis',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': 'QUEM CHEGAR A 7 VENCE',
      'paddleDuel.tip': 'Mova sua raquete com o <b>mouse</b>, o <b>toque</b> ou <b>↑ ↓</b><br>Bata na bola fora do centro para dar ângulo',
      'paddleDuel.hudYou': 'VOCÊ',
      'paddleDuel.hudAi': 'IA',
      'paddleDuel.hudLongest': 'MAIOR RALLY',
      'paddleDuel.diffEasy': 'FÁCIL',
      'paddleDuel.diffMedium': 'MÉDIO',
      'paddleDuel.diffHard': 'DIFÍCIL',
      'paddleDuel.newRecord': '🏆 NOVO RECORDE DE RALLY!',
      'paddleDuel.serve': 'Clique ou aperte ESPAÇO para sacar',
      'paddleDuel.canvasRally': 'RALLY {n}',
      'paddleDuel.bestRally': '🏅 Melhor: maior rally {n} toques',
      'paddleDuel.bestRallyLabel': 'Maior rally: {n} toques',
      'paddleDuel.first': 'Primeiro duelo — boa sorte!',
      'paddleDuel.shareWin': 'Ganhei da IA por {you}:{cpu} no Paddle Duel 🏓 Meu maior rally: {rally} toques. Jogue aqui: {url}',
      'paddleDuel.shareLose': 'A IA me venceu por {cpu}:{you} no Paddle Duel 🏓 Meu maior rally: {rally} toques. Jogue aqui: {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — Jogo de tiro espacial online e grátis',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': 'SOBREVIVA ÀS ONDAS',
      'starDefender.tip': 'Mova com o <b>mouse</b> / <b>toque</b> / <b>← →</b><br>Sua nave <b>atira sozinha</b> — só desvie e mire se movendo',
      'starDefender.hudScore': 'PONTOS',
      'starDefender.hudWave': 'ONDA',
      'starDefender.hudLives': 'VIDAS',
      'starDefender.finalLabel': 'PONTUAÇÃO FINAL',
      'starDefender.canvasWave': 'ONDA {n}',
      'starDefender.first': 'Primeiro voo, piloto!',
      'starDefender.share': 'Fiz {n} pontos no Star Defender 🚀 (onda {w}). Consegue me superar? Jogue aqui: {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — Jogo da cobrinha online e grátis',
      'snake.title': 'SNAKE',
      'snake.subtitle': 'O CLÁSSICO DE SEMPRE',
      'snake.tip': 'Use as setas / <b>WASD</b> para virar · <b>deslize</b> no celular<br>Aperte <b>P</b> ou <b>Esc</b> para pausar',
      'snake.hudScore': 'PONTOS',
      'snake.hudLevel': 'NÍVEL VEL.',
      'snake.hudLength': 'TAMANHO',
      'snake.paused': 'PAUSADO',
      'snake.first': 'Primeira partida — boa sorte!',
      'snake.share': 'Fiz {n} pontos no Snake 🐍 Consegue me superar? Jogue aqui: {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — Quebra-cabeça 2048 online e grátis',
      'g2048.hudScore': 'PONTOS',
      'g2048.hudBest': 'RECORDE',
      'g2048.hint': '<b>Deslize</b> ou use as <b>setas</b> / <b>WASD</b> para mover as peças · <b>U</b> para desfazer',
      'g2048.intro': 'Combine peças iguais para chegar a <b>2048</b>.<br>Cada jogada adiciona uma peça nova — planeje antes!',
      'g2048.winTitle': 'VOCÊ CHEGOU A 2048!',
      'g2048.scoreLabel': 'Pontos',
      'g2048.keepGoing': 'CONTINUAR JOGANDO',
      'g2048.newGame': 'NOVO JOGO',
      'g2048.noMoves': 'SEM JOGADAS',
      'g2048.undoTitle': 'Desfazer a última jogada',
      'g2048.share': 'Fiz {n} pontos no 2048 🔢 Consegue me superar? Jogue aqui: {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — Jogo online e grátis',
      'minesweeper.hudMines': 'MINAS',
      'minesweeper.hudTime': 'TEMPO',
      'minesweeper.newGame': 'Novo jogo',
      'minesweeper.hint': 'Clique com o botão esquerdo ou toque para revelar · Botão direito ou toque longo para marcar 🚩',
      'minesweeper.boom': '💥 BOOM! Você pisou numa mina.',
      'minesweeper.cleared': '🏆 LIMPO! {cols}×{rows} em {sec} s',
      'minesweeper.shareWin': 'Limpei o Minesweeper {diff} 💣 em {sec} segundos — meu novo recorde! Consegue me superar? Jogue aqui: {url}',
      'minesweeper.shareWinPlain': 'Limpei o Minesweeper {diff} 💣 em {sec} segundos. Consegue me superar? Jogue aqui: {url}',
      'minesweeper.shareLose': 'O Minesweeper me pegou 💥 Acha que consegue limpar? Jogue aqui: {url}'
    },

    fr: {
      /* ---- shared ---- */
      'common.play': 'JOUER',
      'common.start': 'COMMENCER',
      'common.playAgain': 'REJOUER',
      'common.newGame': 'NOUVELLE PARTIE',
      'common.shareScore': 'PARTAGER LE SCORE',
      'common.copied': '✅ Copié !',
      'common.best': 'RECORD',
      'common.score': 'SCORE',
      'common.paused': 'EN PAUSE',
      'common.newRecord': '🏆 NOUVEAU RECORD !',
      'common.toggleSound': 'Activer ou couper le son',
      'common.language': 'Langue',
      'common.madeBy': 'Créé par',
      'common.moreGames': '🎮 Plus de jeux',
      'common.freeVideo': '— téléchargeur de vidéos en ligne gratuit',
      'common.bestScore': '🏅 Meilleur score : {n}',
      'common.bestLabel': 'Record : {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — Jeux en ligne gratuits, sans installation ni inscription',
      'hub.docTitleCat': 'Jeux {cat} — En ligne et gratuits, sans installation',
      'hub.title': '🎮 Web Games',
      'hub.tagline': 'Des jeux en ligne gratuits à jouer <b>instantanément</b> — sans installation, sans inscription, sans téléchargement.<br>HTML5 pur. Fonctionne sur mobile, tablette et ordinateur.',
      'hub.heading': 'Jeux',
      'hub.count': '{n} JEUX · TOUS GRATUITS · SANS INSTALLATION',
      'hub.empty': 'Aucun jeu dans cette catégorie pour le moment.',
      'hub.about': '<b>À propos de cette collection.</b> Chaque jeu est un seul fichier HTML autonome — sans framework, sans outil de build, sans traçage, sans ressource externe. Ouvrez une carte et vous jouez en moins d\'une seconde. Les meilleurs scores sont enregistrés dans votre navigateur. Gratuit et open source sous licence MIT.',
      'hub.contribute': '🛠️ <b>Envie d\'ajouter un jeu ?</b> Cette collection est ouverte : créez un jeu HTML5 en un seul fichier sans dépendance, ajoutez-le au registre puis <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">ouvrez une pull request</a>. Voir le <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">guide de contribution</a> dans le README.',
      'hub.catAll': 'Tous',
      'hub.catArcade': 'Arcade',
      'hub.catClassic': 'Classiques',
      'hub.catPuzzle': 'Réflexion',
      'hub.catAction': 'Action',
      'hub.playCard': 'JOUER',
      'hub.ldName': 'Web Games — Jeux en ligne gratuits',
      'hub.openSource': 'Gratuit et open source sur',
      'hub.alsoTry': 'Essayez aussi',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': 'L\'aventure d\'une petite fourmi volante. Touchez pour battre des ailes et passez entre les branches.',
      'hub.desc.ant-jump': 'Faites rebondir la fourmi sur des plateformes à l\'infini, dont des mobiles, fragiles et élastiques.',
      'hub.desc.block-drop': 'Des blocs qui tombent, des lignes parfaites. Ça accélère : survivez et empilez haut.',
      'hub.desc.breakout': 'Détruisez toutes les briques grâce à une physique de raquette au millimètre. Trois vies, niveaux infinis.',
      'hub.desc.paddle-duel': 'Duel de raquettes façon Pong contre l\'IA, trois difficultés. Le premier à 7 gagne.',
      'hub.desc.snake': 'Le classique intemporel. Mangez, grandissez, accélérez — sans vous mordre.',
      'hub.desc.2048': 'Glissez et fusionnez les tuiles. Atteignez 2048, puis continuez.',
      'hub.desc.minesweeper': 'Trois difficultés, premier clic toujours sûr. Marquez les mines et dégagez le terrain.',
      'hub.desc.star-defender': 'Des vagues d\'ennemis sans fin. Tirez, esquivez, survivez le plus longtemps possible.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — Jeu de vol en ligne gratuit',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': 'L\'AVENTURE D\'UNE PETITE FOURMI VOLANTE',
      'antFlap.tip': 'Touchez l\'écran ou appuyez sur <b>ESPACE</b> pour battre des ailes<br>Passez entre les branches — ne vous crashez pas !',
      'antFlap.first': 'Premier vol — bonne chance !',
      'antFlap.share': 'J\'ai marqué {n} points à Ant Flap 🐜 Tu peux faire mieux ? Joue ici : {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — Jeu de saut en ligne gratuit',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'MONTEZ LE PLUS HAUT POSSIBLE',
      'antJump.tip': 'La fourmi rebondit <b>automatiquement</b>.<br>Déplacez-vous avec <b>← →</b> / <b>A D</b> ou <b>touchez</b> le côté gauche ou droit<br>Maintenez les deux pour ralentir. Les bords sont reliés !',
      'antJump.hudHeight': 'HAUTEUR',
      'antJump.hudBest': 'RECORD',
      'antJump.finalLabel': 'HAUTEUR ATTEINTE',
      'antJump.first': 'Première ascension — bonne chance !',
      'antJump.bestH': '🏅 Record : {n} m',
      'antJump.bestLabelH': 'Record : {n} m',
      'antJump.canvasBest': 'RECORD {n} m',
      'antJump.share': 'J\'ai grimpé {n} m à Ant Jump 🐜 Tu peux aller plus haut ? Joue ici : {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — Jeu de blocs façon Tetris, gratuit',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': 'EMPILE · NETTOIE · SURVIS',
      'blockDrop.tip': '<b>← →</b> déplacer · <b>↑</b> pivoter · <b>↓</b> descente douce · <b>ESPACE</b> chute rapide · <b>C</b> réserve<br>Sur mobile : utilisez les boutons en bas',
      'blockDrop.hudScore': 'SCORE',
      'blockDrop.hudLevel': 'NIVEAU',
      'blockDrop.hudLines': 'LIGNES',
      'blockDrop.hudBest': 'RECORD',
      'blockDrop.finalLabel': 'SCORE FINAL',
      'blockDrop.fourLineClear': '{n} × quatre lignes',
      'blockDrop.first': 'Première partie — bonne chance !',
      'blockDrop.ariaLeft': 'Déplacer à gauche',
      'blockDrop.ariaRight': 'Déplacer à droite',
      'blockDrop.ariaRotate': 'Pivoter',
      'blockDrop.ariaSoft': 'Descente douce',
      'blockDrop.ariaHard': 'Chute rapide',
      'blockDrop.canvasNext': 'SUIVANT',
      'blockDrop.canvasHold': 'RÉSERVE',
      'blockDrop.paused': 'EN PAUSE',
      'blockDrop.resume': 'Appuyez sur P ou Échap pour reprendre',
      'blockDrop.linesCleared': '{n} lignes effacées',
      'blockDrop.finalLevel': 'Niveau {n}',
      'blockDrop.share': 'J\'ai marqué {n} à Block Drop 🧊 ({lines} lignes, niveau {level}). Tu peux faire mieux ? Joue ici : {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — Casse-briques en ligne gratuit',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'CASSEZ TOUTES LES BRIQUES',
      'breakout.tip': 'Déplacez-vous à la <b>souris</b>, au <b>tactile</b> ou aux <b>flèches</b><br>Cliquez ou appuyez sur <b>ESPACE</b> pour lancer',
      'breakout.hudScore': 'SCORE',
      'breakout.hudLevel': 'NIVEAU',
      'breakout.hudLives': 'VIES',
      'breakout.levelTitle': 'NIVEAU {n}',
      'breakout.levelTip': 'La balle accélère. Les briques résistent davantage.',
      'breakout.levelWord': 'NIVEAU',
      'breakout.continue': 'CONTINUER',
      'breakout.launch': 'Cliquez ou appuyez sur ESPACE pour lancer',
      'breakout.first': 'Première partie — bonne chance !',
      'breakout.share': 'J\'ai marqué {n} points à Breakout 🧱 (niveau {level}). Tu peux faire mieux ? Joue ici : {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — Jeu façon Pong en ligne gratuit',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': 'PREMIER À 7 POINTS',
      'paddleDuel.tip': 'Déplacez votre raquette à la <b>souris</b>, au <b>tactile</b> ou avec <b>↑ ↓</b><br>Frappez la balle décentrée pour donner de l\'angle',
      'paddleDuel.hudYou': 'VOUS',
      'paddleDuel.hudAi': 'IA',
      'paddleDuel.hudLongest': 'PLUS LONG ÉCHANGE',
      'paddleDuel.diffEasy': 'FACILE',
      'paddleDuel.diffMedium': 'MOYEN',
      'paddleDuel.diffHard': 'DIFFICILE',
      'paddleDuel.newRecord': '🏆 NOUVEAU RECORD D\'ÉCHANGE !',
      'paddleDuel.serve': 'Cliquez ou appuyez sur ESPACE pour servir',
      'paddleDuel.canvasRally': 'ÉCHANGE {n}',
      'paddleDuel.bestRally': '🏅 Record : plus long échange {n} frappes',
      'paddleDuel.bestRallyLabel': 'Plus long échange : {n} frappes',
      'paddleDuel.first': 'Premier duel — bonne chance !',
      'paddleDuel.shareWin': 'J\'ai battu l\'IA {you}:{cpu} à Paddle Duel 🏓 Mon plus long échange : {rally} frappes. Joue ici : {url}',
      'paddleDuel.shareLose': 'L\'IA m\'a battu {cpu}:{you} à Paddle Duel 🏓 Mon plus long échange : {rally} frappes. Joue ici : {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — Shoot \'em up en ligne gratuit',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': 'SURVIVEZ AUX VAGUES',
      'starDefender.tip': 'Déplacez-vous à la <b>souris</b>, au <b>tactile</b> ou avec <b>← →</b><br>Votre vaisseau <b>tire automatiquement</b> — esquivez et visez en bougeant',
      'starDefender.hudScore': 'SCORE',
      'starDefender.hudWave': 'VAGUE',
      'starDefender.hudLives': 'VIES',
      'starDefender.finalLabel': 'SCORE FINAL',
      'starDefender.canvasWave': 'VAGUE {n}',
      'starDefender.first': 'Premier vol, pilote !',
      'starDefender.share': 'J\'ai marqué {n} points à Star Defender 🚀 (vague {w}). Tu peux faire mieux ? Joue ici : {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — Jeu du serpent en ligne gratuit',
      'snake.title': 'SNAKE',
      'snake.subtitle': 'LE CLASSIQUE INTEMPOREL',
      'snake.tip': 'Utilisez les flèches / <b>WASD</b> pour tourner · <b>glissez</b> sur mobile<br>Appuyez sur <b>P</b> ou <b>Échap</b> pour mettre en pause',
      'snake.hudScore': 'SCORE',
      'snake.hudLevel': 'NIVEAU VIT.',
      'snake.hudLength': 'LONGUEUR',
      'snake.paused': 'EN PAUSE',
      'snake.first': 'Première partie — bonne chance !',
      'snake.share': 'J\'ai marqué {n} points à Snake 🐍 Tu peux faire mieux ? Joue ici : {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — Puzzle 2048 en ligne gratuit',
      'g2048.hudScore': 'SCORE',
      'g2048.hudBest': 'RECORD',
      'g2048.hint': '<b>Glissez</b> ou utilisez les <b>flèches</b> / <b>WASD</b> pour déplacer les tuiles · <b>U</b> pour annuler',
      'g2048.intro': 'Fusionnez les tuiles identiques pour atteindre <b>2048</b>.<br>Chaque coup ajoute une tuile — anticipez !',
      'g2048.winTitle': 'VOUS AVEZ ATTEINT 2048 !',
      'g2048.scoreLabel': 'Score',
      'g2048.keepGoing': 'CONTINUER',
      'g2048.newGame': 'NOUVELLE PARTIE',
      'g2048.noMoves': 'PLUS DE COUP POSSIBLE',
      'g2048.undoTitle': 'Annuler le dernier coup',
      'g2048.share': 'J\'ai marqué {n} points à 2048 🔢 Tu peux faire mieux ? Joue ici : {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — Jeu en ligne gratuit',
      'minesweeper.hudMines': 'MINES',
      'minesweeper.hudTime': 'TEMPS',
      'minesweeper.newGame': 'Nouvelle partie',
      'minesweeper.hint': 'Clic gauche ou appui pour révéler · Clic droit ou appui long pour poser un drapeau 🚩',
      'minesweeper.boom': '💥 BOUM ! Vous avez marché sur une mine.',
      'minesweeper.cleared': '🏆 TERRAIN DÉGAGÉ ! {cols}×{rows} en {sec} s',
      'minesweeper.shareWin': 'J\'ai dégagé le Minesweeper {diff} 💣 en {sec} secondes — mon record perso ! Tu peux faire mieux ? Joue ici : {url}',
      'minesweeper.shareWinPlain': 'J\'ai dégagé le Minesweeper {diff} 💣 en {sec} secondes. Tu peux faire mieux ? Joue ici : {url}',
      'minesweeper.shareLose': 'Le Minesweeper a eu raison de moi 💥 Tu penses pouvoir le dégager ? Joue ici : {url}'
    },

    de: {
      /* ---- shared ---- */
      'common.play': 'SPIELEN',
      'common.start': 'START',
      'common.playAgain': 'NOCHMAL SPIELEN',
      'common.newGame': 'NEUES SPIEL',
      'common.shareScore': 'ERGEBNIS TEILEN',
      'common.copied': '✅ Kopiert!',
      'common.best': 'REKORD',
      'common.score': 'PUNKTE',
      'common.paused': 'PAUSIERT',
      'common.newRecord': '🏆 NEUER REKORD!',
      'common.toggleSound': 'Ton ein- oder ausschalten',
      'common.language': 'Sprache',
      'common.madeBy': 'Erstellt von',
      'common.moreGames': '🎮 Mehr Spiele',
      'common.freeVideo': '— kostenloser Online-Videodownloader',
      'common.bestScore': '🏅 Bestwert: {n}',
      'common.bestLabel': 'Rekord: {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — Kostenlose Online-Spiele ohne Installation',
      'hub.docTitleCat': '{cat}-Spiele — Kostenlos online, ohne Installation',
      'hub.title': '🎮 Web Games',
      'hub.tagline': 'Kostenlose Online-Spiele, die du <b>sofort</b> spielen kannst — ohne Installation, ohne Anmeldung, ohne Download.<br>Reines HTML5. Läuft auf Handy, Tablet und PC.',
      'hub.heading': 'Spiele',
      'hub.count': '{n} SPIELE · ALLE KOSTENLOS · OHNE INSTALLATION',
      'hub.empty': 'In dieser Kategorie gibt es noch keine Spiele.',
      'hub.about': '<b>Über diese Sammlung.</b> Jedes Spiel ist eine einzige, in sich geschlossene HTML-Datei — keine Frameworks, keine Build-Tools, kein Tracking, keine externen Ressourcen. Karte öffnen und du spielst in unter einer Sekunde. Bestwerte werden lokal im Browser gespeichert. Kostenlos und Open Source unter der MIT-Lizenz.',
      'hub.contribute': '🛠️ <b>Möchtest du ein Spiel beisteuern?</b> Diese Sammlung ist offen — baue ein HTML5-Spiel als einzelne Datei ohne Abhängigkeiten, trage es in die Registry ein und <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">stelle einen Pull Request</a>. Details findest du im <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">Contributing-Leitfaden</a> im README.',
      'hub.catAll': 'Alle',
      'hub.catArcade': 'Arcade',
      'hub.catClassic': 'Klassiker',
      'hub.catPuzzle': 'Denkspiele',
      'hub.catAction': 'Action',
      'hub.playCard': 'SPIELEN',
      'hub.ldName': 'Web Games — Kostenlose Online-Spiele',
      'hub.openSource': 'Kostenlos und Open Source auf',
      'hub.alsoTry': 'Probier auch',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': 'Das Abenteuer einer kleinen fliegenden Ameise. Tippe zum Flattern und schlüpfe durch die Zweige.',
      'hub.desc.ant-jump': 'Lass die Ameise über endlose Plattformen hüpfen — manche bewegen sich, brechen weg oder federn.',
      'hub.desc.block-drop': 'Fallende Blöcke, perfekte Reihen. Es wird immer schneller: überlebe und staple hoch.',
      'hub.desc.breakout': 'Zertrümmere jeden Stein mit millimetergenauer Schlägerphysik. Drei Leben, endlose Levels.',
      'hub.desc.paddle-duel': 'Pong-artiges Schlägerduell gegen die KI in drei Schwierigkeiten. Wer zuerst 7 hat, gewinnt.',
      'hub.desc.snake': 'Der Klassiker schlechthin. Friss, wachse, werde schneller — nur beiß dich nicht selbst.',
      'hub.desc.2048': 'Schiebe und verschmelze die Kacheln. Erreiche 2048 und spiel weiter.',
      'hub.desc.minesweeper': 'Drei Schwierigkeiten, erster Klick immer sicher. Markiere die Minen und räume das Feld.',
      'hub.desc.star-defender': 'Eine Welle nach der anderen. Schießen, ausweichen, so lange wie möglich überleben.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — Kostenloses Flatter-Spiel online',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': 'DAS ABENTEUER EINER KLEINEN FLIEGENDEN AMEISE',
      'antFlap.tip': 'Tippe auf den Bildschirm oder drücke <b>LEERTASTE</b> zum Flattern<br>Schlüpfe durch die Zweige — bloß nicht abstürzen!',
      'antFlap.first': 'Erster Flug — viel Glück!',
      'antFlap.share': 'Ich habe {n} Punkte bei Ant Flap 🐜 geschafft. Schaffst du mehr? Hier spielen: {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — Kostenloses Sprungspiel online',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'STEIG SO HOCH DU KANNST',
      'antJump.tip': 'Die Ameise hüpft <b>automatisch</b>.<br>Steuere mit <b>← →</b> / <b>A D</b> oder <b>tippe</b> auf die linke bzw. rechte Seite<br>Beide halten bremst. Die Ränder sind verbunden!',
      'antJump.hudHeight': 'HÖHE',
      'antJump.hudBest': 'REKORD',
      'antJump.finalLabel': 'ERREICHTE HÖHE',
      'antJump.first': 'Erster Aufstieg — viel Glück!',
      'antJump.bestH': '🏅 Rekord: {n} m',
      'antJump.bestLabelH': 'Rekord: {n} m',
      'antJump.canvasBest': 'REKORD {n} m',
      'antJump.share': 'Ich bin {n} m bei Ant Jump 🐜 geklettert. Kommst du höher? Hier spielen: {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — Kostenloses Tetris-artiges Blockspiel',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': 'STAPELN · RÄUMEN · ÜBERLEBEN',
      'blockDrop.tip': '<b>← →</b> bewegen · <b>↑</b> drehen · <b>↓</b> sanft fallen · <b>LEERTASTE</b> sofort fallen · <b>C</b> ablegen<br>Auf dem Handy: nutze die Tasten unten',
      'blockDrop.hudScore': 'PUNKTE',
      'blockDrop.hudLevel': 'LEVEL',
      'blockDrop.hudLines': 'REIHEN',
      'blockDrop.hudBest': 'REKORD',
      'blockDrop.finalLabel': 'ENDPUNKTE',
      'blockDrop.fourLineClear': '{n} × vier Reihen',
      'blockDrop.first': 'Erster Stapel — viel Glück!',
      'blockDrop.ariaLeft': 'Nach links bewegen',
      'blockDrop.ariaRight': 'Nach rechts bewegen',
      'blockDrop.ariaRotate': 'Drehen',
      'blockDrop.ariaSoft': 'Sanft fallen',
      'blockDrop.ariaHard': 'Sofort fallen',
      'blockDrop.canvasNext': 'NÄCHSTER',
      'blockDrop.canvasHold': 'ABLAGE',
      'blockDrop.paused': 'PAUSIERT',
      'blockDrop.resume': 'P oder Esc zum Fortsetzen',
      'blockDrop.linesCleared': '{n} Reihen geräumt',
      'blockDrop.finalLevel': 'Level {n}',
      'blockDrop.share': 'Ich habe {n} bei Block Drop 🧊 geschafft ({lines} Reihen, Level {level}). Schaffst du mehr? Hier spielen: {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — Kostenloser Brick Breaker online',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'ZERSCHLAGE JEDEN STEIN',
      'breakout.tip': 'Bewege dich mit <b>Maus</b> / <b>Touch</b> / <b>Pfeiltasten</b><br>Klicke oder drücke <b>LEERTASTE</b> zum Abschuss',
      'breakout.hudScore': 'PUNKTE',
      'breakout.hudLevel': 'LEVEL',
      'breakout.hudLives': 'LEBEN',
      'breakout.levelTitle': 'LEVEL {n}',
      'breakout.levelTip': 'Der Ball wird schneller. Die Steine werden härter.',
      'breakout.levelWord': 'LEVEL',
      'breakout.continue': 'WEITER',
      'breakout.launch': 'Klicken oder LEERTASTE zum Abschuss',
      'breakout.first': 'Erster Durchlauf — viel Glück!',
      'breakout.share': 'Ich habe {n} Punkte bei Breakout 🧱 geschafft (Level {level}). Schaffst du mehr? Hier spielen: {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — Kostenloses Pong-artiges Spiel online',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': 'WER ZUERST 7 HAT, GEWINNT',
      'paddleDuel.tip': 'Bewege deinen Schläger mit <b>Maus</b>, <b>Touch</b> oder <b>↑ ↓</b><br>Triff den Ball außermittig, um einen Winkel zu erzeugen',
      'paddleDuel.hudYou': 'DU',
      'paddleDuel.hudAi': 'KI',
      'paddleDuel.hudLongest': 'LÄNGSTER BALLWECHSEL',
      'paddleDuel.diffEasy': 'LEICHT',
      'paddleDuel.diffMedium': 'MITTEL',
      'paddleDuel.diffHard': 'SCHWER',
      'paddleDuel.newRecord': '🏆 NEUER BALLWECHSEL-REKORD!',
      'paddleDuel.serve': 'Klicken oder LEERTASTE zum Aufschlag',
      'paddleDuel.canvasRally': 'BALLWECHSEL {n}',
      'paddleDuel.bestRally': '🏅 Rekord: längster Ballwechsel {n} Schläge',
      'paddleDuel.bestRallyLabel': 'Längster Ballwechsel: {n} Schläge',
      'paddleDuel.first': 'Erstes Duell — viel Glück!',
      'paddleDuel.shareWin': 'Ich habe die KI {you}:{cpu} bei Paddle Duel 🏓 besiegt. Längster Ballwechsel: {rally} Schläge. Hier spielen: {url}',
      'paddleDuel.shareLose': 'Die KI hat mich {cpu}:{you} bei Paddle Duel 🏓 besiegt. Längster Ballwechsel: {rally} Schläge. Hier spielen: {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — Kostenloser Weltraum-Shooter online',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': 'ÜBERLEBE DIE WELLEN',
      'starDefender.tip': 'Bewege dich mit <b>Maus</b> / <b>Touch</b> / <b>← →</b><br>Dein Schiff <b>feuert automatisch</b> — weiche aus und ziele durch Bewegung',
      'starDefender.hudScore': 'PUNKTE',
      'starDefender.hudWave': 'WELLE',
      'starDefender.hudLives': 'LEBEN',
      'starDefender.finalLabel': 'ENDPUNKTE',
      'starDefender.canvasWave': 'WELLE {n}',
      'starDefender.first': 'Erster Flug, Pilot!',
      'starDefender.share': 'Ich habe {n} Punkte bei Star Defender 🚀 geschafft (Welle {w}). Schaffst du mehr? Hier spielen: {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — Kostenloses Snake-Spiel online',
      'snake.title': 'SNAKE',
      'snake.subtitle': 'DER KLASSIKER SCHLECHTHIN',
      'snake.tip': 'Drehe mit den Pfeiltasten / <b>WASD</b> · <b>wische</b> auf dem Handy<br>Drücke <b>P</b> oder <b>Esc</b> für Pause',
      'snake.hudScore': 'PUNKTE',
      'snake.hudLevel': 'TEMPO-ST.',
      'snake.hudLength': 'LÄNGE',
      'snake.paused': 'PAUSIERT',
      'snake.first': 'Erste Runde — viel Glück!',
      'snake.share': 'Ich habe {n} Punkte bei Snake 🐍 geschafft. Schaffst du mehr? Hier spielen: {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — Kostenloses 2048-Puzzle online',
      'g2048.hudScore': 'PUNKTE',
      'g2048.hudBest': 'REKORD',
      'g2048.hint': '<b>Wischen</b> oder <b>Pfeiltasten</b> / <b>WASD</b> zum Verschieben · <b>U</b> zum Rückgängigmachen',
      'g2048.intro': 'Verschmelze gleiche Kacheln bis <b>2048</b>.<br>Jeder Zug fügt eine neue Kachel hinzu — plane voraus!',
      'g2048.winTitle': 'DU HAST 2048 ERREICHT!',
      'g2048.scoreLabel': 'Punkte',
      'g2048.keepGoing': 'WEITERSPIELEN',
      'g2048.newGame': 'NEUES SPIEL',
      'g2048.noMoves': 'KEINE ZÜGE MEHR',
      'g2048.undoTitle': 'Letzten Zug rückgängig machen',
      'g2048.share': 'Ich habe {n} Punkte bei 2048 🔢 geschafft. Schaffst du mehr? Hier spielen: {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — Kostenloses Minesweeper online',
      'minesweeper.hudMines': 'MINEN',
      'minesweeper.hudTime': 'ZEIT',
      'minesweeper.newGame': 'Neues Spiel',
      'minesweeper.hint': 'Linksklick oder Tippen zum Aufdecken · Rechtsklick oder langes Drücken zum Markieren 🚩',
      'minesweeper.boom': '💥 BUMM! Du bist auf eine Mine getreten.',
      'minesweeper.cleared': '🏆 GESCHAFFT! {cols}×{rows} in {sec} s',
      'minesweeper.shareWin': 'Ich habe Minesweeper {diff} 💣 in {sec} Sekunden geräumt — neue Bestzeit! Schaffst du mehr? Hier spielen: {url}',
      'minesweeper.shareWinPlain': 'Ich habe Minesweeper {diff} 💣 in {sec} Sekunden geräumt. Schaffst du mehr? Hier spielen: {url}',
      'minesweeper.shareLose': 'Minesweeper hat mich erwischt 💥 Glaubst du, du schaffst es? Hier spielen: {url}'
    },

    ja: {
      /* ---- shared ---- */
      'common.play': 'プレイ',
      'common.start': 'スタート',
      'common.playAgain': 'もう一度プレイ',
      'common.newGame': '新しいゲーム',
      'common.shareScore': 'スコアをシェア',
      'common.copied': '✅ コピーしました！',
      'common.best': 'ベスト',
      'common.score': 'スコア',
      'common.paused': '一時停止中',
      'common.newRecord': '🏆 新記録！',
      'common.toggleSound': 'サウンドのオン／オフ',
      'common.language': '言語',
      'common.madeBy': '制作：',
      'common.moreGames': '🎮 他のゲーム',
      'common.freeVideo': '— 無料オンライン動画ダウンローダー',
      'common.bestScore': '🏅 ベストスコア：{n}',
      'common.bestLabel': 'ベスト：{n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — インストール不要で遊べる無料オンラインゲーム',
      'hub.docTitleCat': '{cat}ゲーム — インストール不要の無料オンラインゲーム',
      'hub.title': '🎮 Web Games',
      'hub.tagline': '<b>すぐ遊べる</b>無料オンラインゲーム集 — インストール不要、登録不要、ダウンロード不要。<br>純粋な HTML5。スマホ・タブレット・PC で動きます。',
      'hub.heading': 'ゲーム一覧',
      'hub.count': '全 {n} ゲーム · すべて無料 · インストール不要',
      'hub.empty': 'このカテゴリのゲームはまだありません。',
      'hub.about': '<b>このコレクションについて。</b>どのゲームも自己完結した HTML5 の単一ファイルです — フレームワークなし、ビルドツールなし、トラッキングなし、外部リソースなし。カードを開けば 1 秒以内に遊べます。ベストスコアはブラウザに保存されます。MIT ライセンスのオープンソースです。',
      'hub.contribute': '🛠️ <b>ゲームを追加しませんか？</b>このコレクションは開放型です — 単一ファイル・依存ゼロの HTML5 ゲームを作り、一覧に登録して <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">プルリクエストを送ってください</a>。手順は README の <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">コントリビューションガイド</a> をご覧ください。',
      'hub.catAll': 'すべて',
      'hub.catArcade': 'アーケード',
      'hub.catClassic': 'クラシック',
      'hub.catPuzzle': 'パズル',
      'hub.catAction': 'アクション',
      'hub.playCard': 'プレイ',
      'hub.ldName': 'Web Games — 無料オンラインゲーム',
      'hub.openSource': '無料・オープンソース：',
      'hub.alsoTry': 'こちらもどうぞ：',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': '小さな飛ぶアリの冒険。タップで羽ばたいて、枝の隙間をすり抜けよう。',
      'hub.desc.ant-jump': 'アリを延々とジャンプさせて上へ。動く足場、壊れる足場、バネに注意。',
      'hub.desc.block-drop': '落ちてくるブロックを消して積み上げろ。だんだん速くなる。',
      'hub.desc.breakout': 'パドルの角度を極めてすべてのブロックを破壊。残機 3、ステージは無限。',
      'hub.desc.paddle-duel': 'Pong 風のパドル対決。AI と 3 段階の難易度、先に 7 点取ったほうが勝ち。',
      'hub.desc.snake': '永遠の定番。食べて、伸びて、加速する — 自分を噛まないように。',
      'hub.desc.2048': 'タイルをスライドして合体。2048 を目指して、その先も続けよう。',
      'hub.desc.minesweeper': '3 段階の難易度、最初のクリックは必ず安全。地雷に旗を立てて全部開けよう。',
      'hub.desc.star-defender': '次々と押し寄せる敵。撃って、かわして、できるだけ生き延びろ。',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — 無料オンラインの羽ばたきアクション',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': '小さな飛ぶアリの冒険',
      'antFlap.tip': '画面をタップ、または <b>スペース</b> で羽ばたく<br>枝の隙間をすり抜けよう — ぶつからないで！',
      'antFlap.first': '初フライト — がんばって！',
      'antFlap.share': 'Ant Flap 🐜 で {n} 点でした。超えられる？プレイはこちら：{url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — 無料オンラインのジャンプアクション',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': 'どこまでも高く登ろう',
      'antJump.tip': 'アリは<b>自動で跳ねます</b>。<br><b>← →</b> / <b>A D</b> か画面の<b>左右タップ</b>で操作<br>両方を押さえると減速。画面の端はつながっています！',
      'antJump.hudHeight': '高さ',
      'antJump.hudBest': 'ベスト',
      'antJump.finalLabel': '到達高度',
      'antJump.first': '初クライム — がんばって！',
      'antJump.bestH': '🏅 ベスト：{n} m',
      'antJump.bestLabelH': 'ベスト：{n} m',
      'antJump.canvasBest': 'ベスト {n} m',
      'antJump.share': 'Ant Jump 🐜 で {n} m 登りました。もっと高く行ける？プレイはこちら：{url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — 無料オンラインの落ちものパズル',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': '積んで · 消して · 生き残れ',
      'blockDrop.tip': '<b>← →</b> 移動 · <b>↑</b> 回転 · <b>↓</b> ソフトドロップ · <b>スペース</b> ハードドロップ · <b>C</b> ホールド<br>スマホでは画面下のボタンを使います',
      'blockDrop.hudScore': 'スコア',
      'blockDrop.hudLevel': 'レベル',
      'blockDrop.hudLines': 'ライン',
      'blockDrop.hudBest': 'ベスト',
      'blockDrop.finalLabel': '最終スコア',
      'blockDrop.fourLineClear': '{n} 回 4 ライン消し',
      'blockDrop.first': '初プレイ — がんばって！',
      'blockDrop.ariaLeft': '左に移動',
      'blockDrop.ariaRight': '右に移動',
      'blockDrop.ariaRotate': '回転',
      'blockDrop.ariaSoft': 'ソフトドロップ',
      'blockDrop.ariaHard': 'ハードドロップ',
      'blockDrop.canvasNext': 'ネクスト',
      'blockDrop.canvasHold': 'ホールド',
      'blockDrop.paused': '一時停止中',
      'blockDrop.resume': 'P か Esc で再開',
      'blockDrop.linesCleared': '{n} ライン消去',
      'blockDrop.finalLevel': 'レベル {n}',
      'blockDrop.share': 'Block Drop 🧊 で {n} 点（{lines} ライン、レベル {level}）。超えられる？プレイはこちら：{url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — 無料オンラインのブロック崩し',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': 'すべてのブロックを砕け',
      'breakout.tip': '<b>マウス</b> / <b>タッチ</b> / <b>矢印キー</b> で移動<br>クリックか <b>スペース</b> で発射',
      'breakout.hudScore': 'スコア',
      'breakout.hudLevel': 'レベル',
      'breakout.hudLives': '残機',
      'breakout.levelTitle': 'レベル {n}',
      'breakout.levelTip': 'ボールが速くなり、ブロックが硬くなります。',
      'breakout.levelWord': 'レベル',
      'breakout.continue': '続ける',
      'breakout.launch': 'クリックかスペースで発射',
      'breakout.first': '初プレイ — がんばって！',
      'breakout.share': 'Breakout 🧱 で {n} 点（レベル {level}）。超えられる？プレイはこちら：{url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — 無料オンラインの Pong 風対戦ゲーム',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': '先に 7 点取ったほうが勝ち',
      'paddleDuel.tip': '<b>マウス</b>・<b>タッチ</b>・<b>↑ ↓</b> でパドルを動かす<br>中心からずらして当てると角度がつく',
      'paddleDuel.hudYou': 'あなた',
      'paddleDuel.hudAi': 'CPU',
      'paddleDuel.hudLongest': '最長ラリー',
      'paddleDuel.diffEasy': 'やさしい',
      'paddleDuel.diffMedium': 'ふつう',
      'paddleDuel.diffHard': 'むずかしい',
      'paddleDuel.newRecord': '🏆 ラリー新記録！',
      'paddleDuel.serve': 'クリックかスペースでサーブ',
      'paddleDuel.canvasRally': 'ラリー {n}',
      'paddleDuel.bestRally': '🏅 ベスト：最長ラリー {n} 回',
      'paddleDuel.bestRallyLabel': '最長ラリー：{n} 回',
      'paddleDuel.first': '初対戦 — がんばって！',
      'paddleDuel.shareWin': 'Paddle Duel 🏓 で CPU に {you}:{cpu} で勝ちました。最長ラリー {rally} 回。プレイはこちら：{url}',
      'paddleDuel.shareLose': 'Paddle Duel 🏓 で CPU に {cpu}:{you} で負けました。最長ラリー {rally} 回。プレイはこちら：{url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — 無料オンラインのシューティング',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': '波状攻撃を生き延びろ',
      'starDefender.tip': '<b>マウス</b> / <b>タッチ</b> / <b>← →</b> で移動<br>自機は<b>自動で射撃</b> — 動いて避けて狙うだけ',
      'starDefender.hudScore': 'スコア',
      'starDefender.hudWave': 'ウェーブ',
      'starDefender.hudLives': '残機',
      'starDefender.finalLabel': '最終スコア',
      'starDefender.canvasWave': 'ウェーブ {n}',
      'starDefender.first': '初出撃、パイロット！',
      'starDefender.share': 'Star Defender 🚀 で {n} 点（ウェーブ {w}）。超えられる？プレイはこちら：{url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — 無料オンラインのスネークゲーム',
      'snake.title': 'SNAKE',
      'snake.subtitle': '永遠の定番',
      'snake.tip': '矢印キー / <b>WASD</b> で向きを変える · スマホは<b>スワイプ</b><br><b>P</b> か <b>Esc</b> で一時停止',
      'snake.hudScore': 'スコア',
      'snake.hudLevel': 'スピード',
      'snake.hudLength': '長さ',
      'snake.paused': '一時停止中',
      'snake.first': '初プレイ — がんばって！',
      'snake.share': 'Snake 🐍 で {n} 点でした。超えられる？プレイはこちら：{url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — 無料オンラインの 2048 パズル',
      'g2048.hudScore': 'スコア',
      'g2048.hudBest': 'ベスト',
      'g2048.hint': '<b>スワイプ</b>か<b>矢印キー</b> / <b>WASD</b> でタイルを移動 · <b>U</b> で元に戻す',
      'g2048.intro': '同じ数字のタイルを合体させて <b>2048</b> を目指そう。<br>1 手ごとにタイルが増える — 先を読んで！',
      'g2048.winTitle': '2048 達成！',
      'g2048.scoreLabel': 'スコア',
      'g2048.keepGoing': '続ける',
      'g2048.newGame': '新しいゲーム',
      'g2048.noMoves': '動かせません',
      'g2048.undoTitle': '1 手戻す',
      'g2048.share': '2048 🔢 で {n} 点でした。超えられる？プレイはこちら：{url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — 無料オンラインゲーム',
      'minesweeper.hudMines': '地雷',
      'minesweeper.hudTime': '時間',
      'minesweeper.newGame': '新しいゲーム',
      'minesweeper.hint': '左クリック / タップで開く · 右クリック / 長押しで旗 🚩',
      'minesweeper.boom': '💥 ドカーン！地雷を踏みました。',
      'minesweeper.cleared': '🏆 クリア！{cols}×{rows} を {sec} 秒で',
      'minesweeper.shareWin': 'Minesweeper（{diff}）💣 を {sec} 秒でクリア — 自己ベスト！超えられる？プレイはこちら：{url}',
      'minesweeper.shareWinPlain': 'Minesweeper（{diff}）💣 を {sec} 秒でクリアしました。超えられる？プレイはこちら：{url}',
      'minesweeper.shareLose': 'Minesweeper 💣 にやられました。クリアできる？プレイはこちら：{url}'
    },

    ko: {
      /* ---- shared ---- */
      'common.play': '플레이',
      'common.start': '시작',
      'common.playAgain': '다시 플레이',
      'common.newGame': '새 게임',
      'common.shareScore': '점수 공유',
      'common.copied': '✅ 복사되었습니다!',
      'common.best': '최고',
      'common.score': '점수',
      'common.paused': '일시정지',
      'common.newRecord': '🏆 신기록!',
      'common.toggleSound': '소리 켜기/끄기',
      'common.language': '언어',
      'common.madeBy': '만든 사람',
      'common.moreGames': '🎮 더 많은 게임',
      'common.freeVideo': '— 무료 온라인 동영상 다운로더',
      'common.bestScore': '🏅 최고 점수: {n}',
      'common.bestLabel': '최고: {n}',

      /* ---- hub ---- */
      'hub.docTitle': 'Web Games — 설치 없이 즐기는 무료 온라인 게임',
      'hub.docTitleCat': '{cat} 게임 — 설치 없는 무료 온라인 게임',
      'hub.title': '🎮 Web Games',
      'hub.tagline': '<b>바로 즐기는</b> 무료 온라인 게임 모음 — 설치도, 가입도, 다운로드도 필요 없습니다.<br>순수 HTML5. 휴대폰, 태블릿, PC 모두 지원.',
      'hub.heading': '게임 목록',
      'hub.count': '총 {n}개 게임 · 전부 무료 · 설치 불필요',
      'hub.empty': '이 카테고리에는 아직 게임이 없습니다.',
      'hub.about': '<b>이 컬렉션 소개.</b> 모든 게임은 스스로 완결된 단일 HTML5 파일입니다 — 프레임워크도, 빌드 도구도, 추적도, 외부 리소스도 없습니다. 카드를 열면 1초 안에 플레이할 수 있습니다. 최고 점수는 브라우저에 저장됩니다. MIT 라이선스 오픈 소스입니다.',
      'hub.contribute': '🛠️ <b>게임을 추가하고 싶으신가요?</b> 이 컬렉션은 열려 있습니다 — 단일 파일, 의존성 없는 HTML5 게임을 만들어 목록에 등록한 뒤 <a href="https://github.com/mashukui/web-games" target="_blank" rel="noopener">풀 리퀘스트를 보내주세요</a>. 자세한 방법은 README의 <a href="https://github.com/mashukui/web-games#add-a-game" target="_blank" rel="noopener">기여 가이드</a>를 참고하세요.',
      'hub.catAll': '전체',
      'hub.catArcade': '아케이드',
      'hub.catClassic': '클래식',
      'hub.catPuzzle': '퍼즐',
      'hub.catAction': '액션',
      'hub.playCard': '플레이',
      'hub.ldName': 'Web Games — 무료 온라인 게임',
      'hub.openSource': '무료 오픈 소스:',
      'hub.alsoTry': '이것도 함께',

      /* ---- game names ---- */
      'game.ant-flap': 'Ant Flap',
      'game.ant-jump': 'Ant Jump',
      'game.block-drop': 'Block Drop',
      'game.breakout': 'Breakout',
      'game.paddle-duel': 'Paddle Duel',
      'game.snake': 'Snake',
      'game.2048': '2048',
      'game.minesweeper': 'Minesweeper',
      'game.star-defender': 'Star Defender',

      /* ---- hub descriptions ---- */
      'hub.desc.ant-flap': '작은 날아다니는 개미의 모험. 눌러서 날갯짓하고 나뭇가지 사이를 통과하세요.',
      'hub.desc.ant-jump': '개미가 끝없이 플랫폼을 튕겨 올라갑니다. 움직이는 발판, 부서지는 발판, 스프링을 조심하세요.',
      'hub.desc.block-drop': '떨어지는 블록을 지우고 쌓아 올리세요. 점점 빨라집니다.',
      'hub.desc.breakout': '패들 각도를 정확히 맞춰 모든 벽돌을 부수세요. 목숨 3개, 무한 스테이지.',
      'hub.desc.paddle-duel': 'Pong 스타일 패들 대결, AI와 3단계 난이도. 먼저 7점을 낸 쪽이 승리.',
      'hub.desc.snake': '영원한 고전. 먹고, 자라나고, 빨라집니다 — 자기 몸만 물지 마세요.',
      'hub.desc.2048': '타일을 밀어 합치세요. 2048을 만들고 계속 도전하세요.',
      'hub.desc.minesweeper': '3단계 난이도, 첫 클릭은 항상 안전. 지뢰에 깃발을 꽂고 모두 열어보세요.',
      'hub.desc.star-defender': '끝없이 밀려오는 적들. 쏘고 피하고 최대한 오래 살아남으세요.',

      /* ---- ant-flap ---- */
      'antFlap.docTitle': 'Ant Flap — 무료 온라인 날갯짓 게임',
      'antFlap.title': 'ANT FLAP',
      'antFlap.subtitle': '작은 날아다니는 개미의 모험',
      'antFlap.tip': '화면을 누르거나 <b>스페이스</b>로 날갯짓하세요<br>나뭇가지 사이를 통과하세요 — 부딪히면 안 돼요!',
      'antFlap.first': '첫 비행 — 행운을 빌어요!',
      'antFlap.share': 'Ant Flap 🐜 에서 {n}점을 얻었어요. 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- ant-jump ---- */
      'antJump.docTitle': 'Ant Jump — 무료 온라인 점프 게임',
      'antJump.title': 'ANT JUMP',
      'antJump.subtitle': '가능한 높이 올라가세요',
      'antJump.tip': '개미는 <b>자동으로 튕깁니다</b>.<br><b>← →</b> / <b>A D</b> 또는 화면 <b>좌우 터치</b>로 조종하세요<br>양쪽을 함께 누르면 감속합니다. 화면 가장자리는 연결되어 있어요!',
      'antJump.hudHeight': '높이',
      'antJump.hudBest': '최고',
      'antJump.finalLabel': '도달 높이',
      'antJump.first': '첫 등반 — 행운을 빌어요!',
      'antJump.bestH': '🏅 최고: {n} m',
      'antJump.bestLabelH': '최고: {n} m',
      'antJump.canvasBest': '최고 {n} m',
      'antJump.share': 'Ant Jump 🐜 에서 {n} m 올라갔어요. 더 높이 갈 수 있겠어요? 여기서 플레이: {url}',

      /* ---- block-drop ---- */
      'blockDrop.docTitle': 'Block Drop — 무료 온라인 테트리스 스타일 블록 게임',
      'blockDrop.title': 'BLOCK DROP',
      'blockDrop.subtitle': '쌓고 · 지우고 · 살아남기',
      'blockDrop.tip': '<b>← →</b> 이동 · <b>↑</b> 회전 · <b>↓</b> 소프트 드롭 · <b>스페이스</b> 하드 드롭 · <b>C</b> 홀드<br>모바일에서는 화면 아래 버튼을 사용하세요',
      'blockDrop.hudScore': '점수',
      'blockDrop.hudLevel': '레벨',
      'blockDrop.hudLines': '줄',
      'blockDrop.hudBest': '최고',
      'blockDrop.finalLabel': '최종 점수',
      'blockDrop.fourLineClear': '{n}회 4줄 제거',
      'blockDrop.first': '첫 플레이 — 행운을 빌어요!',
      'blockDrop.ariaLeft': '왼쪽으로 이동',
      'blockDrop.ariaRight': '오른쪽으로 이동',
      'blockDrop.ariaRotate': '회전',
      'blockDrop.ariaSoft': '소프트 드롭',
      'blockDrop.ariaHard': '하드 드롭',
      'blockDrop.canvasNext': '다음',
      'blockDrop.canvasHold': '홀드',
      'blockDrop.paused': '일시정지',
      'blockDrop.resume': 'P 또는 Esc로 계속',
      'blockDrop.linesCleared': '{n}줄 제거',
      'blockDrop.finalLevel': '레벨 {n}',
      'blockDrop.share': 'Block Drop 🧊 에서 {n}점 ({lines}줄, 레벨 {level}). 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- breakout ---- */
      'breakout.docTitle': 'Breakout — 무료 온라인 벽돌깨기 게임',
      'breakout.title': 'BREAKOUT',
      'breakout.subtitle': '모든 벽돌을 부수세요',
      'breakout.tip': '<b>마우스</b> / <b>터치</b> / <b>방향키</b>로 이동<br>클릭하거나 <b>스페이스</b>로 발사',
      'breakout.hudScore': '점수',
      'breakout.hudLevel': '레벨',
      'breakout.hudLives': '목숨',
      'breakout.levelTitle': '레벨 {n}',
      'breakout.levelTip': '공이 빨라지고 벽돌이 단단해집니다.',
      'breakout.levelWord': '레벨',
      'breakout.continue': '계속',
      'breakout.launch': '클릭하거나 스페이스로 발사',
      'breakout.first': '첫 플레이 — 행운을 빌어요!',
      'breakout.share': 'Breakout 🧱 에서 {n}점 (레벨 {level}). 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- paddle-duel ---- */
      'paddleDuel.docTitle': 'Paddle Duel — 무료 온라인 Pong 스타일 게임',
      'paddleDuel.title': 'PADDLE DUEL',
      'paddleDuel.subtitle': '먼저 7점을 내면 승리',
      'paddleDuel.tip': '<b>마우스</b>, <b>터치</b>, <b>↑ ↓</b>로 패들을 움직이세요<br>공을 중앙에서 벗어나게 맞히면 각도가 생깁니다',
      'paddleDuel.hudYou': '나',
      'paddleDuel.hudAi': 'AI',
      'paddleDuel.hudLongest': '최장 랠리',
      'paddleDuel.diffEasy': '쉬움',
      'paddleDuel.diffMedium': '보통',
      'paddleDuel.diffHard': '어려움',
      'paddleDuel.newRecord': '🏆 랠리 신기록!',
      'paddleDuel.serve': '클릭하거나 스페이스로 서브',
      'paddleDuel.canvasRally': '랠리 {n}',
      'paddleDuel.bestRally': '🏅 최고: 최장 랠리 {n}회',
      'paddleDuel.bestRallyLabel': '최장 랠리: {n}회',
      'paddleDuel.first': '첫 대결 — 행운을 빌어요!',
      'paddleDuel.shareWin': 'Paddle Duel 🏓 에서 AI를 {you}:{cpu}로 이겼어요. 최장 랠리 {rally}회. 여기서 플레이: {url}',
      'paddleDuel.shareLose': 'Paddle Duel 🏓 에서 AI에게 {cpu}:{you}로 졌어요. 최장 랠리 {rally}회. 여기서 플레이: {url}',

      /* ---- star-defender ---- */
      'starDefender.docTitle': 'Star Defender — 무료 온라인 우주 슈팅 게임',
      'starDefender.title': 'STAR DEFENDER',
      'starDefender.subtitle': '웨이브를 버텨내세요',
      'starDefender.tip': '<b>마우스</b> / <b>터치</b> / <b>← →</b>로 이동<br>함선은 <b>자동으로 발사</b>합니다 — 피하고 움직이며 조준하세요',
      'starDefender.hudScore': '점수',
      'starDefender.hudWave': '웨이브',
      'starDefender.hudLives': '목숨',
      'starDefender.finalLabel': '최종 점수',
      'starDefender.canvasWave': '웨이브 {n}',
      'starDefender.first': '첫 출격, 파일럿!',
      'starDefender.share': 'Star Defender 🚀 에서 {n}점 (웨이브 {w}). 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- snake ---- */
      'snake.docTitle': 'Snake — 무료 온라인 스네이크 게임',
      'snake.title': 'SNAKE',
      'snake.subtitle': '영원한 고전',
      'snake.tip': '방향키 / <b>WASD</b>로 방향 전환 · 모바일에서는 <b>스와이프</b><br><b>P</b> 또는 <b>Esc</b>로 일시정지',
      'snake.hudScore': '점수',
      'snake.hudLevel': '속도',
      'snake.hudLength': '길이',
      'snake.paused': '일시정지',
      'snake.first': '첫 플레이 — 행운을 빌어요!',
      'snake.share': 'Snake 🐍 에서 {n} 점을 얻었어요. 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- 2048 ---- */
      'g2048.docTitle': '2048 — 무료 온라인 2048 퍼즐 게임',
      'g2048.hudScore': '점수',
      'g2048.hudBest': '최고',
      'g2048.hint': '<b>스와이프</b>하거나 <b>방향키</b> / <b>WASD</b>로 타일 이동 · <b>U</b>로 되돌리기',
      'g2048.intro': '같은 숫자 타일을 합쳐 <b>2048</b>을 만드세요.<br>한 번 움직일 때마다 새 타일이 생깁니다 — 미리 계획하세요!',
      'g2048.winTitle': '2048 달성!',
      'g2048.scoreLabel': '점수',
      'g2048.keepGoing': '계속하기',
      'g2048.newGame': '새 게임',
      'g2048.noMoves': '움직일 수 없음',
      'g2048.undoTitle': '한 수 되돌리기',
      'g2048.share': '2048 🔢 에서 {n}점을 얻었어요. 이길 수 있겠어요? 여기서 플레이: {url}',

      /* ---- minesweeper ---- */
      'minesweeper.docTitle': 'Minesweeper — 무료 온라인 게임',
      'minesweeper.hudMines': '지뢰',
      'minesweeper.hudTime': '시간',
      'minesweeper.newGame': '새 게임',
      'minesweeper.hint': '왼쪽 클릭 / 탭으로 열기 · 오른쪽 클릭 / 길게 눌러 깃발 🚩',
      'minesweeper.boom': '💥 펑! 지뢰를 밟았습니다.',
      'minesweeper.cleared': '🏆 클리어! {cols}×{rows} 를 {sec}초에',
      'minesweeper.shareWin': 'Minesweeper({diff}) 💣 를 {sec}초에 클리어 — 개인 최고 기록! 이길 수 있겠어요? 여기서 플레이: {url}',
      'minesweeper.shareWinPlain': 'Minesweeper({diff}) 💣 를 {sec}초에 클리어했어요. 이길 수 있겠어요? 여기서 플레이: {url}',
      'minesweeper.shareLose': 'Minesweeper 💣 에 당했어요. 클리어할 수 있겠어요? 여기서 플레이: {url}'
    }

  };

  /* ------------------------------------------------------------------ */
  /* Language resolution: ?lang=  >  localStorage  >  browser  >  en     */
  /* ------------------------------------------------------------------ */
  function normalize(code) {
    if (!code) return null;
    code = String(code).toLowerCase();
    if (S[code]) return code;
    var base = code.split('-')[0];
    if (S[base]) return base;
    if (base === 'in') return S.id ? 'id' : null;   // legacy "in" → Indonesian, unused here
    return null;
  }

  function fromQuery() {
    var m = /[?&]lang=([^&]+)/.exec(global.location.search || '');
    return m ? normalize(decodeURIComponent(m[1])) : null;
  }

  function fromStore() {
    try { return normalize(global.localStorage.getItem(STORE_KEY)); } catch (e) { return null; }
  }

  function fromBrowser() {
    var list = global.navigator.languages || [global.navigator.language || global.navigator.userLanguage || ''];
    for (var i = 0; i < list.length; i++) {
      var hit = normalize(list[i]);
      if (hit) return hit;
    }
    return null;
  }

  var lang = fromQuery() || fromStore() || fromBrowser() || DEFAULT;

  /* ------------------------------------------------------------------ */
  /* Public API                                                          */
  /* ------------------------------------------------------------------ */

  /* t('key', { n: 3 }) — falls back to English, then to the key itself. */
  function t(key, vars) {
    var dict = S[lang] || S[DEFAULT];
    var out = dict[key];
    if (out === undefined || out === null || out === '') out = S[DEFAULT][key];
    if (out === undefined) return key;
    if (vars) {
      out = out.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] === undefined || vars[k] === null ? m : String(vars[k]);
      });
    }
    return out;
  }

  /* Apply translations to every tagged node inside `root`. */
  function apply(root) {
    root = root || global.document;
    if (!root || !root.querySelectorAll) return;
    var nodes, i, el;

    nodes = root.querySelectorAll('[data-i18n]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.textContent = t(el.getAttribute('data-i18n'));
    }
    nodes = root.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    }
    nodes = root.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    }
    nodes = root.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    }
    nodes = root.querySelectorAll('[data-i18n-content]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
    }

    if (global.document && global.document.documentElement) {
      global.document.documentElement.setAttribute('lang', lang);
    }
    // <html data-title-key="snake.docTitle"> keeps the tab title in sync.
    var rootEl = global.document && global.document.documentElement;
    var titleKey = rootEl && rootEl.getAttribute('data-title-key');
    if (titleKey) global.document.title = t(titleKey);
  }

  var listeners = [];

  /* Register a re-render hook: fn(newLang) runs on every language change. */
  function onChange(fn) {
    if (typeof fn === 'function') {
      listeners.push(fn);
      return fn;
    }
    return null;
  }

  function current() { return lang; }

  /* Once the user picks a language by hand, ?lang= must stop overriding it —
     otherwise the next reload snaps back to the shared link's language.
     Drop only the lang param; leave the hub's own ?cat= untouched. */
  function dropLangParam() {
    try {
      var loc = global.location;
      if (!loc || !loc.search || !/[?&]lang=/.test(loc.search)) return;
      var parts = loc.search.replace(/^\?/, '').split('&').filter(function (p) {
        return p && !/^lang=/.test(p);
      });
      var url = loc.pathname + (parts.length ? '?' + parts.join('&') : '') + (loc.hash || '');
      if (global.history && global.history.replaceState) global.history.replaceState(null, '', url);
    } catch (e) { /* older browsers: silently keep the param */ }
  }

  function setLang(code, opts) {
    var next = normalize(code);
    if (!next || next === lang) return false;
    lang = next;
    try { global.localStorage.setItem(STORE_KEY, next); } catch (e) {}
    dropLangParam();
    apply();
    renderSwitcher();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](lang); } catch (e) { /* one bad listener must not break the rest */ }
    }
    return true;
  }

  /* ------------------------------------------------------------------ */
  /* Language picker UI (injected once per page)                         */
  /* ------------------------------------------------------------------ */
  var CSS_ID = 'wg-lang-css';
  var CSS = '' +
    '.wg-lang{position:relative;display:inline-block;line-height:1;vertical-align:middle;font-family:inherit;}' +
    '.wg-lang-btn{display:inline-flex;align-items:center;gap:6px;font:700 12px/1 inherit;font-family:inherit;' +
      'letter-spacing:.04em;color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);' +
      'border-radius:999px;padding:7px 12px;cursor:pointer;white-space:nowrap;box-shadow:none;margin:0;' +
      'transition:background .15s,border-color .15s;}' +
    '.wg-lang-btn:hover{background:rgba(255,255,255,.24);border-color:rgba(255,255,255,.4);}' +
    '.wg-lang-btn:active{transform:scale(.96);}' +
    '.wg-lang-globe{font-size:13px;line-height:1;}' +
    '.wg-lang-menu{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);' +
      'background:#132432;border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:6px;' +
      'min-width:168px;box-shadow:0 16px 44px rgba(0,0,0,.55);z-index:99999;display:none;text-align:left;}' +
    '.wg-lang-menu.open{display:block;}' +
    '.wg-lang-menu button{display:block;width:100%;text-align:left;font:500 13px/1.4 inherit;font-family:inherit;' +
      'color:rgba(255,255,255,.88);background:none;border:0;border-radius:8px;padding:9px 12px;cursor:pointer;' +
      'white-space:nowrap;margin:0;box-shadow:none;}' +
    '.wg-lang-menu button:hover{background:rgba(255,255,255,.12);color:#fff;}' +
    '.wg-lang-menu button[aria-current="true"]{color:#ffd76e;font-weight:700;}' +
    '.wg-lang-menu button[aria-current="true"]::after{content:" ✓";}';

  function injectCSS() {
    if (global.document.getElementById(CSS_ID)) return;
    var st = global.document.createElement('style');
    st.id = CSS_ID;
    st.appendChild(global.document.createTextNode(CSS));
    (global.document.head || global.document.documentElement).appendChild(st);
  }

  function currentLang() {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === lang) return LANGS[i];
    return LANGS[0];
  }

  function renderSwitcher() {
    var box = global.document.getElementById('wg-lang');
    if (!box) return;
    var btn = box.querySelector('.wg-lang-btn');
    if (btn) {
      var code = btn.querySelector('.wg-lang-code');
      if (code) code.textContent = currentLang().short;
    }
    var items = box.querySelectorAll('.wg-lang-menu button');
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-current', items[i].getAttribute('data-lang') === lang ? 'true' : 'false');
    }
  }

  function buildSwitcher() {
    var doc = global.document;
    if (doc.getElementById('wg-lang')) return;

    /* mount point: [data-lang-switcher] if present, otherwise the footer */
    var host = doc.querySelector('[data-lang-switcher]');
    var inFooter = false;
    if (!host) {
      host = doc.querySelector('.footer');
      inFooter = true;
      if (!host) return;
    }

    injectCSS();

    var box = doc.createElement('span');
    box.className = 'wg-lang';
    box.id = 'wg-lang';

    var html = '<button type="button" class="wg-lang-btn" aria-haspopup="true" aria-expanded="false" ' +
      'aria-label="' + t('common.language').replace(/"/g, '&quot;') + '" ' +
      'title="' + t('common.language').replace(/"/g, '&quot;') + '">' +
      '<span class="wg-lang-globe" aria-hidden="true">🌐</span>' +
      '<span class="wg-lang-code">' + currentLang().short + '</span></button>' +
      '<span class="wg-lang-menu" role="menu">';
    for (var i = 0; i < LANGS.length; i++) {
      html += '<button type="button" role="menuitem" data-lang="' + LANGS[i].code + '">' + LANGS[i].name + '</button>';
    }
    html += '</span>';
    box.innerHTML = html;

    if (inFooter) {
      var row = doc.createElement('span');
      row.className = 'wg-lang-footer';
      row.style.display = 'block';
      row.style.marginTop = '10px';
      row.appendChild(box);
      host.appendChild(row);
    } else {
      host.appendChild(box);
    }

    var trigger = box.querySelector('.wg-lang-btn');
    var menu = box.querySelector('.wg-lang-menu');

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-lang]') : null;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      setLang(b.getAttribute('data-lang'));
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    doc.addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    renderSwitcher();
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    apply();
    buildSwitcher();
    /* keep other tabs of the same site in sync */
    if (global.addEventListener) {
      global.addEventListener('storage', function (e) {
        if (e.key === STORE_KEY && e.newValue && normalize(e.newValue) && normalize(e.newValue) !== lang) {
          lang = normalize(e.newValue);
          apply();
          renderSwitcher();
          for (var i = 0; i < listeners.length; i++) { try { listeners[i](lang); } catch (err) {} }
        }
      });
    }
  }

  if (global.document.readyState === 'loading') {
    global.document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* expose */
  global.WG = {
    t: t,
    apply: apply,
    setLang: setLang,
    onChange: onChange,
    current: current,
    langs: LANGS,
    renderSwitcher: renderSwitcher
  };
  global.t = t;   /* convenience for inline page scripts */

})(window);
