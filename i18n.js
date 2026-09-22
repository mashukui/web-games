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
      'common.start': 'START',
      'common.playAgain': 'PLAY AGAIN',
      'common.newGame': 'NEW GAME',
      'common.shareScore': 'SHARE SCORE',
      'common.copied': '✅ Copied!',
      'common.paused': 'PAUSED',
      'common.newRecord': '🏆 NEW RECORD!',
      'common.toggleSound': 'Toggle sound',
      'common.soundOff': 'Mute',
      'common.soundOn': 'Unmute',
      'common.language': 'Language',
      'common.backHome': 'Back to home',
      'common.home': 'Home',
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
      'hub.openSource': 'Free & open source on',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': 'Pour the coloured liquids between tubes until every tube holds a single colour. Every deal is verified solvable.',

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
      'minesweeper.shareLose': 'Minesweeper got me 💥 Think you can clear it? Play here: {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': 'Endless desert dash. Jump the cacti, duck the birds — the desert only gets faster.',
      'hub.desc.stack-tower': 'One tap, one block. Line up each layer and build the tallest tower you can.',
      'hub.desc.tic-tac-toe': 'Three in a row against an unbeatable AI — or grab a friend for two-player mode.',
      'hub.desc.memory-match': 'Flip two cards, remember what you saw, find every pair in three difficulties.',
      'hub.desc.whack-a-mole': '60 seconds of pure reflex. Whack the moles, grab the gold, dodge the bombs.',
      'hub.desc.connect-four': 'Drop a disc, line up four. Beat the computer in three difficulties.',
      'dinoRun.docTitle': 'Dino Run — Free Online Endless Runner Game',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': 'RUN · JUMP · DODGE',
      'dinoRun.tip': 'Press <b>SPACE</b> / <b>↑</b> to jump · hold <b>↓</b> to duck<br>On mobile tap <b>JUMP</b> or hold <b>DUCK</b>',
      'dinoRun.hudScore': 'SCORE',
      'dinoRun.hudBest': 'BEST',
      'dinoRun.btnJump': 'JUMP',
      'dinoRun.btnDuck': 'DUCK',
      'dinoRun.over': 'GAME OVER',
      'dinoRun.first': 'First run — good luck!',
      'dinoRun.share': 'I scored {n} points in Dino Run 🦖 Can you beat me? Play here: {url}',
      'stackTower.docTitle': 'Stack Tower — Free Online Stacking Game',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': 'BUILD IT TO THE SKY',
      'stackTower.tip': '<b>Tap</b> or press <b>SPACE</b> to drop the block<br>Line it up — the overhang is cut away!',
      'stackTower.hudHeight': 'HEIGHT',
      'stackTower.hudBest': 'BEST',
      'stackTower.over': 'THE TOWER FELL',
      'stackTower.perfect': 'PERFECT!',
      'stackTower.first': 'First block — good luck!',
      'stackTower.share': 'I stacked {n} blocks in Stack Tower 🏗️ Can you build higher? Play here: {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — Free Online Game vs Computer',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': 'THREE IN A ROW WINS',
      'ticTacToe.modeEasy': 'EASY',
      'ticTacToe.modeHard': 'IMPOSSIBLE',
      'ticTacToe.mode2p': '2 PLAYERS',
      'ticTacToe.thinking': 'COMPUTER IS THINKING…',
      'ticTacToe.turn': '{p} TO MOVE',
      'ticTacToe.you': 'YOU',
      'ticTacToe.ai': 'COMPUTER',
      'ticTacToe.p1': 'PLAYER 1',
      'ticTacToe.p2': 'PLAYER 2',
      'ticTacToe.draws': 'DRAWS',
      'ticTacToe.winYou': 'YOU WIN! 🎉',
      'ticTacToe.winAI': 'COMPUTER WINS',
      'ticTacToe.winP1': 'PLAYER 1 WINS!',
      'ticTacToe.winP2': 'PLAYER 2 WINS!',
      'ticTacToe.drawMsg': 'IT\'S A DRAW!',
      'ticTacToe.newRound': 'NEW ROUND',
      'ticTacToe.tip': 'Get three in a row — across, down or diagonally.',
      'memoryMatch.docTitle': 'Memory Match — Free Online Memory Card Game',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'FIND EVERY PAIR',
      'memoryMatch.modeEasy': 'EASY',
      'memoryMatch.modeMedium': 'MEDIUM',
      'memoryMatch.modeHard': 'HARD',
      'memoryMatch.hudPairs': 'PAIRS',
      'memoryMatch.hudMoves': 'MOVES',
      'memoryMatch.hudTime': 'TIME',
      'memoryMatch.bestLine': '🏅 Best: {moves} moves · {time}',
      'memoryMatch.first': 'No record yet — set the pace!',
      'memoryMatch.cardAria': 'Card {n}',
      'memoryMatch.winTitle': 'ALL PAIRS FOUND!',
      'memoryMatch.result': '{moves} moves · {time}',
      'memoryMatch.share': 'I cleared Memory Match 🃏 in {moves} moves ({time}). Can you beat me? Play here: {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — Free Online Arcade Game',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60 SECONDS OF REFLEXES',
      'whackAMole.hudTime': 'TIME',
      'whackAMole.hudScore': 'SCORE',
      'whackAMole.hudBest': 'BEST',
      'whackAMole.tip': 'Tap the moles 🐹 (+1) and the gold ⭐ (+3) — never hit a bomb 💣 (−2)',
      'whackAMole.startTip': 'You get <b>60 seconds</b>.<br>Moles 🐹 are worth 1 · gold ⭐ is worth 3 · bombs 💣 cost you 2.',
      'whackAMole.first': 'First run — good luck!',
      'whackAMole.over': 'TIME\'S UP!',
      'whackAMole.hits': '{hits} hits · {bombs} bombs',
      'whackAMole.share': 'I scored {n} points in Whack-a-Mole 🔨 ({hits} hits). Can you beat me? Play here: {url}',
      'connectFour.docTitle': 'Connect Four — Free Online Game vs Computer',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': 'FOUR IN A ROW WINS',
      'connectFour.modeEasy': 'EASY',
      'connectFour.modeMedium': 'MEDIUM',
      'connectFour.modeHard': 'HARD',
      'connectFour.you': 'YOU',
      'connectFour.ai': 'COMPUTER',
      'connectFour.draws': 'DRAWS',
      'connectFour.thinking': 'COMPUTER IS THINKING…',
      'connectFour.turn': '{p} TO MOVE',
      'connectFour.winYou': 'YOU WIN! 🎉',
      'connectFour.winAI': 'COMPUTER WINS',
      'connectFour.drawMsg': 'IT\'S A DRAW!',
      'connectFour.newRound': 'NEW ROUND',
      'connectFour.tip': 'Tap a column to drop your disc — you are red.',
      'connectFour.colAria': 'Column {n}',
      'crossRoad.docTitle': 'Cross Road — Free Online Hopper Game',
      'crossRoad.down': 'Down',
      'crossRoad.first': 'No record yet — take your first hop!',
      'crossRoad.hudScore': 'STEPS',
      'crossRoad.left': 'Left',
      'crossRoad.over': 'GAME OVER',
      'crossRoad.overCar': 'A car got you!',
      'crossRoad.overWater': 'You fell in the water!',
      'crossRoad.right': 'Right',
      'crossRoad.share': 'I hopped {n} tiles in Cross Road 🐸 without getting flattened. Beat it: {url}',
      'crossRoad.subtitle': 'HOP · DODGE · RIDE',
      'crossRoad.tip': 'Hop <b>forward</b> one tile at a time. Dodge the cars.<br>On the water, stand on a <b>log</b> — miss it and you sink.<br>Swipe, use the pad below, or press <b>arrows / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': 'Up',
      'fruitSlice.combo': 'COMBO x{n}!',
      'fruitSlice.docTitle': 'Fruit Slice — Free Online Slicing Game',
      'fruitSlice.first': 'No record yet — start slicing!',
      'fruitSlice.hudBest': 'BEST',
      'fruitSlice.hudScore': 'FRUIT',
      'fruitSlice.over': 'GAME OVER',
      'fruitSlice.overBomb': 'You sliced a bomb!',
      'fruitSlice.overMiss': 'You let the fruit fall!',
      'fruitSlice.share': 'I sliced {n} fruit in Fruit Slice 🍉 without touching a bomb. Try to beat me: {url}',
      'fruitSlice.subtitle': 'SWIPE · SLICE · COMBO',
      'fruitSlice.tip': 'Swipe across the fruit to slice it. Miss one and you lose a heart.<br>Slice a <b>bomb</b> and you lose a heart too.<br>Mobile: drag with your finger. Desktop: just move the mouse.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': 'Hop one tile at a time, dodge the traffic and ride the logs across the river.',
      'hub.desc.fruit-slice': 'Swipe through the fruit, chain combos, and keep well clear of the bombs.',
      'hub.desc.piano-tap': 'Smash the lowest black tile before the board rolls past. Touch the white and you are out.',
      'hub.desc.slide-puzzle': 'The classic 15 puzzle. Slide the tiles back into order in as few moves as you can.',
      'pianoTap.docTitle': 'Piano Tap — Free Online Reaction Tapping Game',
      'pianoTap.first': 'No record yet — go set one!',
      'pianoTap.hudBest': 'BEST',
      'pianoTap.hudScore': 'TILES',
      'pianoTap.over': 'GAME OVER',
      'pianoTap.overMiss': 'You missed a tile!',
      'pianoTap.overWrong': 'You hit a white tile!',
      'pianoTap.share': 'I smashed {n} tiles in Piano Tap 🎹 — are your fingers faster? Beat me: {url}',
      'pianoTap.subtitle': 'TAP · FAST · NEVER WHITE',
      'pianoTap.tip': 'Smash the <b>lowest black tile</b> — miss it and the board rolls past you.<br>Touch the white and you are out.<br>Keyboard: <b>D F J K</b> or <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — Free Online 15 Puzzle Game',
      'slidePuzzle.final': 'Solved in <b>{m}</b> moves · {t}',
      'slidePuzzle.first': 'No record yet — solve one!',
      'slidePuzzle.hudBest': 'BEST',
      'slidePuzzle.hudMoves': 'MOVES',
      'slidePuzzle.hudTime': 'TIME',
      'slidePuzzle.mode3': '3 × 3 puzzle',
      'slidePuzzle.mode4': '4 × 4 puzzle',
      'slidePuzzle.mode5': '5 × 5 puzzle',
      'slidePuzzle.over': 'SOLVED!',
      'slidePuzzle.share': 'I solved the {n}×{n} Slide Puzzle 🔢 in {m} moves ({t}). Can you do better? {url}',
      'slidePuzzle.tip': 'Tap a tile next to the gap to slide it — or just swipe.<br>Put <b>1, 2, 3 …</b> back in order. Every scramble can be solved.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'Bubble Shooter — Free Online Bubble Pop Game',
      'bubbleShooter.first': 'No record yet — go pop some bubbles!',
      'bubbleShooter.hudBest': 'BEST',
      'bubbleShooter.hudScore': 'SCORE',
      'bubbleShooter.next': 'NEXT',
      'bubbleShooter.over': 'GAME OVER',
      'bubbleShooter.overFull': 'The bubbles reached the line!',
      'bubbleShooter.share': 'I popped my way to {n} points in Bubble Shooter 🫧 — can you beat it? {url}',
      'bubbleShooter.subtitle': 'AIM · MATCH 3 · POP',
      'bubbleShooter.tip': 'Match <b>3 or more</b> bubbles of the same colour to pop them.<br>Anything left hanging with nothing above it falls too.<br>Mouse: move to aim, click to fire. Touch: drag to aim, release to fire. Keyboard: <b>← →</b> and <b>Space</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'Merge Drop — Free Online Merge the Fruit Game',
      'mergeDrop.first': 'No record yet — start dropping!',
      'mergeDrop.hudBest': 'BEST',
      'mergeDrop.hudScore': 'SCORE',
      'mergeDrop.next': 'NEXT',
      'mergeDrop.over': 'GAME OVER',
      'mergeDrop.overFull': 'The pile crossed the line!',
      'mergeDrop.share': 'I merged my way to {n} points in Merge Drop 🍉 — beat that? {url}',
      'mergeDrop.subtitle': 'DROP · MERGE · GROW',
      'mergeDrop.tip': 'Two fruit of the <b>same size merge</b> into the next one up.<br>Keep the pile below the red line.<br>Mouse: move to aim, click to drop. Touch: drag to aim, release to drop. Keyboard: <b>← →</b> and <b>Space</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': 'Sudoku — Free Online Sudoku Puzzles, 3 Difficulties',
      'sudoku.easy': 'EASY',
      'sudoku.erase': 'ERASE',
      'sudoku.final': '{d} solved in {t2}',
      'sudoku.first': 'No record yet — solve one!',
      'sudoku.hard': 'HARD',
      'sudoku.hudBest': 'BEST',
      'sudoku.hudTime': 'TIME',
      'sudoku.medium': 'MEDIUM',
      'sudoku.over': 'SOLVED!',
      'sudoku.share': 'I cracked a {d} Sudoku in {t2} 🔢 — think you are faster? Beat me: {url}',
      'sudoku.tip': 'Fill every row, column and 3×3 box with <b>1–9</b>.<br>Tap a cell, then tap a number.<br>Keyboard: <b>1–9</b> to fill, <b>arrows</b> to move, <b>0</b> to clear.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'Aim, fire, match three or more to pop. Cut a cluster loose and everything below falls.',
      'hub.desc.merge-drop': 'Drop the fruit, merge the matching pairs, grow all the way to the giant. Keep the pile below the line.',
      'hub.desc.sudoku': 'Fill every row, column and 3×3 box with 1–9. Three difficulties — every puzzle has exactly one solution.',

      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — Free Online Liquid Sorting Puzzle',
      'waterSort.final': 'Level {n} cleared in <b>{m}</b> moves',
      'waterSort.first': 'No record yet — clear a level!',
      'waterSort.hudBest': 'BEST',
      'waterSort.hudLevel': 'LEVEL',
      'waterSort.hudMoves': 'MOVES',
      'waterSort.next': 'NEXT LEVEL',
      'waterSort.over': 'CLEARED!',
      'waterSort.restart': 'RESTART',
      'waterSort.share': 'I cleared level {n} of Water Sort 🧪 in {m} moves. Can you do better? {url}',
      'waterSort.stuck': 'No moves left — undo or restart',
      'waterSort.tip': 'Tap a tube, then tap another to pour.<br>You can only pour onto the <b>same colour</b> or into an empty tube.<br>Every deal is verified solvable.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': 'UNDO',

    },

    /* @@MORE_LANGS@@ */

    zh: {
      /* ---- shared ---- */
      'common.start': '开始',
      'common.playAgain': '再玩一次',
      'common.newGame': '新游戏',
      'common.shareScore': '分享成绩',
      'common.copied': '✅ 已复制！',
      'common.paused': '已暂停',
      'common.newRecord': '🏆 新纪录！',
      'common.toggleSound': '开关声音',
      'common.soundOff': '关闭声音',
      'common.soundOn': '打开声音',
      'common.language': '语言',
      'common.backHome': '返回主页',
      'common.home': '返回主页',
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
      'game.water-sort': '水排序',

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
      'hub.desc.water-sort': '把彩色液体在试管之间倒来倒去，直到每根试管只剩一种颜色。每一局都验证过有解。',

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
      'minesweeper.shareLose': '我被扫雷 💣 干掉了，你觉得自己能清场吗？来玩：{url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': '恐龙快跑',
      'game.stack-tower': '堆塔大师',
      'game.tic-tac-toe': '井字棋',
      'game.memory-match': '记忆翻牌',
      'game.whack-a-mole': '打地鼠',
      'game.connect-four': '四子棋',
      'hub.desc.dino-run': '沙漠无限跑。跳过仙人掌、蹲过飞鸟 —— 速度只会越来越快。',
      'hub.desc.stack-tower': '一次点击放一块。对准每一层，堆出最高的塔。',
      'hub.desc.tic-tac-toe': '跟「无敌」AI 三子连线，也可以拉上朋友双人对战。',
      'hub.desc.memory-match': '翻开两张牌，记住位置，三种难度里找出所有配对。',
      'hub.desc.whack-a-mole': '60 秒纯反应。敲地鼠、抢金鼠、躲炸弹。',
      'hub.desc.connect-four': '落子成四。三种难度挑战电脑。',
      'dinoRun.docTitle': '恐龙快跑 — 免费在线无限跑酷游戏',
      'dinoRun.title': '恐龙快跑',
      'dinoRun.subtitle': '奔跑 · 跳跃 · 闪避',
      'dinoRun.tip': '按 <b>空格</b> / <b>↑</b> 起跳 · 按住 <b>↓</b> 下蹲<br>手机上点 <b>跳跃</b>，按住 <b>下蹲</b>',
      'dinoRun.hudScore': '得分',
      'dinoRun.hudBest': '最高',
      'dinoRun.btnJump': '跳跃',
      'dinoRun.btnDuck': '下蹲',
      'dinoRun.over': '游戏结束',
      'dinoRun.first': '第一次跑 —— 祝你好运！',
      'dinoRun.share': '我在《恐龙快跑》🦖 拿了 {n} 分，你能超过我吗？来玩：{url}',
      'stackTower.docTitle': '堆塔大师 — 免费在线叠塔游戏',
      'stackTower.title': '堆塔大师',
      'stackTower.subtitle': '一层一层，堆到天上',
      'stackTower.tip': '<b>点击</b>或按 <b>空格</b> 放块<br>对准上一块 —— 凸出来的部分会被切掉！',
      'stackTower.hudHeight': '高度',
      'stackTower.hudBest': '最高',
      'stackTower.over': '塔塌了',
      'stackTower.perfect': '完美！',
      'stackTower.first': '第一块 —— 祝你好运！',
      'stackTower.share': '我在《堆塔大师》🏗️ 堆了 {n} 层，你能堆更高吗？来玩：{url}',
      'ticTacToe.docTitle': '井字棋 — 免费在线人机对战',
      'ticTacToe.title': '井字棋',
      'ticTacToe.subtitle': '三子连线者胜',
      'ticTacToe.modeEasy': '简单',
      'ticTacToe.modeHard': '无敌',
      'ticTacToe.mode2p': '双人对战',
      'ticTacToe.thinking': '电脑思考中…',
      'ticTacToe.turn': '轮到 {p}',
      'ticTacToe.you': '你',
      'ticTacToe.ai': '电脑',
      'ticTacToe.p1': '玩家 1',
      'ticTacToe.p2': '玩家 2',
      'ticTacToe.draws': '平局',
      'ticTacToe.winYou': '你赢了！🎉',
      'ticTacToe.winAI': '电脑获胜',
      'ticTacToe.winP1': '玩家 1 获胜！',
      'ticTacToe.winP2': '玩家 2 获胜！',
      'ticTacToe.drawMsg': '平局！',
      'ticTacToe.newRound': '再来一局',
      'ticTacToe.tip': '横、竖或斜着连成三个就赢。',
      'memoryMatch.docTitle': '记忆翻牌 — 免费在线记忆配对游戏',
      'memoryMatch.title': '记忆翻牌',
      'memoryMatch.subtitle': '找出全部配对',
      'memoryMatch.modeEasy': '简单',
      'memoryMatch.modeMedium': '中等',
      'memoryMatch.modeHard': '困难',
      'memoryMatch.hudPairs': '剩余对数',
      'memoryMatch.hudMoves': '步数',
      'memoryMatch.hudTime': '用时',
      'memoryMatch.bestLine': '🏅 最佳：{moves} 步 · {time}',
      'memoryMatch.first': '还没有记录 —— 来定个标准！',
      'memoryMatch.cardAria': '第 {n} 张卡',
      'memoryMatch.winTitle': '全部配对成功！',
      'memoryMatch.result': '{moves} 步 · {time}',
      'memoryMatch.share': '我用 {moves} 步（{time}）通关了《记忆翻牌》🃏 你能超过我吗？来玩：{url}',
      'whackAMole.docTitle': '打地鼠 — 免费在线街机游戏',
      'whackAMole.title': '打地鼠',
      'whackAMole.subtitle': '60 秒拼反应',
      'whackAMole.hudTime': '时间',
      'whackAMole.hudScore': '得分',
      'whackAMole.hudBest': '最高',
      'whackAMole.tip': '敲地鼠 🐹（+1）、抢金鼠 ⭐（+3）—— 千万别碰炸弹 💣（−2）',
      'whackAMole.startTip': '你有 <b>60 秒</b>。<br>地鼠 🐹 值 1 分 · 金鼠 ⭐ 值 3 分 · 炸弹 💣 扣 2 分。',
      'whackAMole.first': '第一次玩 —— 祝你好运！',
      'whackAMole.over': '时间到！',
      'whackAMole.hits': '命中 {hits} 次 · 炸弹 {bombs} 次',
      'whackAMole.share': '我在《打地鼠》🔨 拿了 {n} 分（命中 {hits} 次），你能超过我吗？来玩：{url}',
      'connectFour.docTitle': '四子棋 — 免费在线人机对战',
      'connectFour.title': '四子棋',
      'connectFour.subtitle': '四子连线者胜',
      'connectFour.modeEasy': '简单',
      'connectFour.modeMedium': '中等',
      'connectFour.modeHard': '困难',
      'connectFour.you': '你',
      'connectFour.ai': '电脑',
      'connectFour.draws': '平局',
      'connectFour.thinking': '电脑思考中…',
      'connectFour.turn': '轮到 {p}',
      'connectFour.winYou': '你赢了！🎉',
      'connectFour.winAI': '电脑获胜',
      'connectFour.drawMsg': '平局！',
      'connectFour.newRound': '再来一局',
      'connectFour.tip': '点一列放下你的棋子 —— 你是红色。',
      'connectFour.colAria': '第 {n} 列',
      'crossRoad.docTitle': '过马路 — 免费在线跳跃躲避小游戏',
      'crossRoad.down': '下',
      'crossRoad.first': '还没有记录 —— 跳出你的第一步吧！',
      'crossRoad.hudScore': '步数',
      'crossRoad.left': '左',
      'crossRoad.over': '游戏结束',
      'crossRoad.overCar': '被车撞到了！',
      'crossRoad.overWater': '掉进水里了！',
      'crossRoad.right': '右',
      'crossRoad.share': '我在《过马路》🐸 安全跳过了 {n} 格，你能比我更远吗？{url}',
      'crossRoad.subtitle': '跳跃 · 躲车 · 乘木',
      'crossRoad.tip': '一格一格往<b>前</b>跳，躲开车流。<br>到了水面上要踩住<b>浮木</b> —— 没踩到就沉下去。<br>滑动、用下方方向键，或按<b>方向键 / WASD</b>。',
      'crossRoad.title': '过马路',
      'crossRoad.up': '上',
      'fruitSlice.combo': '连击 x{n}！',
      'fruitSlice.docTitle': '切水果 — 免费在线滑动切割小游戏',
      'fruitSlice.first': '还没有记录 —— 开始切吧！',
      'fruitSlice.hudBest': '最佳',
      'fruitSlice.hudScore': '水果',
      'fruitSlice.over': '游戏结束',
      'fruitSlice.overBomb': '你切到炸弹了！',
      'fruitSlice.overMiss': '水果掉下去了！',
      'fruitSlice.share': '我在《切水果》🍉 切了 {n} 个水果，一个炸弹都没碰到。来比比：{url}',
      'fruitSlice.subtitle': '滑动 · 切开 · 连击',
      'fruitSlice.tip': '滑动划过水果就能切开。漏掉一个扣一颗心。<br>切到<b>炸弹</b>也要扣一颗心。<br>手机：手指拖动。电脑：直接移动鼠标。',
      'fruitSlice.title': '切水果',
      'game.cross-road': '过马路',
      'game.fruit-slice': '切水果',
      'game.piano-tap': '别踩白块',
      'game.slide-puzzle': '数字滑盘',
      'hub.desc.cross-road': '一格一格往前跳，躲开车流，踩着浮木过河。',
      'hub.desc.fruit-slice': '滑动切开水果，攒连击，千万别碰炸弹。',
      'hub.desc.piano-tap': '点掉最下面的黑块，手慢它滚走了就输。碰到白块直接出局。',
      'hub.desc.slide-puzzle': '经典 15 数字滑盘。用尽可能少的步数把数字排回顺序。',
      'pianoTap.docTitle': '别踩白块 — 免费在线手速反应小游戏',
      'pianoTap.first': '还没有记录 —— 去创造第一个吧！',
      'pianoTap.hudBest': '最佳',
      'pianoTap.hudScore': '块数',
      'pianoTap.over': '游戏结束',
      'pianoTap.overMiss': '漏掉一块！',
      'pianoTap.overWrong': '你点到白块了！',
      'pianoTap.share': '我在《别踩白块》🎹 点掉了 {n} 块，你的手速跟得上吗？来挑战：{url}',
      'pianoTap.subtitle': '快点 · 稳准 · 别碰白',
      'pianoTap.tip': '点掉<b>最下面的黑块</b> —— 漏掉它滚出屏幕就结束。<br>碰到白块直接出局。<br>键盘：<b>D F J K</b> 或 <b>1 2 3 4</b>',
      'pianoTap.title': '别踩白块',
      'slidePuzzle.docTitle': '数字滑盘 — 免费在线 15 数字拼图',
      'slidePuzzle.final': '用了 <b>{m}</b> 步 · {t}',
      'slidePuzzle.first': '还没有记录 —— 先拼一局吧！',
      'slidePuzzle.hudBest': '最佳',
      'slidePuzzle.hudMoves': '步数',
      'slidePuzzle.hudTime': '用时',
      'slidePuzzle.mode3': '3 × 3 拼图',
      'slidePuzzle.mode4': '4 × 4 拼图',
      'slidePuzzle.mode5': '5 × 5 拼图',
      'slidePuzzle.over': '拼好啦！',
      'slidePuzzle.share': '我用 {m} 步（{t}）拼好了 {n}×{n} 数字滑盘 🔢，你能更快吗？{url}',
      'slidePuzzle.tip': '点空格旁边的数字块让它滑过去，也可以直接滑动。<br>把 <b>1、2、3 …</b> 排回顺序。每一局都保证有解。',
      'slidePuzzle.title': '数字滑盘',
      'bubbleShooter.docTitle': '泡泡龙 — 免费在线消泡泡游戏',
      'bubbleShooter.first': '还没有记录 —— 去消泡泡吧！',
      'bubbleShooter.hudBest': '最佳',
      'bubbleShooter.hudScore': '得分',
      'bubbleShooter.next': '下一颗',
      'bubbleShooter.over': '游戏结束',
      'bubbleShooter.overFull': '泡泡触到死亡线了！',
      'bubbleShooter.share': '我在《泡泡龙》🫧 拿到了 {n} 分，你能超过我吗？{url}',
      'bubbleShooter.subtitle': '瞄准 · 三连 · 消除',
      'bubbleShooter.tip': '把 <b>3 颗以上</b>同色泡泡连在一起就能消掉。<br>失去支撑的泡泡会跟着一起掉落。<br>鼠标：移动瞄准，点击发射。手机：拖动瞄准，松手发射。键盘：<b>← →</b> 与 <b>空格</b>。',
      'bubbleShooter.title': '泡泡龙',
      'mergeDrop.docTitle': '合成大西瓜 — 免费在线水果合并游戏',
      'mergeDrop.first': '还没有记录 —— 开始落果吧！',
      'mergeDrop.hudBest': '最佳',
      'mergeDrop.hudScore': '得分',
      'mergeDrop.next': '下一颗',
      'mergeDrop.over': '游戏结束',
      'mergeDrop.overFull': '水果堆超过红线了！',
      'mergeDrop.share': '我在《合成大西瓜》🍉 合到了 {n} 分，来挑战我吧：{url}',
      'mergeDrop.subtitle': '落果 · 同类 · 合并',
      'mergeDrop.tip': '<b>两颗同样大小</b>的水果碰在一起会合成更大的。<br>别让水果堆超过红线。<br>鼠标：移动瞄准，点击落下。手机：拖动瞄准，松手落下。键盘：<b>← →</b> 与 <b>空格</b>。',
      'mergeDrop.title': '合成大西瓜',
      'sudoku.docTitle': '数独 — 免费在线数独，三种难度',
      'sudoku.easy': '简单',
      /* ---- water-sort ---- */
      'waterSort.docTitle': '水排序 — 免费在线液体分类解谜',
      'waterSort.final': '第 {n} 关，用了 <b>{m}</b> 步',
      'waterSort.first': '还没有记录 —— 先过一关吧！',
      'waterSort.hudBest': '最佳',
      'waterSort.hudLevel': '关卡',
      'waterSort.hudMoves': '步数',
      'waterSort.next': '下一关',
      'waterSort.over': '过关啦！',
      'waterSort.restart': '重来',
      'waterSort.share': '我用 {m} 步通关了水排序第 {n} 关 🧪，你能更快吗？{url}',
      'waterSort.stuck': '没有可行的倒法了 —— 撤销或重来',
      'waterSort.tip': '点一根试管，再点另一根就能倒过去。<br>只能倒在<b>同色</b>液体上，或倒进空试管。<br>每一局都验证过有解。',
      'waterSort.title': '水排序',
      'waterSort.undo': '撤销',

      'sudoku.erase': '擦除',
      'sudoku.final': '{d}难度用时 {t2}',
      'sudoku.first': '还没有记录 —— 去解一局吧！',
      'sudoku.hard': '困难',
      'sudoku.hudBest': '最佳',
      'sudoku.hudTime': '用时',
      'sudoku.medium': '中等',
      'sudoku.over': '完成！',
      'sudoku.share': '我在《数独》里用 {t2} 解开了{d}难度 🔢 你比我快吗？来挑战：{url}',
      'sudoku.tip': '把 <b>1–9</b> 填进每一行、每一列和每个 3×3 宫。<br>先点格子，再点数字。<br>键盘：<b>1–9</b> 填数，<b>方向键</b>移动，<b>0</b> 清除。',
      'sudoku.title': '数独',
      'game.bubble-shooter': '泡泡龙',
      'game.merge-drop': '合成大西瓜',
      'game.sudoku': '数独',
      'hub.desc.bubble-shooter': '瞄准发射，三颗以上同色即消;打断支撑，整串一起掉落。',
      'hub.desc.merge-drop': '落下水果，同级相合成更大的，一路合到大西瓜;别让果堆越过红线。',
      'hub.desc.sudoku': '把 1–9 填进每行每列每宫。三种难度，每道题都只有一个解。',

    },

    es: {
      /* ---- shared ---- */
      'common.start': 'EMPEZAR',
      'common.playAgain': 'JUGAR OTRA VEZ',
      'common.newGame': 'NUEVA PARTIDA',
      'common.shareScore': 'COMPARTIR PUNTOS',
      'common.copied': '✅ ¡Copiado!',
      'common.paused': 'EN PAUSA',
      'common.newRecord': '🏆 ¡NUEVO RÉCORD!',
      'common.toggleSound': 'Activar o desactivar el sonido',
      'common.soundOff': 'Silenciar',
      'common.soundOn': 'Activar el sonido',
      'common.language': 'Idioma',
      'common.backHome': 'Volver al inicio',
      'common.home': 'Inicio',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': 'Vierte los líquidos de color entre tubos hasta que cada tubo tenga un solo color. Cada partida está verificada como resoluble.',

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
      'minesweeper.shareLose': 'El Minesweeper me ha ganado 💥 ¿Crees que puedes despejarlo? Juega aquí: {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': 'Carrera infinita por el desierto. Salta los cactus, esquiva los pájaros — y cada vez va más rápido.',
      'hub.desc.stack-tower': 'Un toque, un bloque. Alinea cada capa y construye la torre más alta.',
      'hub.desc.tic-tac-toe': 'Tres en raya contra una IA imbatible — o juega con un amigo a dos jugadores.',
      'hub.desc.memory-match': 'Voltea dos cartas, recuerda dónde estaban y encuentra todas las parejas en tres dificultades.',
      'hub.desc.whack-a-mole': '60 segundos de puro reflejo. Golpea topos, atrapa el dorado y esquiva las bombas.',
      'hub.desc.connect-four': 'Suelta una ficha, alinea cuatro. Gana a la máquina en tres dificultades.',
      'dinoRun.docTitle': 'Dino Run — Juego de carrera infinita gratis',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': 'CORRE · SALTA · ESQUIVA',
      'dinoRun.tip': 'Pulsa <b>ESPACIO</b> / <b>↑</b> para saltar · mantén <b>↓</b> para agacharte<br>En el móvil toca <b>SALTAR</b> o mantén <b>AGACHARSE</b>',
      'dinoRun.hudScore': 'PUNTOS',
      'dinoRun.hudBest': 'RÉCORD',
      'dinoRun.btnJump': 'SALTAR',
      'dinoRun.btnDuck': 'AGACHARSE',
      'dinoRun.over': 'FIN DEL JUEGO',
      'dinoRun.first': 'Tu primera carrera — ¡suerte!',
      'dinoRun.share': 'He hecho {n} puntos en Dino Run 🦖 ¿Puedes superarme? Juega aquí: {url}',
      'stackTower.docTitle': 'Stack Tower — Juego de apilar gratis',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': 'CONSTRÚYELA HASTA EL CIELO',
      'stackTower.tip': '<b>Toca</b> o pulsa <b>ESPACIO</b> para soltar el bloque<br>¡Alinealo bien — lo que sobresale se corta!',
      'stackTower.hudHeight': 'ALTURA',
      'stackTower.hudBest': 'RÉCORD',
      'stackTower.over': 'LA TORRE CAYÓ',
      'stackTower.perfect': '¡PERFECTO!',
      'stackTower.first': 'Primer bloque — ¡suerte!',
      'stackTower.share': 'He apilado {n} bloques en Stack Tower 🏗️ ¿Puedes construir más alto? Juega aquí: {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — Juego online contra la máquina',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': 'TRES EN RAYA GANA',
      'ticTacToe.modeEasy': 'FÁCIL',
      'ticTacToe.modeHard': 'IMPOSIBLE',
      'ticTacToe.mode2p': '2 JUGADORES',
      'ticTacToe.thinking': 'LA MÁQUINA ESTÁ PENSANDO…',
      'ticTacToe.turn': 'MUEVE {p}',
      'ticTacToe.you': 'TÚ',
      'ticTacToe.ai': 'MÁQUINA',
      'ticTacToe.p1': 'JUGADOR 1',
      'ticTacToe.p2': 'JUGADOR 2',
      'ticTacToe.draws': 'EMPATES',
      'ticTacToe.winYou': '¡GANAS TÚ! 🎉',
      'ticTacToe.winAI': 'GANA LA MÁQUINA',
      'ticTacToe.winP1': '¡GANA EL JUGADOR 1!',
      'ticTacToe.winP2': '¡GANA EL JUGADOR 2!',
      'ticTacToe.drawMsg': '¡EMPATE!',
      'ticTacToe.newRound': 'NUEVA PARTIDA',
      'ticTacToe.tip': 'Consigue tres en raya: en horizontal, vertical o diagonal.',
      'memoryMatch.docTitle': 'Memory Match — Juego de memoria gratis',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'ENCUENTRA TODAS LAS PAREJAS',
      'memoryMatch.modeEasy': 'FÁCIL',
      'memoryMatch.modeMedium': 'MEDIO',
      'memoryMatch.modeHard': 'DIFÍCIL',
      'memoryMatch.hudPairs': 'PAREJAS',
      'memoryMatch.hudMoves': 'MOVIMIENTOS',
      'memoryMatch.hudTime': 'TIEMPO',
      'memoryMatch.bestLine': '🏅 Récord: {moves} movimientos · {time}',
      'memoryMatch.first': 'Aún no hay récord — ¡marca el ritmo!',
      'memoryMatch.cardAria': 'Carta {n}',
      'memoryMatch.winTitle': '¡TODAS LAS PAREJAS ENCONTRADAS!',
      'memoryMatch.result': '{moves} movimientos · {time}',
      'memoryMatch.share': 'He completado Memory Match 🃏 en {moves} movimientos ({time}). ¿Puedes superarme? Juega aquí: {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — Juego arcade gratis',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60 SEGUNDOS DE REFLEJOS',
      'whackAMole.hudTime': 'TIEMPO',
      'whackAMole.hudScore': 'PUNTOS',
      'whackAMole.hudBest': 'RÉCORD',
      'whackAMole.tip': 'Golpea a los topos 🐹 (+1) y al dorado ⭐ (+3) — nunca toques una bomba 💣 (−2)',
      'whackAMole.startTip': 'Tienes <b>60 segundos</b>.<br>Topos 🐹 valen 1 · dorado ⭐ vale 3 · bombas 💣 quitan 2.',
      'whackAMole.first': 'Primera partida — ¡suerte!',
      'whackAMole.over': '¡SE ACABÓ EL TIEMPO!',
      'whackAMole.hits': '{hits} aciertos · {bombs} bombas',
      'whackAMole.share': 'He hecho {n} puntos en Whack-a-Mole 🔨 ({hits} aciertos). ¿Puedes superarme? Juega aquí: {url}',
      'connectFour.docTitle': 'Connect Four — Juego online contra la máquina',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': 'CUATRO EN LÍNEA GANA',
      'connectFour.modeEasy': 'FÁCIL',
      'connectFour.modeMedium': 'MEDIO',
      'connectFour.modeHard': 'DIFÍCIL',
      'connectFour.you': 'TÚ',
      'connectFour.ai': 'MÁQUINA',
      'connectFour.draws': 'EMPATES',
      'connectFour.thinking': 'LA MÁQUINA ESTÁ PENSANDO…',
      'connectFour.turn': 'MUEVE {p}',
      'connectFour.winYou': '¡GANAS TÚ! 🎉',
      'connectFour.winAI': 'GANA LA MÁQUINA',
      'connectFour.drawMsg': '¡EMPATE!',
      'connectFour.newRound': 'NUEVA PARTIDA',
      'connectFour.tip': 'Toca una columna para soltar tu ficha — tú eres el rojo.',
      'connectFour.colAria': 'Columna {n}',
      'crossRoad.docTitle': 'Cross Road — Juego de saltos gratis online',
      'crossRoad.down': 'Abajo',
      'crossRoad.first': 'Aún no hay récord: ¡da tu primer salto!',
      'crossRoad.hudScore': 'PASOS',
      'crossRoad.left': 'Izquierda',
      'crossRoad.over': 'FIN DEL JUEGO',
      'crossRoad.overCar': '¡Te atropelló un coche!',
      'crossRoad.overWater': '¡Te caíste al agua!',
      'crossRoad.right': 'Derecha',
      'crossRoad.share': 'Avancé {n} casillas en Cross Road 🐸 sin que me aplastaran. Supérame: {url}',
      'crossRoad.subtitle': 'SALTA · ESQUIVA · EMBARCA',
      'crossRoad.tip': 'Salta <b>hacia delante</b> casilla a casilla. Esquiva los coches.<br>En el agua, párate sobre un <b>tronco</b>: si fallas, te hundes.<br>Desliza, usa el panel de abajo o pulsa <b>flechas / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': 'Arriba',
      'fruitSlice.combo': '¡COMBO x{n}!',
      'fruitSlice.docTitle': 'Fruit Slice — Juego de cortar gratis online',
      'fruitSlice.first': 'Aún no hay récord: ¡empieza a cortar!',
      'fruitSlice.hudBest': 'RÉCORD',
      'fruitSlice.hudScore': 'FRUTA',
      'fruitSlice.over': 'FIN DEL JUEGO',
      'fruitSlice.overBomb': '¡Cortaste una bomba!',
      'fruitSlice.overMiss': '¡Dejaste caer la fruta!',
      'fruitSlice.share': 'Corté {n} frutas en Fruit Slice 🍉 sin tocar una bomba. Intenta superarme: {url}',
      'fruitSlice.subtitle': 'DESLIZA · CORTA · COMBO',
      'fruitSlice.tip': 'Desliza sobre la fruta para cortarla. Si dejas caer una, pierdes un corazón.<br>Si cortas una <b>bomba</b>, también pierdes un corazón.<br>Móvil: arrastra con el dedo. Escritorio: solo mueve el ratón.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': 'Salta casilla a casilla, esquiva el tráfico y cruza el río sobre los troncos.',
      'hub.desc.fruit-slice': 'Corta la fruta de un desliz, encadena combos y no toques las bombas.',
      'hub.desc.piano-tap': 'Golpea la ficha negra más baja antes de que se escape. Toca una blanca y quedas fuera.',
      'hub.desc.slide-puzzle': 'El clásico puzzle de 15. Ordena las fichas con el menor número de movimientos.',
      'pianoTap.docTitle': 'Piano Tap — Juego de reflejos gratis online',
      'pianoTap.first': 'Aún no hay récord: ¡consigue uno!',
      'pianoTap.hudBest': 'RÉCORD',
      'pianoTap.hudScore': 'FICHAS',
      'pianoTap.over': 'FIN DEL JUEGO',
      'pianoTap.overMiss': '¡Dejaste escapar una ficha!',
      'pianoTap.overWrong': '¡Tocaste una ficha blanca!',
      'pianoTap.share': 'Rompí {n} fichas en Piano Tap 🎹. ¿Tus dedos son más rápidos? Supérame: {url}',
      'pianoTap.subtitle': 'TOCA · RÁPIDO · NUNCA BLANCO',
      'pianoTap.tip': 'Golpea la <b>ficha negra más baja</b>: si la dejas escapar, el tablero pasa de largo.<br>Toca una blanca y quedas fuera.<br>Teclado: <b>D F J K</b> o <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — Puzzle de 15 gratis online',
      'slidePuzzle.final': 'Resuelto en <b>{m}</b> jugadas · {t}',
      'slidePuzzle.first': 'Aún no hay récord: ¡resuelve uno!',
      'slidePuzzle.hudBest': 'RÉCORD',
      'slidePuzzle.hudMoves': 'JUGADAS',
      'slidePuzzle.hudTime': 'TIEMPO',
      'slidePuzzle.mode3': 'Puzzle 3 × 3',
      'slidePuzzle.mode4': 'Puzzle 4 × 4',
      'slidePuzzle.mode5': 'Puzzle 5 × 5',
      'slidePuzzle.over': '¡RESUELTO!',
      'slidePuzzle.share': 'Resolví el Slide Puzzle {n}×{n} 🔢 en {m} jugadas ({t}). ¿Puedes hacerlo mejor? {url}',
      'slidePuzzle.tip': 'Toca una ficha junto al hueco para deslizarla, o desliza el dedo.<br>Ordena <b>1, 2, 3 …</b> de nuevo. Cada partida tiene solución.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'Bubble Shooter — Juego de burbujas gratis online',
      'bubbleShooter.first': 'Aún no hay récord: ¡revienta burbujas!',
      'bubbleShooter.hudBest': 'RÉCORD',
      'bubbleShooter.hudScore': 'PUNTOS',
      'bubbleShooter.next': 'SIGUIENTE',
      'bubbleShooter.over': 'FIN DEL JUEGO',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — Puzle de clasificación de líquidos gratis online',
      'waterSort.final': 'Nivel {n} superado en <b>{m}</b> jugadas',
      'waterSort.first': 'Aún no hay récord: ¡supera un nivel!',
      'waterSort.hudBest': 'RÉCORD',
      'waterSort.hudLevel': 'NIVEL',
      'waterSort.hudMoves': 'JUGADAS',
      'waterSort.next': 'SIGUIENTE NIVEL',
      'waterSort.over': '¡COMPLETADO!',
      'waterSort.restart': 'REINICIAR',
      'waterSort.share': 'Superé el nivel {n} de Water Sort 🧪 en {m} jugadas. ¿Puedes hacerlo mejor? {url}',
      'waterSort.stuck': 'No quedan jugadas: deshaz o reinicia',
      'waterSort.tip': 'Toca un tubo y luego otro para verter.<br>Solo puedes verter sobre el <b>mismo color</b> o en un tubo vacío.<br>Cada partida está verificada como resoluble.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': 'DESHACER',

      'bubbleShooter.overFull': '¡Las burbujas llegaron a la línea!',
      'bubbleShooter.share': 'Llegué a {n} puntos en Bubble Shooter 🫧 ¿Puedes superarlo? {url}',
      'bubbleShooter.subtitle': 'APUNTA · JUNTA 3 · REVIENTA',
      'bubbleShooter.tip': 'Junta <b>3 o más</b> burbujas del mismo color para reventarlas.<br>Lo que quede colgando sin nada encima también cae.<br>Ratón: mueve para apuntar, clic para disparar. Táctil: arrastra para apuntar, suelta para disparar. Teclado: <b>← →</b> y <b>Espacio</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'Merge Drop — Juego de fusionar frutas gratis online',
      'mergeDrop.first': 'Aún no hay récord: ¡empieza a soltar!',
      'mergeDrop.hudBest': 'RÉCORD',
      'mergeDrop.hudScore': 'PUNTOS',
      'mergeDrop.next': 'SIGUIENTE',
      'mergeDrop.over': 'FIN DEL JUEGO',
      'mergeDrop.overFull': '¡La pila pasó la línea!',
      'mergeDrop.share': 'Llegué a {n} puntos en Merge Drop 🍉 ¿Me superas? {url}',
      'mergeDrop.subtitle': 'SUELTA · FUSIONA · CRECE',
      'mergeDrop.tip': 'Dos frutas del <b>mismo tamaño se fusionan</b> en la siguiente.<br>Mantén la pila por debajo de la línea roja.<br>Ratón: mueve para apuntar, clic para soltar. Táctil: arrastra para apuntar, suelta para soltar. Teclado: <b>← →</b> y <b>Espacio</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': 'Sudoku — Sudokus gratis online, 3 dificultades',
      'sudoku.easy': 'FÁCIL',
      'sudoku.erase': 'BORRAR',
      'sudoku.final': '{d} resuelto en {t2}',
      'sudoku.first': 'Aún no hay récord: ¡resuelve uno!',
      'sudoku.hard': 'DIFÍCIL',
      'sudoku.hudBest': 'RÉCORD',
      'sudoku.hudTime': 'TIEMPO',
      'sudoku.medium': 'MEDIO',
      'sudoku.over': '¡RESUELTO!',
      'sudoku.share': 'Resolví un Sudoku {d} en {t2} 🔢 ¿Crees que eres más rápido? Supérame: {url}',
      'sudoku.tip': 'Completa cada fila, columna y caja 3×3 con <b>1–9</b>.<br>Toca una casilla y luego un número.<br>Teclado: <b>1–9</b> para rellenar, <b>flechas</b> para moverte, <b>0</b> para borrar.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'Apunta, dispara y junta tres o más para reventarlas. Si cortas un racimo, todo lo que cuelga cae.',
      'hub.desc.merge-drop': 'Suelta fruta, fusiona las parejas y crece hasta la gigante. No dejes que la pila pase la línea.',
      'hub.desc.sudoku': 'Completa cada fila, columna y caja 3×3 con 1–9. Tres dificultades: cada puzzle tiene una única solución.',

    },

    pt: {
      /* ---- shared ---- */
      'common.start': 'COMEÇAR',
      'common.playAgain': 'JOGAR DE NOVO',
      'common.newGame': 'NOVO JOGO',
      'common.shareScore': 'COMPARTILHAR PONTOS',
      'common.copied': '✅ Copiado!',
      'common.paused': 'PAUSADO',
      'common.newRecord': '🏆 NOVO RECORDE!',
      'common.toggleSound': 'Ligar ou desligar o som',
      'common.soundOff': 'Silenciar',
      'common.soundOn': 'Ativar o som',
      'common.language': 'Idioma',
      'common.backHome': 'Voltar ao início',
      'common.home': 'Início',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': 'Verta os líquidos coloridos entre tubos até que cada tubo tenha uma só cor. Toda partida é verificada como resolvível.',

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
      'minesweeper.shareLose': 'O Minesweeper me pegou 💥 Acha que consegue limpar? Jogue aqui: {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': 'Corrida infinita no deserto. Pule os cactos, desvie dos pássaros — e a velocidade só aumenta.',
      'hub.desc.stack-tower': 'Um toque, um bloco. Alinhe cada camada e construa a torre mais alta.',
      'hub.desc.tic-tac-toe': 'Três em linha contra uma IA imbatível — ou chame um amigo para o modo 2 jogadores.',
      'hub.desc.memory-match': 'Vire duas cartas, memorize e encontre todos os pares em três dificuldades.',
      'hub.desc.whack-a-mole': '60 segundos de puro reflexo. Bata nas toupeiras, pegue a dourada e fuja das bombas.',
      'hub.desc.connect-four': 'Solte uma peça, alinhe quatro. Vença o computador em três dificuldades.',
      'dinoRun.docTitle': 'Dino Run — Jogo de corrida infinita grátis',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': 'CORRA · PULE · DESVIE',
      'dinoRun.tip': 'Pressione <b>ESPAÇO</b> / <b>↑</b> para pular · segure <b>↓</b> para abaixar<br>No celular toque em <b>PULAR</b> ou segure <b>ABAIXAR</b>',
      'dinoRun.hudScore': 'PONTOS',
      'dinoRun.hudBest': 'RECORDE',
      'dinoRun.btnJump': 'PULAR',
      'dinoRun.btnDuck': 'ABAIXAR',
      'dinoRun.over': 'FIM DE JOGO',
      'dinoRun.first': 'Primeira corrida — boa sorte!',
      'dinoRun.share': 'Fiz {n} pontos no Dino Run 🦖 Consegue me superar? Jogue aqui: {url}',
      'stackTower.docTitle': 'Stack Tower — Jogo de empilhar grátis',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': 'CONSTRUA ATÉ O CÉU',
      'stackTower.tip': '<b>Toque</b> ou pressione <b>ESPAÇO</b> para soltar o bloco<br>Alinhe bem — o que sobra é cortado!',
      'stackTower.hudHeight': 'ALTURA',
      'stackTower.hudBest': 'RECORDE',
      'stackTower.over': 'A TORRE CAIU',
      'stackTower.perfect': 'PERFEITO!',
      'stackTower.first': 'Primeiro bloco — boa sorte!',
      'stackTower.share': 'Empilhei {n} blocos no Stack Tower 🏗️ Consegue construir mais alto? Jogue aqui: {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — Jogo online contra o computador',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': 'TRÊS EM LINHA VENCE',
      'ticTacToe.modeEasy': 'FÁCIL',
      'ticTacToe.modeHard': 'IMPOSSÍVEL',
      'ticTacToe.mode2p': '2 JOGADORES',
      'ticTacToe.thinking': 'O COMPUTADOR ESTÁ PENSANDO…',
      'ticTacToe.turn': 'VEZ DE {p}',
      'ticTacToe.you': 'VOCÊ',
      'ticTacToe.ai': 'COMPUTADOR',
      'ticTacToe.p1': 'JOGADOR 1',
      'ticTacToe.p2': 'JOGADOR 2',
      'ticTacToe.draws': 'EMPATES',
      'ticTacToe.winYou': 'VOCÊ VENCEU! 🎉',
      'ticTacToe.winAI': 'O COMPUTADOR VENCEU',
      'ticTacToe.winP1': 'JOGADOR 1 VENCEU!',
      'ticTacToe.winP2': 'JOGADOR 2 VENCEU!',
      'ticTacToe.drawMsg': 'DEU VELHA!',
      'ticTacToe.newRound': 'NOVA RODADA',
      'ticTacToe.tip': 'Faça três em linha — na horizontal, vertical ou diagonal.',
      'memoryMatch.docTitle': 'Memory Match — Jogo da memória grátis',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'ENCONTRE TODOS OS PARES',
      'memoryMatch.modeEasy': 'FÁCIL',
      'memoryMatch.modeMedium': 'MÉDIO',
      'memoryMatch.modeHard': 'DIFÍCIL',
      'memoryMatch.hudPairs': 'PARES',
      'memoryMatch.hudMoves': 'JOGADAS',
      'memoryMatch.hudTime': 'TEMPO',
      'memoryMatch.bestLine': '🏅 Recorde: {moves} jogadas · {time}',
      'memoryMatch.first': 'Ainda sem recorde — dite o ritmo!',
      'memoryMatch.cardAria': 'Carta {n}',
      'memoryMatch.winTitle': 'TODOS OS PARES ENCONTRADOS!',
      'memoryMatch.result': '{moves} jogadas · {time}',
      'memoryMatch.share': 'Completei o Memory Match 🃏 em {moves} jogadas ({time}). Consegue me superar? Jogue aqui: {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — Jogo de arcade grátis',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60 SEGUNDOS DE REFLEXO',
      'whackAMole.hudTime': 'TEMPO',
      'whackAMole.hudScore': 'PONTOS',
      'whackAMole.hudBest': 'RECORDE',
      'whackAMole.tip': 'Bata nas toupeiras 🐹 (+1) e na dourada ⭐ (+3) — nunca acerte uma bomba 💣 (−2)',
      'whackAMole.startTip': 'Você tem <b>60 segundos</b>.<br>Toupeiras 🐹 valem 1 · dourada ⭐ vale 3 · bombas 💣 custam 2.',
      'whackAMole.first': 'Primeira partida — boa sorte!',
      'whackAMole.over': 'TEMPO ESGOTADO!',
      'whackAMole.hits': '{hits} acertos · {bombs} bombas',
      'whackAMole.share': 'Fiz {n} pontos no Whack-a-Mole 🔨 ({hits} acertos). Consegue me superar? Jogue aqui: {url}',
      'connectFour.docTitle': 'Connect Four — Jogo online contra o computador',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': 'QUATRO EM LINHA VENCE',
      'connectFour.modeEasy': 'FÁCIL',
      'connectFour.modeMedium': 'MÉDIO',
      'connectFour.modeHard': 'DIFÍCIL',
      'connectFour.you': 'VOCÊ',
      'connectFour.ai': 'COMPUTADOR',
      'connectFour.draws': 'EMPATES',
      'connectFour.thinking': 'O COMPUTADOR ESTÁ PENSANDO…',
      'connectFour.turn': 'VEZ DE {p}',
      'connectFour.winYou': 'VOCÊ VENCEU! 🎉',
      'connectFour.winAI': 'O COMPUTADOR VENCEU',
      'connectFour.drawMsg': 'DEU VELHA!',
      'connectFour.newRound': 'NOVA RODADA',
      'connectFour.tip': 'Toque numa coluna para soltar sua peça — você é o vermelho.',
      'connectFour.colAria': 'Coluna {n}',
      'crossRoad.docTitle': 'Cross Road — Jogo de pulos grátis online',
      'crossRoad.down': 'Baixo',
      'crossRoad.first': 'Ainda sem recorde — dê o primeiro pulo!',
      'crossRoad.hudScore': 'PASSOS',
      'crossRoad.left': 'Esquerda',
      'crossRoad.over': 'FIM DE JOGO',
      'crossRoad.overCar': 'Um carro te pegou!',
      'crossRoad.overWater': 'Você caiu na água!',
      'crossRoad.right': 'Direita',
      'crossRoad.share': 'Avancei {n} casas no Cross Road 🐸 sem ser atropelado. Me supere: {url}',
      'crossRoad.subtitle': 'PULE · DESVIE · EMBARQUE',
      'crossRoad.tip': 'Pule <b>para frente</b> casa por casa. Desvie dos carros.<br>Na água, fique sobre um <b>tronco</b> — se errar, você afunda.<br>Deslize, use o painel abaixo ou aperte <b>setas / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': 'Cima',
      'fruitSlice.combo': 'COMBO x{n}!',
      'fruitSlice.docTitle': 'Fruit Slice — Jogo de cortar grátis online',
      'fruitSlice.first': 'Ainda sem recorde — comece a cortar!',
      'fruitSlice.hudBest': 'RECORDE',
      'fruitSlice.hudScore': 'FRUTAS',
      'fruitSlice.over': 'FIM DE JOGO',
      'fruitSlice.overBomb': 'Você cortou uma bomba!',
      'fruitSlice.overMiss': 'Você deixou a fruta cair!',
      'fruitSlice.share': 'Cortei {n} frutas no Fruit Slice 🍉 sem tocar em nenhuma bomba. Tente me superar: {url}',
      'fruitSlice.subtitle': 'DESLIZE · CORTE · COMBO',
      'fruitSlice.tip': 'Deslize sobre a fruta para cortá-la. Se deixar cair uma, perde um coração.<br>Cortar uma <b>bomba</b> também custa um coração.<br>Celular: arraste com o dedo. PC: só mova o mouse.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': 'Pule casa por casa, desvie do trânsito e atravesse o rio nos troncos.',
      'hub.desc.fruit-slice': 'Corte as frutas com um deslize, encadeie combos e fuja das bombas.',
      'hub.desc.piano-tap': 'Bata no bloco preto mais baixo antes que ele escape. Toque no branco e está fora.',
      'hub.desc.slide-puzzle': 'O clássico quebra-cabeça de 15. Ordene as peças com o menor número de jogadas.',
      'pianoTap.docTitle': 'Piano Tap — Jogo de reflexo grátis online',
      'pianoTap.first': 'Ainda sem recorde — conquiste o primeiro!',
      'pianoTap.hudBest': 'RECORDE',
      'pianoTap.hudScore': 'BLOCOS',
      'pianoTap.over': 'FIM DE JOGO',
      'pianoTap.overMiss': 'Você deixou um bloco passar!',
      'pianoTap.overWrong': 'Você tocou num bloco branco!',
      'pianoTap.share': 'Quebrei {n} blocos no Piano Tap 🎹. Seus dedos são mais rápidos? Me supere: {url}',
      'pianoTap.subtitle': 'TOQUE · RÁPIDO · NUNCA BRANCO',
      'pianoTap.tip': 'Bata no <b>bloco preto mais baixo</b>: se deixar passar, o tabuleiro rola direto.<br>Toque no branco e está fora.<br>Teclado: <b>D F J K</b> ou <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — Quebra-cabeça de 15 grátis online',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — Quebra-cabeça de classificação de líquidos grátis online',
      'waterSort.final': 'Nível {n} concluído em <b>{m}</b> jogadas',
      'waterSort.first': 'Ainda sem recorde — conclua um nível!',
      'waterSort.hudBest': 'RECORDE',
      'waterSort.hudLevel': 'NÍVEL',
      'waterSort.hudMoves': 'JOGADAS',
      'waterSort.next': 'PRÓXIMO NÍVEL',
      'waterSort.over': 'CONCLUÍDO!',
      'waterSort.restart': 'REINICIAR',
      'waterSort.share': 'Concluí o nível {n} do Water Sort 🧪 em {m} jogadas. Consegue melhor? {url}',
      'waterSort.stuck': 'Sem jogadas possíveis — desfaça ou reinicie',
      'waterSort.tip': 'Toque num tubo e depois noutro para verter.<br>Só pode verter sobre a <b>mesma cor</b> ou num tubo vazio.<br>Toda partida é verificada como resolvível.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': 'DESFAZER',

      'slidePuzzle.final': 'Resolvido em <b>{m}</b> jogadas · {t}',
      'slidePuzzle.first': 'Ainda sem recorde — resolva um!',
      'slidePuzzle.hudBest': 'RECORDE',
      'slidePuzzle.hudMoves': 'JOGADAS',
      'slidePuzzle.hudTime': 'TEMPO',
      'slidePuzzle.mode3': 'Quebra-cabeça 3 × 3',
      'slidePuzzle.mode4': 'Quebra-cabeça 4 × 4',
      'slidePuzzle.mode5': 'Quebra-cabeça 5 × 5',
      'slidePuzzle.over': 'RESOLVIDO!',
      'slidePuzzle.share': 'Resolvi o Slide Puzzle {n}×{n} 🔢 em {m} jogadas ({t}). Consegue melhor? {url}',
      'slidePuzzle.tip': 'Toque numa peça ao lado do espaço para deslizá-la, ou deslize o dedo.<br>Coloque <b>1, 2, 3 …</b> em ordem. Toda partida tem solução.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'Bubble Shooter — Jogo de bolhas grátis online',
      'bubbleShooter.first': 'Ainda sem recorde — vá estourar bolhas!',
      'bubbleShooter.hudBest': 'RECORDE',
      'bubbleShooter.hudScore': 'PONTOS',
      'bubbleShooter.next': 'PRÓXIMA',
      'bubbleShooter.over': 'FIM DE JOGO',
      'bubbleShooter.overFull': 'As bolhas chegaram à linha!',
      'bubbleShooter.share': 'Cheguei a {n} pontos no Bubble Shooter 🫧 Consegue me superar? {url}',
      'bubbleShooter.subtitle': 'MIRE · JUNTE 3 · ESTOURE',
      'bubbleShooter.tip': 'Junte <b>3 ou mais</b> bolhas da mesma cor para estourá-las.<br>O que ficar pendurado sem nada em cima também cai.<br>Mouse: mova para mirar, clique para atirar. Toque: arraste para mirar, solte para atirar. Teclado: <b>← →</b> e <b>Espaço</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'Merge Drop — Jogo de juntar frutas grátis online',
      'mergeDrop.first': 'Ainda sem recorde — comece a soltar!',
      'mergeDrop.hudBest': 'RECORDE',
      'mergeDrop.hudScore': 'PONTOS',
      'mergeDrop.next': 'PRÓXIMA',
      'mergeDrop.over': 'FIM DE JOGO',
      'mergeDrop.overFull': 'A pilha passou da linha!',
      'mergeDrop.share': 'Cheguei a {n} pontos no Merge Drop 🍉 Me supera? {url}',
      'mergeDrop.subtitle': 'SOLTE · JUNTE · CRESÇA',
      'mergeDrop.tip': 'Duas frutas do <b>mesmo tamanho se juntam</b> na seguinte.<br>Mantenha a pilha abaixo da linha vermelha.<br>Mouse: mova para mirar, clique para soltar. Toque: arraste para mirar, solte para soltar. Teclado: <b>← →</b> e <b>Espaço</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': 'Sudoku — Sudokus grátis online, 3 dificuldades',
      'sudoku.easy': 'FÁCIL',
      'sudoku.erase': 'APAGAR',
      'sudoku.final': '{d} resolvido em {t2}',
      'sudoku.first': 'Ainda sem recorde — resolva um!',
      'sudoku.hard': 'DIFÍCIL',
      'sudoku.hudBest': 'RECORDE',
      'sudoku.hudTime': 'TEMPO',
      'sudoku.medium': 'MÉDIO',
      'sudoku.over': 'RESOLVIDO!',
      'sudoku.share': 'Resolvi um Sudoku {d} em {t2} 🔢 Acha que é mais rápido? Me supere: {url}',
      'sudoku.tip': 'Preencha cada linha, coluna e caixa 3×3 com <b>1–9</b>.<br>Toque numa célula e depois num número.<br>Teclado: <b>1–9</b> para preencher, <b>setas</b> para mover, <b>0</b> para apagar.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'Mire, atire e junte três ou mais para estourar. Se cortar um grupo, tudo o que pende cai.',
      'hub.desc.merge-drop': 'Solte as frutas, junte os pares iguais e cresça até a gigante. Não deixe a pilha passar da linha.',
      'hub.desc.sudoku': 'Preencha cada linha, coluna e caixa 3×3 com 1–9. Três dificuldades: cada puzzle tem uma única solução.',

    },

    fr: {
      /* ---- shared ---- */
      'common.start': 'COMMENCER',
      'common.playAgain': 'REJOUER',
      'common.newGame': 'NOUVELLE PARTIE',
      'common.shareScore': 'PARTAGER LE SCORE',
      'common.copied': '✅ Copié !',
      'common.paused': 'EN PAUSE',
      'common.newRecord': '🏆 NOUVEAU RECORD !',
      'common.toggleSound': 'Activer ou couper le son',
      'common.soundOff': 'Couper le son',
      'common.soundOn': 'Activer le son',
      'common.language': 'Langue',
      'common.backHome': 'Retour à l\'accueil',
      'common.home': 'Accueil',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': 'Versez les liquides colorés d\'un tube à l\'autre jusqu\'à ce que chaque tube n\'ait plus qu\'une seule couleur. Chaque partie est vérifiée comme soluble.',

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
      'minesweeper.shareLose': 'Le Minesweeper a eu raison de moi 💥 Tu penses pouvoir le dégager ? Joue ici : {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': 'Course infinie dans le désert. Saute les cactus, esquive les oiseaux — ça accélère sans fin.',
      'hub.desc.stack-tower': 'Un clic, un bloc. Aligne chaque étage et bâtis la tour la plus haute.',
      'hub.desc.tic-tac-toe': 'Aligne trois pions contre une IA imbattable — ou joue à deux.',
      'hub.desc.memory-match': 'Retourne deux cartes, mémorise, et trouve toutes les paires en trois difficultés.',
      'hub.desc.whack-a-mole': '60 secondes de pur réflexe. Frappe les taupes, attrape la dorée, esquive les bombes.',
      'hub.desc.connect-four': 'Lâche un jeton, aligne quatre. Bats l\'ordinateur en trois difficultés.',
      'dinoRun.docTitle': 'Dino Run — Jeu de course infinie gratuit',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': 'COURS · SAUTE · ESQUIVE',
      'dinoRun.tip': 'Appuie sur <b>ESPACE</b> / <b>↑</b> pour sauter · maintiens <b>↓</b> pour te baisser<br>Sur mobile, touche <b>SAUTER</b> ou maintiens <b>SE BAISSER</b>',
      'dinoRun.hudScore': 'SCORE',
      'dinoRun.hudBest': 'RECORD',
      'dinoRun.btnJump': 'SAUTER',
      'dinoRun.btnDuck': 'SE BAISSER',
      'dinoRun.over': 'PARTIE TERMINÉE',
      'dinoRun.first': 'Première course — bonne chance !',
      'dinoRun.share': 'J\'ai marqué {n} points à Dino Run 🦖 Tu peux faire mieux ? Joue ici : {url}',
      'stackTower.docTitle': 'Stack Tower — Jeu d\'empilement gratuit',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': 'BÂTIS-LA JUSQU\'AU CIEL',
      'stackTower.tip': '<b>Touche</b> ou appuie sur <b>ESPACE</b> pour lâcher le bloc<br>Aligne-le bien — ce qui dépasse est coupé !',
      'stackTower.hudHeight': 'HAUTEUR',
      'stackTower.hudBest': 'RECORD',
      'stackTower.over': 'LA TOUR EST TOMBÉE',
      'stackTower.perfect': 'PARFAIT !',
      'stackTower.first': 'Premier bloc — bonne chance !',
      'stackTower.share': 'J\'ai empilé {n} blocs à Stack Tower 🏗️ Tu peux monter plus haut ? Joue ici : {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — Jeu en ligne contre l\'ordinateur',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': 'ALIGNE TROIS PIONS',
      'ticTacToe.modeEasy': 'FACILE',
      'ticTacToe.modeHard': 'IMBATTABLE',
      'ticTacToe.mode2p': '2 JOUEURS',
      'ticTacToe.thinking': 'L\'ORDINATEUR RÉFLÉCHIT…',
      'ticTacToe.turn': 'AU TOUR DE {p}',
      'ticTacToe.you': 'TOI',
      'ticTacToe.ai': 'ORDINATEUR',
      'ticTacToe.p1': 'JOUEUR 1',
      'ticTacToe.p2': 'JOUEUR 2',
      'ticTacToe.draws': 'ÉGALITÉS',
      'ticTacToe.winYou': 'TU GAGNES ! 🎉',
      'ticTacToe.winAI': 'L\'ORDINATEUR GAGNE',
      'ticTacToe.winP1': 'JOUEUR 1 GAGNE !',
      'ticTacToe.winP2': 'JOUEUR 2 GAGNE !',
      'ticTacToe.drawMsg': 'MATCH NUL !',
      'ticTacToe.newRound': 'NOUVELLE PARTIE',
      'ticTacToe.tip': 'Aligne trois pions : en ligne, en colonne ou en diagonale.',
      'memoryMatch.docTitle': 'Memory Match — Jeu de memory gratuit',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'TROUVE TOUTES LES PAIRES',
      'memoryMatch.modeEasy': 'FACILE',
      'memoryMatch.modeMedium': 'MOYEN',
      'memoryMatch.modeHard': 'DIFFICILE',
      'memoryMatch.hudPairs': 'PAIRES',
      'memoryMatch.hudMoves': 'COUPS',
      'memoryMatch.hudTime': 'TEMPS',
      'memoryMatch.bestLine': '🏅 Record : {moves} coups · {time}',
      'memoryMatch.first': 'Pas encore de record — donne le rythme !',
      'memoryMatch.cardAria': 'Carte {n}',
      'memoryMatch.winTitle': 'TOUTES LES PAIRES TROUVÉES !',
      'memoryMatch.result': '{moves} coups · {time}',
      'memoryMatch.share': 'J\'ai terminé Memory Match 🃏 en {moves} coups ({time}). Tu peux faire mieux ? Joue ici : {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — Jeu d\'arcade gratuit',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60 SECONDES DE RÉFLEXES',
      'whackAMole.hudTime': 'TEMPS',
      'whackAMole.hudScore': 'SCORE',
      'whackAMole.hudBest': 'RECORD',
      'whackAMole.tip': 'Frappe les taupes 🐹 (+1) et la dorée ⭐ (+3) — jamais une bombe 💣 (−2)',
      'whackAMole.startTip': 'Tu as <b>60 secondes</b>.<br>Taupes 🐹 = 1 · dorée ⭐ = 3 · bombes 💣 = −2.',
      'whackAMole.first': 'Première partie — bonne chance !',
      'whackAMole.over': 'TEMPS ÉCOULÉ !',
      'whackAMole.hits': '{hits} touches · {bombs} bombes',
      'whackAMole.share': 'J\'ai marqué {n} points à Whack-a-Mole 🔨 ({hits} touches). Tu peux faire mieux ? Joue ici : {url}',
      'connectFour.docTitle': 'Connect Four — Jeu en ligne contre l\'ordinateur',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': 'ALIGNE QUATRE PIONS',
      'connectFour.modeEasy': 'FACILE',
      'connectFour.modeMedium': 'MOYEN',
      'connectFour.modeHard': 'DIFFICILE',
      'connectFour.you': 'TOI',
      'connectFour.ai': 'ORDINATEUR',
      'connectFour.draws': 'ÉGALITÉS',
      'connectFour.thinking': 'L\'ORDINATEUR RÉFLÉCHIT…',
      'connectFour.turn': 'AU TOUR DE {p}',
      'connectFour.winYou': 'TU GAGNES ! 🎉',
      'connectFour.winAI': 'L\'ORDINATEUR GAGNE',
      'connectFour.drawMsg': 'MATCH NUL !',
      'connectFour.newRound': 'NOUVELLE PARTIE',
      'connectFour.tip': 'Touche une colonne pour lâcher ton jeton — tu es le rouge.',
      'connectFour.colAria': 'Colonne {n}',
      'crossRoad.docTitle': 'Cross Road — Jeu de sauts gratuit en ligne',
      'crossRoad.down': 'Bas',
      'crossRoad.first': 'Pas encore de record — faites votre premier saut !',
      'crossRoad.hudScore': 'PAS',
      'crossRoad.left': 'Gauche',
      'crossRoad.over': 'PARTIE TERMINÉE',
      'crossRoad.overCar': 'Une voiture vous a eu !',
      'crossRoad.overWater': 'Vous êtes tombé à l\'eau !',
      'crossRoad.right': 'Droite',
      'crossRoad.share': 'J\'ai avancé de {n} cases à Cross Road 🐸 sans me faire écraser. Battez-moi : {url}',
      'crossRoad.subtitle': 'SAUTEZ · ESQUIVEZ · EMBARQUEZ',
      'crossRoad.tip': 'Sautez <b>vers l\'avant</b> case par case. Évitez les voitures.<br>Sur l\'eau, posez-vous sur un <b>rondin</b> — sinon vous coulez.<br>Glissez, utilisez le pavé ci-dessous ou <b>flèches / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': 'Haut',
      'fruitSlice.combo': 'COMBO x{n} !',
      'fruitSlice.docTitle': 'Fruit Slice — Jeu de découpe gratuit en ligne',
      'fruitSlice.first': 'Pas encore de record — lancez-vous !',
      'fruitSlice.hudBest': 'RECORD',
      'fruitSlice.hudScore': 'FRUITS',
      'fruitSlice.over': 'PARTIE TERMINÉE',
      'fruitSlice.overBomb': 'Vous avez tranché une bombe !',
      'fruitSlice.overMiss': 'Vous avez laissé tomber un fruit !',
      'fruitSlice.share': 'J\'ai tranché {n} fruits à Fruit Slice 🍉 sans toucher une bombe. Essayez de me battre : {url}',
      'fruitSlice.subtitle': 'GLISSEZ · TRANCHEZ · COMBO',
      'fruitSlice.tip': 'Glissez sur les fruits pour les trancher. Ratez-en un et vous perdez un cœur.<br>Trancher une <b>bombe</b> coûte aussi un cœur.<br>Mobile : glissez du doigt. Bureau : bougez la souris.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — Puzzle de tri de liquides gratuit en ligne',
      'waterSort.final': 'Niveau {n} terminé en <b>{m}</b> coups',
      'waterSort.first': 'Pas encore de record — terminez un niveau !',
      'waterSort.hudBest': 'RECORD',
      'waterSort.hudLevel': 'NIVEAU',
      'waterSort.hudMoves': 'COUPS',
      'waterSort.next': 'NIVEAU SUIVANT',
      'waterSort.over': 'RÉUSSI !',
      'waterSort.restart': 'RECOMMENCER',
      'waterSort.share': 'J\'ai terminé le niveau {n} de Water Sort 🧪 en {m} coups. Faites mieux ? {url}',
      'waterSort.stuck': 'Plus aucun coup possible — annulez ou recommencez',
      'waterSort.tip': 'Touchez un tube, puis un autre pour verser.<br>Vous ne pouvez verser que sur la <b>même couleur</b> ou dans un tube vide.<br>Chaque partie est vérifiée comme soluble.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': 'ANNULER',

      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': 'Avancez case par case, évitez la circulation et traversez la rivière sur les rondins.',
      'hub.desc.fruit-slice': 'Tranchez les fruits d\'un glissement, enchaînez les combos et évitez les bombes.',
      'hub.desc.piano-tap': 'Frappez la tuile noire la plus basse avant qu\'elle ne file. Touchez une blanche et c\'est fini.',
      'hub.desc.slide-puzzle': 'Le puzzle de 15 classique. Remettez les tuiles dans l\'ordre en un minimum de coups.',
      'pianoTap.docTitle': 'Piano Tap — Jeu de réflexes gratuit en ligne',
      'pianoTap.first': 'Pas encore de record — allez le chercher !',
      'pianoTap.hudBest': 'RECORD',
      'pianoTap.hudScore': 'TUILES',
      'pianoTap.over': 'PARTIE TERMINÉE',
      'pianoTap.overMiss': 'Vous avez raté une tuile !',
      'pianoTap.overWrong': 'Vous avez touché une tuile blanche !',
      'pianoTap.share': 'J\'ai cassé {n} tuiles à Piano Tap 🎹. Vos doigts sont plus rapides ? Battez-moi : {url}',
      'pianoTap.subtitle': 'TAPEZ · VITE · JAMAIS BLANC',
      'pianoTap.tip': 'Frappez la <b>tuile noire la plus basse</b> — ratez-la et le plateau défile.<br>Touchez une blanche et c\'est fini.<br>Clavier : <b>D F J K</b> ou <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — Puzzle de 15 gratuit en ligne',
      'slidePuzzle.final': 'Résolu en <b>{m}</b> coups · {t}',
      'slidePuzzle.first': 'Pas encore de record — résolvez-en un !',
      'slidePuzzle.hudBest': 'RECORD',
      'slidePuzzle.hudMoves': 'COUPS',
      'slidePuzzle.hudTime': 'TEMPS',
      'slidePuzzle.mode3': 'Puzzle 3 × 3',
      'slidePuzzle.mode4': 'Puzzle 4 × 4',
      'slidePuzzle.mode5': 'Puzzle 5 × 5',
      'slidePuzzle.over': 'RÉSOLU !',
      'slidePuzzle.share': 'J\'ai résolu le Slide Puzzle {n}×{n} 🔢 en {m} coups ({t}). Faites mieux ? {url}',
      'slidePuzzle.tip': 'Touchez une tuile voisine du trou pour la glisser, ou faites glisser votre doigt.<br>Remettez <b>1, 2, 3 …</b> dans l\'ordre. Chaque partie est soluble.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'Bubble Shooter — Jeu de bulles gratuit en ligne',
      'bubbleShooter.first': 'Pas encore de record — éclatez des bulles !',
      'bubbleShooter.hudBest': 'RECORD',
      'bubbleShooter.hudScore': 'SCORE',
      'bubbleShooter.next': 'SUIVANTE',
      'bubbleShooter.over': 'PARTIE TERMINÉE',
      'bubbleShooter.overFull': 'Les bulles ont atteint la ligne !',
      'bubbleShooter.share': 'J\'ai atteint {n} points à Bubble Shooter 🫧 Vous faites mieux ? {url}',
      'bubbleShooter.subtitle': 'VISE · ALIGNE 3 · ÉCLATE',
      'bubbleShooter.tip': 'Alignez <b>3 bulles ou plus</b> de la même couleur pour les éclater.<br>Ce qui pend sans rien au-dessus tombe aussi.<br>Souris : bougez pour viser, cliquez pour tirer. Tactile : glissez pour viser, relâchez pour tirer. Clavier : <b>← →</b> et <b>Espace</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'Merge Drop — Jeu de fusion de fruits gratuit en ligne',
      'mergeDrop.first': 'Pas encore de record — lancez-vous !',
      'mergeDrop.hudBest': 'RECORD',
      'mergeDrop.hudScore': 'SCORE',
      'mergeDrop.next': 'SUIVANTE',
      'mergeDrop.over': 'PARTIE TERMINÉE',
      'mergeDrop.overFull': 'La pile a dépassé la ligne !',
      'mergeDrop.share': 'J\'ai atteint {n} points à Merge Drop 🍉 Vous faites mieux ? {url}',
      'mergeDrop.subtitle': 'LÂCHER · FUSIONNER · GRANDIR',
      'mergeDrop.tip': 'Deux fruits de <b>même taille fusionnent</b> en celui du dessus.<br>Gardez la pile sous la ligne rouge.<br>Souris : bougez pour viser, cliquez pour lâcher. Tactile : glissez pour viser, relâchez pour lâcher. Clavier : <b>← →</b> et <b>Espace</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': 'Sudoku — Sudokus gratuits en ligne, 3 niveaux',
      'sudoku.easy': 'FACILE',
      'sudoku.erase': 'EFFACER',
      'sudoku.final': '{d} résolu en {t2}',
      'sudoku.first': 'Pas encore de record — résolvez-en un !',
      'sudoku.hard': 'DIFFICILE',
      'sudoku.hudBest': 'RECORD',
      'sudoku.hudTime': 'TEMPS',
      'sudoku.medium': 'MOYEN',
      'sudoku.over': 'RÉSOLU !',
      'sudoku.share': 'J\'ai résolu un Sudoku {d} en {t2} 🔢 Vous pensez être plus rapide ? Battez-moi : {url}',
      'sudoku.tip': 'Remplissez chaque ligne, colonne et carré 3×3 avec <b>1–9</b>.<br>Touchez une case, puis un chiffre.<br>Clavier : <b>1–9</b> pour remplir, <b>flèches</b> pour bouger, <b>0</b> pour effacer.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'Visez, tirez et alignez trois bulles ou plus pour les éclater. Coupez une grappe, tout ce qui pend tombe.',
      'hub.desc.merge-drop': 'Lâchez les fruits, fusionnez les paires identiques et grandissez jusqu\'au géant. Gardez la pile sous la ligne.',
      'hub.desc.sudoku': 'Remplissez chaque ligne, colonne et carré 3×3 avec 1–9. Trois niveaux : chaque grille a une solution unique.',

    },

    de: {
      /* ---- shared ---- */
      'common.start': 'START',
      'common.playAgain': 'NOCHMAL SPIELEN',
      'common.newGame': 'NEUES SPIEL',
      'common.shareScore': 'ERGEBNIS TEILEN',
      'common.copied': '✅ Kopiert!',
      'common.paused': 'PAUSIERT',
      'common.newRecord': '🏆 NEUER REKORD!',
      'common.toggleSound': 'Ton ein- oder ausschalten',
      'common.soundOff': 'Ton aus',
      'common.soundOn': 'Ton ein',
      'common.language': 'Sprache',
      'common.backHome': 'Zurück zur Startseite',
      'common.home': 'Startseite',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': 'Gieße die farbigen Flüssigkeiten zwischen den Röhrchen um, bis jedes nur noch eine Farbe enthält. Jede Aufgabe ist als lösbar geprüft.',

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
      'minesweeper.shareLose': 'Minesweeper hat mich erwischt 💥 Glaubst du, du schaffst es? Hier spielen: {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': 'Endloser Wüstenlauf. Spring über Kakteen, duck dich vor Vögeln — es wird immer schneller.',
      'hub.desc.stack-tower': 'Ein Tipp, ein Block. Richte jede Etage aus und baue den höchsten Turm.',
      'hub.desc.tic-tac-toe': 'Drei in einer Reihe gegen eine unbesiegbare KI — oder zu zweit an einem Gerät.',
      'hub.desc.memory-match': 'Decke zwei Karten auf, merke sie dir und finde alle Paare in drei Schwierigkeiten.',
      'hub.desc.whack-a-mole': '60 Sekunden pure Reflexe. Triff die Maulwürfe, schnapp den goldenen, meide die Bomben.',
      'hub.desc.connect-four': 'Scheibe fallen lassen, vier in eine Reihe bringen. Besiege den Computer in drei Stufen.',
      'dinoRun.docTitle': 'Dino Run — Kostenloses Endless-Runner-Spiel',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': 'LAUFEN · SPRINGEN · AUSWEICHEN',
      'dinoRun.tip': '<b>LEERTASTE</b> / <b>↑</b> zum Springen · <b>↓</b> halten zum Ducken<br>Auf dem Handy <b>SPRINGEN</b> antippen oder <b>DUCKEN</b> halten',
      'dinoRun.hudScore': 'PUNKTE',
      'dinoRun.hudBest': 'REKORD',
      'dinoRun.btnJump': 'SPRINGEN',
      'dinoRun.btnDuck': 'DUCKEN',
      'dinoRun.over': 'SPIEL VORBEI',
      'dinoRun.first': 'Erster Lauf — viel Glück!',
      'dinoRun.share': 'Ich habe {n} Punkte bei Dino Run 🦖 geschafft. Schaffst du mehr? Hier spielen: {url}',
      'stackTower.docTitle': 'Stack Tower — Kostenloses Stapelspiel',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': 'BAUE BIS IN DEN HIMMEL',
      'stackTower.tip': '<b>Tippen</b> oder <b>LEERTASTE</b> lässt den Block fallen<br>Richte ihn aus — was übersteht, wird abgeschnitten!',
      'stackTower.hudHeight': 'HÖHE',
      'stackTower.hudBest': 'REKORD',
      'stackTower.over': 'DER TURM IST GEFALLEN',
      'stackTower.perfect': 'PERFEKT!',
      'stackTower.first': 'Erster Block — viel Glück!',
      'stackTower.share': 'Ich habe {n} Blöcke bei Stack Tower 🏗️ gestapelt. Baust du höher? Hier spielen: {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — Online gegen den Computer spielen',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': 'DREI IN EINER REIHE GEWINNT',
      'ticTacToe.modeEasy': 'LEICHT',
      'ticTacToe.modeHard': 'UNBESIEGBAR',
      'ticTacToe.mode2p': '2 SPIELER',
      'ticTacToe.thinking': 'DER COMPUTER DENKT NACH…',
      'ticTacToe.turn': '{p} IST AM ZUG',
      'ticTacToe.you': 'DU',
      'ticTacToe.ai': 'COMPUTER',
      'ticTacToe.p1': 'SPIELER 1',
      'ticTacToe.p2': 'SPIELER 2',
      'ticTacToe.draws': 'UNENTSCHIEDEN',
      'ticTacToe.winYou': 'DU GEWINNST! 🎉',
      'ticTacToe.winAI': 'DER COMPUTER GEWINNT',
      'ticTacToe.winP1': 'SPIELER 1 GEWINNT!',
      'ticTacToe.winP2': 'SPIELER 2 GEWINNT!',
      'ticTacToe.drawMsg': 'UNENTSCHIEDEN!',
      'ticTacToe.newRound': 'NEUE RUNDE',
      'ticTacToe.tip': 'Bringe drei in eine Reihe — waagerecht, senkrecht oder diagonal.',
      'memoryMatch.docTitle': 'Memory Match — Kostenloses Memory-Spiel',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'FINDE ALLE PAARE',
      'memoryMatch.modeEasy': 'LEICHT',
      'memoryMatch.modeMedium': 'MITTEL',
      'memoryMatch.modeHard': 'SCHWER',
      'memoryMatch.hudPairs': 'PAARE',
      'memoryMatch.hudMoves': 'ZÜGE',
      'memoryMatch.hudTime': 'ZEIT',
      'memoryMatch.bestLine': '🏅 Rekord: {moves} Züge · {time}',
      'memoryMatch.first': 'Noch kein Rekord — gib das Tempo vor!',
      'memoryMatch.cardAria': 'Karte {n}',
      'memoryMatch.winTitle': 'ALLE PAARE GEFUNDEN!',
      'memoryMatch.result': '{moves} Züge · {time}',
      'memoryMatch.share': 'Ich habe Memory Match 🃏 in {moves} Zügen ({time}) geschafft. Schaffst du weniger? Hier spielen: {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — Kostenloses Arcade-Spiel',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60 SEKUNDEN REFLEXE',
      'whackAMole.hudTime': 'ZEIT',
      'whackAMole.hudScore': 'PUNKTE',
      'whackAMole.hudBest': 'REKORD',
      'whackAMole.tip': 'Triff die Maulwürfe 🐹 (+1) und den goldenen ⭐ (+3) — nie eine Bombe 💣 (−2)',
      'whackAMole.startTip': 'Du hast <b>60 Sekunden</b>.<br>Maulwürfe 🐹 = 1 · goldener ⭐ = 3 · Bomben 💣 = −2.',
      'whackAMole.first': 'Erste Runde — viel Glück!',
      'whackAMole.over': 'ZEIT ABGELAUFEN!',
      'whackAMole.hits': '{hits} Treffer · {bombs} Bomben',
      'whackAMole.share': 'Ich habe {n} Punkte bei Whack-a-Mole 🔨 geschafft ({hits} Treffer). Schaffst du mehr? Hier spielen: {url}',
      'connectFour.docTitle': 'Connect Four — Online gegen den Computer spielen',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': 'VIER IN EINER REIHE GEWINNT',
      'connectFour.modeEasy': 'LEICHT',
      'connectFour.modeMedium': 'MITTEL',
      'connectFour.modeHard': 'SCHWER',
      'connectFour.you': 'DU',
      'connectFour.ai': 'COMPUTER',
      'connectFour.draws': 'UNENTSCHIEDEN',
      'connectFour.thinking': 'DER COMPUTER DENKT NACH…',
      'connectFour.turn': '{p} IST AM ZUG',
      'connectFour.winYou': 'DU GEWINNST! 🎉',
      'connectFour.winAI': 'DER COMPUTER GEWINNT',
      'connectFour.drawMsg': 'UNENTSCHIEDEN!',
      'connectFour.newRound': 'NEUE RUNDE',
      'connectFour.tip': 'Tippe eine Spalte an, um deine Scheibe fallen zu lassen — du bist Rot.',
      'connectFour.colAria': 'Spalte {n}',
      'crossRoad.docTitle': 'Cross Road — Kostenloses Hüpfspiel online',
      'crossRoad.down': 'Runter',
      'crossRoad.first': 'Noch kein Rekord — mach deinen ersten Hüpfer!',
      'crossRoad.hudScore': 'SCHRITTE',
      'crossRoad.left': 'Links',
      'crossRoad.over': 'GAME OVER',
      'crossRoad.overCar': 'Ein Auto hat dich erwischt!',
      'crossRoad.overWater': 'Du bist ins Wasser gefallen!',
      'crossRoad.right': 'Rechts',
      'crossRoad.share': 'Ich bin {n} Felder in Cross Road 🐸 gehüpft, ohne plattgefahren zu werden. Schlag mich: {url}',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — Kostenloses Flüssigkeits-Sortier-Puzzle online',
      'waterSort.final': 'Level {n} in <b>{m}</b> Zügen geschafft',
      'waterSort.first': 'Noch kein Rekord — schaffe ein Level!',
      'waterSort.hudBest': 'REKORD',
      'waterSort.hudLevel': 'LEVEL',
      'waterSort.hudMoves': 'ZÜGE',
      'waterSort.next': 'NÄCHSTES LEVEL',
      'waterSort.over': 'GESCHAFFT!',
      'waterSort.restart': 'NEU STARTEN',
      'waterSort.share': 'Ich habe Level {n} von Water Sort 🧪 in {m} Zügen geschafft. Schaffst du es besser? {url}',
      'waterSort.stuck': 'Keine Züge mehr möglich — rückgängig machen oder neu starten',
      'waterSort.tip': 'Tippe ein Röhrchen an, dann ein zweites zum Umfüllen.<br>Du kannst nur auf die <b>gleiche Farbe</b> oder in ein leeres Röhrchen gießen.<br>Jede Aufgabe ist als lösbar geprüft.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': 'ZURÜCK',

      'crossRoad.subtitle': 'HÜPFEN · AUSWEICHEN · MITFAHREN',
      'crossRoad.tip': 'Hüpfe <b>vorwärts</b>, Feld für Feld. Weiche den Autos aus.<br>Auf dem Wasser musst du auf einem <b>Baumstamm</b> stehen — sonst sinkst du.<br>Wischen, das Steuerkreuz unten oder <b>Pfeiltasten / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': 'Hoch',
      'fruitSlice.combo': 'COMBO x{n}!',
      'fruitSlice.docTitle': 'Fruit Slice — Kostenloses Schnippelspiel online',
      'fruitSlice.first': 'Noch kein Rekord — leg los!',
      'fruitSlice.hudBest': 'REKORD',
      'fruitSlice.hudScore': 'FRÜCHTE',
      'fruitSlice.over': 'GAME OVER',
      'fruitSlice.overBomb': 'Du hast eine Bombe geschnitten!',
      'fruitSlice.overMiss': 'Du hast eine Frucht fallen lassen!',
      'fruitSlice.share': 'Ich habe {n} Früchte bei Fruit Slice 🍉 geschnitten, ohne eine Bombe zu treffen. Versuch mich zu schlagen: {url}',
      'fruitSlice.subtitle': 'WISCHEN · SCHNEIDEN · COMBO',
      'fruitSlice.tip': 'Wische über die Früchte, um sie zu schneiden. Lässt du eine fallen, verlierst du ein Herz.<br>Eine <b>Bombe</b> zu schneiden kostet ebenfalls ein Herz.<br>Handy: mit dem Finger ziehen. Desktop: Maus bewegen reicht.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': 'Hüpfe Feld für Feld, weiche dem Verkehr aus und überquere den Fluss auf Baumstämmen.',
      'hub.desc.fruit-slice': 'Schneide die Früchte mit einem Wisch, sammle Combos und meide die Bomben.',
      'hub.desc.piano-tap': 'Triff die unterste schwarze Kachel, bevor sie wegrollt. Berührst du eine weiße, bist du raus.',
      'hub.desc.slide-puzzle': 'Der klassische 15er-Puzzle. Sortiere die Plättchen mit möglichst wenigen Zügen.',
      'pianoTap.docTitle': 'Piano Tap — Kostenloses Reaktionstest-Spiel online',
      'pianoTap.first': 'Noch kein Rekord — hol dir einen!',
      'pianoTap.hudBest': 'REKORD',
      'pianoTap.hudScore': 'KACHELN',
      'pianoTap.over': 'GAME OVER',
      'pianoTap.overMiss': 'Du hast eine Kachel verpasst!',
      'pianoTap.overWrong': 'Du hast eine weiße Kachel getroffen!',
      'pianoTap.share': 'Ich habe {n} Kacheln bei Piano Tap 🎹 zerschlagen. Sind deine Finger schneller? Schlag mich: {url}',
      'pianoTap.subtitle': 'TIPPEN · SCHNELL · NIE WEISS',
      'pianoTap.tip': 'Triff die <b>unterste schwarze Kachel</b> — verpasst du sie, rollt das Feld weiter.<br>Berührst du eine weiße, bist du raus.<br>Tastatur: <b>D F J K</b> oder <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — Kostenloses 15er-Puzzle online',
      'slidePuzzle.final': 'Gelöst in <b>{m}</b> Zügen · {t}',
      'slidePuzzle.first': 'Noch kein Rekord — löse eins!',
      'slidePuzzle.hudBest': 'REKORD',
      'slidePuzzle.hudMoves': 'ZÜGE',
      'slidePuzzle.hudTime': 'ZEIT',
      'slidePuzzle.mode3': 'Puzzle 3 × 3',
      'slidePuzzle.mode4': 'Puzzle 4 × 4',
      'slidePuzzle.mode5': 'Puzzle 5 × 5',
      'slidePuzzle.over': 'GELÖST!',
      'slidePuzzle.share': 'Ich habe das {n}×{n} Slide Puzzle 🔢 in {m} Zügen gelöst ({t}). Schaffst du es besser? {url}',
      'slidePuzzle.tip': 'Tippe ein Plättchen neben der Lücke an, um es zu schieben — oder wische.<br>Bringe <b>1, 2, 3 …</b> in die richtige Reihenfolge. Jede Runde ist lösbar.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'Bubble Shooter — Kostenloses Blasen-Spiel online',
      'bubbleShooter.first': 'Noch kein Rekord — lass Blasen platzen!',
      'bubbleShooter.hudBest': 'REKORD',
      'bubbleShooter.hudScore': 'PUNKTE',
      'bubbleShooter.next': 'NÄCHSTE',
      'bubbleShooter.over': 'SPIEL VORBEI',
      'bubbleShooter.overFull': 'Die Blasen haben die Linie erreicht!',
      'bubbleShooter.share': 'Ich habe im Bubble Shooter {n} Punkte geholt 🫧 Schaffst du mehr? {url}',
      'bubbleShooter.subtitle': 'ZIELEN · 3 TREFFER · PLATZEN',
      'bubbleShooter.tip': 'Bringe <b>3 oder mehr</b> Blasen derselben Farbe zusammen, um sie platzen zu lassen.<br>Was ohne Halt darüber hängt, fällt mit.<br>Maus: bewegen zum Zielen, klicken zum Schießen. Touch: ziehen zum Zielen, loslassen zum Schießen. Tastatur: <b>← →</b> und <b>Leertaste</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'Merge Drop — Kostenloses Obst-Fusionsspiel online',
      'mergeDrop.first': 'Noch kein Rekord — leg los!',
      'mergeDrop.hudBest': 'REKORD',
      'mergeDrop.hudScore': 'PUNKTE',
      'mergeDrop.next': 'NÄCHSTE',
      'mergeDrop.over': 'SPIEL VORBEI',
      'mergeDrop.overFull': 'Der Stapel hat die Linie überschritten!',
      'mergeDrop.share': 'Ich habe im Merge Drop {n} Punkte erreicht 🍉 Schaffst du mehr? {url}',
      'mergeDrop.subtitle': 'FALLEN · FUSION · WACHSEN',
      'mergeDrop.tip': 'Zwei Früchte <b>gleicher Größe verschmelzen</b> zur nächsten.<br>Halte den Stapel unter der roten Linie.<br>Maus: bewegen zum Zielen, klicken zum Fallenlassen. Touch: ziehen zum Zielen, loslassen zum Fallenlassen. Tastatur: <b>← →</b> und <b>Leertaste</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': 'Sudoku — Kostenlose Sudoku-Rätsel online, 3 Schwierigkeiten',
      'sudoku.easy': 'LEICHT',
      'sudoku.erase': 'LÖSCHEN',
      'sudoku.final': '{d} in {t2} gelöst',
      'sudoku.first': 'Noch kein Rekord — löse eins!',
      'sudoku.hard': 'SCHWER',
      'sudoku.hudBest': 'REKORD',
      'sudoku.hudTime': 'ZEIT',
      'sudoku.medium': 'MITTEL',
      'sudoku.over': 'GELÖST!',
      'sudoku.share': 'Ich habe ein {d}-Sudoku in {t2} gelöst 🔢 Bist du schneller? Schlag mich: {url}',
      'sudoku.tip': 'Fülle jede Zeile, Spalte und jeden 3×3-Block mit <b>1–9</b>.<br>Tippe auf ein Feld, dann auf eine Zahl.<br>Tastatur: <b>1–9</b> zum Füllen, <b>Pfeile</b> zum Bewegen, <b>0</b> zum Löschen.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'Zielen, schießen, drei oder mehr gleiche Blasen platzen lassen. Schneidest du einen Cluster ab, fällt alles darunter.',
      'hub.desc.merge-drop': 'Lass Obst fallen, verschmelze gleiche Paare und wachse bis zum Giganten. Der Stapel darf die Linie nicht überqueren.',
      'hub.desc.sudoku': 'Fülle jede Zeile, Spalte und jeden 3×3-Block mit 1–9. Drei Schwierigkeiten — jedes Rätsel hat genau eine Lösung.',

    },

    ja: {
      /* ---- shared ---- */
      'common.start': 'スタート',
      'common.playAgain': 'もう一度プレイ',
      'common.newGame': '新しいゲーム',
      'common.shareScore': 'スコアをシェア',
      'common.copied': '✅ コピーしました！',
      'common.paused': '一時停止中',
      'common.newRecord': '🏆 新記録！',
      'common.toggleSound': 'サウンドのオン／オフ',
      'common.soundOff': '音を消す',
      'common.soundOn': '音を出す',
      'common.language': '言語',
      'common.backHome': 'ホームに戻る',
      'common.home': 'ホーム',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': '色のついた液体を試験管から試験管へ移し、どの試験管も1色だけになるようにしよう。どの問題も解けることを検証済み。',

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
      'minesweeper.shareLose': 'Minesweeper 💣 にやられました。クリアできる？プレイはこちら：{url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': '砂漠をどこまでも走る。サボテンを跳び、鳥をしゃがんでよけろ —— 速度はどんどん上がる。',
      'hub.desc.stack-tower': 'ワンタップで1ブロック。各段をそろえて、いちばん高い塔を建てよう。',
      'hub.desc.tic-tac-toe': '無敵AIと3つ並べ対決 —— 2人プレイでも遊べる。',
      'hub.desc.memory-match': 'カードを2枚めくって覚えて、3つの難易度で全ペアを見つけよう。',
      'hub.desc.whack-a-mole': '60秒の反射神経勝負。モグラを叩き、金モグラを狙い、爆弾はよけろ。',
      'hub.desc.connect-four': 'コマを落として4つ並べる。3つの難易度でコンピュータに挑戦。',
      'dinoRun.docTitle': 'Dino Run — 無料のエンドレスランナーゲーム',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': '走って · 跳んで · よけて',
      'dinoRun.tip': '<b>スペース</b> / <b>↑</b> でジャンプ · <b>↓</b> 長押しでしゃがむ<br>スマホは <b>ジャンプ</b> をタップ、<b>しゃがむ</b> を長押し',
      'dinoRun.hudScore': 'スコア',
      'dinoRun.hudBest': 'ベスト',
      'dinoRun.btnJump': 'ジャンプ',
      'dinoRun.btnDuck': 'しゃがむ',
      'dinoRun.over': 'ゲームオーバー',
      'dinoRun.first': '初プレイ —— がんばって！',
      'dinoRun.share': 'Dino Run 🦖 で {n} 点とりました。超えられる？プレイはこちら：{url}',
      'stackTower.docTitle': 'Stack Tower — 無料の積み上げゲーム',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': '空まで積み上げろ',
      'stackTower.tip': '<b>タップ</b>または <b>スペース</b> でブロックを落とす<br>そろえて重ねよう —— はみ出た部分は切られる！',
      'stackTower.hudHeight': '高さ',
      'stackTower.hudBest': 'ベスト',
      'stackTower.over': 'タワーが崩れた',
      'stackTower.perfect': 'パーフェクト！',
      'stackTower.first': '最初のブロック —— がんばって！',
      'stackTower.share': 'Stack Tower 🏗️ で {n} 段積み上げました。もっと高く積める？プレイはこちら：{url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — 無料の対コンピュータゲーム',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': '3つ並べたら勝ち',
      'ticTacToe.modeEasy': 'かんたん',
      'ticTacToe.modeHard': '無敵',
      'ticTacToe.mode2p': '2人プレイ',
      'ticTacToe.thinking': 'コンピュータが考え中…',
      'ticTacToe.turn': '{p} の番',
      'ticTacToe.you': 'あなた',
      'ticTacToe.ai': 'コンピュータ',
      'ticTacToe.p1': 'プレイヤー1',
      'ticTacToe.p2': 'プレイヤー2',
      'ticTacToe.draws': '引き分け',
      'ticTacToe.winYou': 'あなたの勝ち！🎉',
      'ticTacToe.winAI': 'コンピュータの勝ち',
      'ticTacToe.winP1': 'プレイヤー1の勝ち！',
      'ticTacToe.winP2': 'プレイヤー2の勝ち！',
      'ticTacToe.drawMsg': '引き分け！',
      'ticTacToe.newRound': 'もう一局',
      'ticTacToe.tip': 'たて・よこ・ななめのどれかで3つ並べよう。',
      'memoryMatch.docTitle': 'Memory Match — 無料の神経衰弱ゲーム',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': 'すべてのペアを見つけよう',
      'memoryMatch.modeEasy': 'かんたん',
      'memoryMatch.modeMedium': 'ふつう',
      'memoryMatch.modeHard': 'むずかしい',
      'memoryMatch.hudPairs': 'ペア',
      'memoryMatch.hudMoves': '手数',
      'memoryMatch.hudTime': 'タイム',
      'memoryMatch.bestLine': '🏅 ベスト：{moves} 手 · {time}',
      'memoryMatch.first': '記録はまだありません —— 基準を作ろう！',
      'memoryMatch.cardAria': '{n} 枚目のカード',
      'memoryMatch.winTitle': 'すべてのペアを発見！',
      'memoryMatch.result': '{moves} 手 · {time}',
      'memoryMatch.share': 'Memory Match 🃏 を {moves} 手（{time}）でクリアしました。超えられる？プレイはこちら：{url}',
      'whackAMole.docTitle': 'Whack-a-Mole — 無料のアーケードゲーム',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60秒の反射神経勝負',
      'whackAMole.hudTime': 'タイム',
      'whackAMole.hudScore': 'スコア',
      'whackAMole.hudBest': 'ベスト',
      'whackAMole.tip': 'モグラ 🐹（+1）と金モグラ ⭐（+3）を叩こう —— 爆弾 💣（−2）はダメ',
      'whackAMole.startTip': '制限時間は <b>60秒</b>。<br>モグラ 🐹 は 1点 · 金モグラ ⭐ は 3点 · 爆弾 💣 は −2点。',
      'whackAMole.first': '初プレイ —— がんばって！',
      'whackAMole.over': 'タイムアップ！',
      'whackAMole.hits': '{hits} ヒット · 爆弾 {bombs}',
      'whackAMole.share': 'Whack-a-Mole 🔨 で {n} 点（{hits} ヒット）。超えられる？プレイはこちら：{url}',
      'connectFour.docTitle': 'Connect Four — 無料の対コンピュータゲーム',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': '4つ並べたら勝ち',
      'connectFour.modeEasy': 'かんたん',
      'connectFour.modeMedium': 'ふつう',
      'connectFour.modeHard': 'むずかしい',
      'connectFour.you': 'あなた',
      'connectFour.ai': 'コンピュータ',
      'connectFour.draws': '引き分け',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — 無料オンライン液体仕分けパズル',
      'waterSort.final': 'レベル {n} を <b>{m}</b> 手でクリア',
      'waterSort.first': '記録はまだありません — 1面クリアしよう！',
      'waterSort.hudBest': 'ベスト',
      'waterSort.hudLevel': 'レベル',
      'waterSort.hudMoves': '手数',
      'waterSort.next': '次のレベル',
      'waterSort.over': 'クリア！',
      'waterSort.restart': 'やり直す',
      'waterSort.share': 'Water Sort のレベル {n} を {m} 手でクリアしました 🧪 もっと少ない手数でできる？{url}',
      'waterSort.stuck': 'これ以上移せません — 元に戻すかやり直そう',
      'waterSort.tip': '試験管をタップしてから、別の試験管をタップすると注げます。<br>注げるのは<b>同じ色</b>の上か、空の試験管だけ。<br>どの問題も解けることを検証済み。',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': '元に戻す',

      'connectFour.thinking': 'コンピュータが考え中…',
      'connectFour.turn': '{p} の番',
      'connectFour.winYou': 'あなたの勝ち！🎉',
      'connectFour.winAI': 'コンピュータの勝ち',
      'connectFour.drawMsg': '引き分け！',
      'connectFour.newRound': 'もう一局',
      'connectFour.tip': '列をタップしてコマを落とそう —— あなたは赤です。',
      'connectFour.colAria': '{n} 列目',
      'crossRoad.docTitle': 'Cross Road — 無料オンライン跳躍ゲーム',
      'crossRoad.down': '下',
      'crossRoad.first': 'まだ記録なし —— 最初の一歩を跳ぼう！',
      'crossRoad.hudScore': '歩数',
      'crossRoad.left': '左',
      'crossRoad.over': 'ゲームオーバー',
      'crossRoad.overCar': '車にはねられた！',
      'crossRoad.overWater': '水に落ちた！',
      'crossRoad.right': '右',
      'crossRoad.share': 'Cross Road 🐸 で {n} マス進みました。もっと遠くへ行ける？{url}',
      'crossRoad.subtitle': '跳ぶ · よける · 乗る',
      'crossRoad.tip': '1 マスずつ<b>前</b>へ跳ぼう。車をよけてね。<br>水の上では<b>丸太</b>に乗ること。外れると沈みます。<br>スワイプ、下の十字キー、または<b>矢印キー / WASD</b>。',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': '上',
      'fruitSlice.combo': 'コンボ x{n}！',
      'fruitSlice.docTitle': 'Fruit Slice — 無料オンライン果物切りゲーム',
      'fruitSlice.first': 'まだ記録なし —— 切り始めよう！',
      'fruitSlice.hudBest': 'ベスト',
      'fruitSlice.hudScore': '果物',
      'fruitSlice.over': 'ゲームオーバー',
      'fruitSlice.overBomb': '爆弾を切ってしまった！',
      'fruitSlice.overMiss': '果物を落としてしまった！',
      'fruitSlice.share': 'Fruit Slice 🍉 で {n} 個の果物を切りました。爆弾はゼロ。挑戦してみて：{url}',
      'fruitSlice.subtitle': 'スワイプ · 切る · コンボ',
      'fruitSlice.tip': '果物の上をスワイプすると切れます。取り逃すとハートが 1 つ減る。<br><b>爆弾</b>を切ってもハートが減る。<br>スマホ：指でドラッグ。PC：マウスを動かすだけ。',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': '1マスずつ進んで車をよけ、丸太に乗って川を渡ろう。',
      'hub.desc.fruit-slice': 'スワイプで果物を切り、コンボをつなげ。爆弾には触れないこと。',
      'hub.desc.piano-tap': '一番下の黒いタイルを叩こう。逃すと盤面が流れていく。白を触ったら即終了。',
      'hub.desc.slide-puzzle': '定番の15パズル。できるだけ少ない手数で数字を元の順に戻そう。',
      'pianoTap.docTitle': 'Piano Tap — 無料オンライン反射神経ゲーム',
      'pianoTap.first': 'まだ記録なし —— 最初の記録を作ろう！',
      'pianoTap.hudBest': 'ベスト',
      'pianoTap.hudScore': 'タイル',
      'pianoTap.over': 'ゲームオーバー',
      'pianoTap.overMiss': 'タイルを逃した！',
      'pianoTap.overWrong': '白いタイルを叩いた！',
      'pianoTap.share': 'Piano Tap 🎹 で {n} 枚のタイルを叩きました。あなたの指はもっと速い？挑戦はこちら：{url}',
      'pianoTap.subtitle': '叩く · 速く · 白は禁止',
      'pianoTap.tip': '<b>一番下の黒いタイル</b>を叩こう。逃すと盤面が流れて終了。<br>白を触ったら即アウト。<br>キーボード：<b>D F J K</b> または <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — 無料オンライン15パズル',
      'slidePuzzle.final': '<b>{m}</b> 手 · {t} で完成',
      'slidePuzzle.first': 'まだ記録なし —— 1 枚解いてみよう！',
      'slidePuzzle.hudBest': 'ベスト',
      'slidePuzzle.hudMoves': '手数',
      'slidePuzzle.hudTime': '時間',
      'slidePuzzle.mode3': '3 × 3 パズル',
      'slidePuzzle.mode4': '4 × 4 パズル',
      'slidePuzzle.mode5': '5 × 5 パズル',
      'slidePuzzle.over': '完成！',
      'slidePuzzle.share': '{n}×{n} の Slide Puzzle 🔢 を {m} 手（{t}）で完成させました。もっと速くできる？{url}',
      'slidePuzzle.tip': '空きマスの隣のタイルをタップすると動きます。スワイプでも OK。<br><b>1、2、3 …</b> の順に並べよう。どの盤面も必ず解けます。',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': 'バブルシューター —— 無料オンライン泡消しゲーム',
      'bubbleShooter.first': 'まだ記録がありません —— 泡を消そう！',
      'bubbleShooter.hudBest': 'ベスト',
      'bubbleShooter.hudScore': 'スコア',
      'bubbleShooter.next': 'つぎ',
      'bubbleShooter.over': 'ゲームオーバー',
      'bubbleShooter.overFull': '泡がラインに到達しました！',
      'bubbleShooter.share': 'バブルシューターで {n} 点 🫧 超えられる？{url}',
      'bubbleShooter.subtitle': 'ねらう · 3つ消し · ポップ',
      'bubbleShooter.tip': '同じ色の泡を <b>3 つ以上</b> つなげると消せます。<br>上に何もない泡はまとめて落ちます。<br>マウス：動かして照準、クリックで発射。タッチ：ドラッグで照準、離して発射。キーボード：<b>← →</b> と <b>スペース</b>。',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': 'マージドロップ —— 無料オンライン果物合体ゲーム',
      'mergeDrop.first': 'まだ記録がありません —— 落としてみよう！',
      'mergeDrop.hudBest': 'ベスト',
      'mergeDrop.hudScore': 'スコア',
      'mergeDrop.next': 'つぎ',
      'mergeDrop.over': 'ゲームオーバー',
      'mergeDrop.overFull': '山がラインを超えました！',
      'mergeDrop.share': 'マージドロップで {n} 点 🍉 超えられる？{url}',
      'mergeDrop.subtitle': '落とす · 合体 · 育てる',
      'mergeDrop.tip': '<b>同じ大きさ</b>の果物どうしがくっつくと次の果物に合体します。<br>山が赤いラインを超えないように。<br>マウス：動かして照準、クリックで落下。タッチ：ドラッグで照準、離して落下。キーボード：<b>← →</b> と <b>スペース</b>。',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': '数独 —— 無料オンライン数独、3 つの難易度',
      'sudoku.easy': 'やさしい',
      'sudoku.erase': '消す',
      'sudoku.final': '{d}を {t2} でクリア',
      'sudoku.first': 'まだ記録がありません —— 1 問解いてみよう！',
      'sudoku.hard': 'むずかしい',
      'sudoku.hudBest': 'ベスト',
      'sudoku.hudTime': 'タイム',
      'sudoku.medium': 'ふつう',
      'sudoku.over': '完成！',
      'sudoku.share': '{d}の数独を {t2} で解きました 🔢 もっと速い？挑戦してね：{url}',
      'sudoku.tip': 'すべての行・列・3×3 ブロックを <b>1–9</b> で埋めよう。<br>マスをタップしてから数字をタップ。<br>キーボード：<b>1–9</b> で入力、<b>矢印</b> で移動、<b>0</b> で消去。',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': 'ねらって発射、同じ色を 3 つ以上つなげて消そう。支えを切れば下の泡もまとめて落ちます。',
      'hub.desc.merge-drop': '果物を落として同じ大きさを合体、最大の果物まで育てよう。山がラインを超えたら終わり。',
      'hub.desc.sudoku': 'すべての行・列・3×3 ブロックを 1–9 で埋めよう。3 つの難易度、どの問題も解はただ一つ。',

    },

    ko: {
      /* ---- shared ---- */
      'common.start': '시작',
      'common.playAgain': '다시 플레이',
      'common.newGame': '새 게임',
      'common.shareScore': '점수 공유',
      'common.copied': '✅ 복사되었습니다!',
      'common.paused': '일시정지',
      'common.newRecord': '🏆 신기록!',
      'common.toggleSound': '소리 켜기/끄기',
      'common.soundOff': '소리 끄기',
      'common.soundOn': '소리 켜기',
      'common.language': '언어',
      'common.backHome': '홈으로 돌아가기',
      'common.home': '홈',
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
      'game.water-sort': 'Water Sort',

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
      'hub.desc.water-sort': '색깔 액체를 시험관 사이로 옮겨 모든 시험관이 한 가지 색만 담도록 만드세요. 모든 문제는 풀 수 있음을 검증했습니다.',

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
      'minesweeper.shareLose': 'Minesweeper 💣 에 당했어요. 클리어할 수 있겠어요? 여기서 플레이: {url}',
      /* ---- new games: dino-run / stack-tower / tic-tac-toe / memory-match / whack-a-mole / connect-four ---- */
      'game.dino-run': 'Dino Run',
      'game.stack-tower': 'Stack Tower',
      'game.tic-tac-toe': 'Tic Tac Toe',
      'game.memory-match': 'Memory Match',
      'game.whack-a-mole': 'Whack-a-Mole',
      'game.connect-four': 'Connect Four',
      'hub.desc.dino-run': '끝없이 달리는 사막 질주. 선인장은 뛰어넘고 새는 숙여 피하세요 —— 갈수록 빨라집니다.',
      'hub.desc.stack-tower': '한 번의 탭, 하나의 블록. 매 층을 맞춰 가장 높은 탑을 쌓으세요.',
      'hub.desc.tic-tac-toe': '무적 AI와 세 개 나란히 놓기 —— 2인 플레이도 가능합니다.',
      'hub.desc.memory-match': '카드 두 장을 뒤집어 기억하고, 세 난이도에서 모든 짝을 찾으세요.',
      'hub.desc.whack-a-mole': '60초 순수 반사신경. 두더지를 치고 황금을 잡고 폭탄을 피하세요.',
      'hub.desc.connect-four': '말을 떨어뜨려 네 개를 나란히. 세 난이도로 컴퓨터에 도전하세요.',
      'dinoRun.docTitle': 'Dino Run — 무료 온라인 끝없는 달리기 게임',
      'dinoRun.title': 'DINO RUN',
      'dinoRun.subtitle': '달리고 · 뛰고 · 피하라',
      'dinoRun.tip': '<b>스페이스</b> / <b>↑</b> 로 점프 · <b>↓</b> 를 누르면 숙이기<br>모바일에서는 <b>점프</b> 를 탭하거나 <b>숙이기</b> 를 길게 누르세요',
      'dinoRun.hudScore': '점수',
      'dinoRun.hudBest': '최고',
      'dinoRun.btnJump': '점프',
      'dinoRun.btnDuck': '숙이기',
      'dinoRun.over': '게임 오버',
      'dinoRun.first': '첫 도전 —— 행운을 빌어요!',
      'dinoRun.share': 'Dino Run 🦖 에서 {n}점을 기록했습니다. 이길 수 있나요? 여기서 플레이: {url}',
      'stackTower.docTitle': 'Stack Tower — 무료 온라인 쌓기 게임',
      'stackTower.title': 'STACK TOWER',
      'stackTower.subtitle': '하늘까지 쌓아 올려라',
      'stackTower.tip': '<b>탭</b> 또는 <b>스페이스</b> 로 블록을 떨어뜨리세요<br>잘 맞춰 쌓으세요 —— 튀어나온 부분은 잘려 나갑니다!',
      'stackTower.hudHeight': '높이',
      'stackTower.hudBest': '최고',
      'stackTower.over': '탑이 무너졌다',
      'stackTower.perfect': '완벽!',
      'stackTower.first': '첫 블록 —— 행운을 빌어요!',
      'stackTower.share': 'Stack Tower 🏗️ 에서 {n}층을 쌓았습니다. 더 높이 쌓을 수 있나요? 여기서 플레이: {url}',
      'ticTacToe.docTitle': 'Tic Tac Toe — 무료 온라인 컴퓨터 대전 게임',
      'ticTacToe.title': 'TIC TAC TOE',
      'ticTacToe.subtitle': '세 개를 나란히 놓으면 승리',
      'ticTacToe.modeEasy': '쉬움',
      'ticTacToe.modeHard': '무적',
      'ticTacToe.mode2p': '2인 플레이',
      'ticTacToe.thinking': '컴퓨터가 생각 중…',
      'ticTacToe.turn': '{p} 차례',
      'ticTacToe.you': '나',
      'ticTacToe.ai': '컴퓨터',
      'ticTacToe.p1': '플레이어 1',
      'ticTacToe.p2': '플레이어 2',
      'ticTacToe.draws': '무승부',
      'ticTacToe.winYou': '당신의 승리! 🎉',
      'ticTacToe.winAI': '컴퓨터 승리',
      'ticTacToe.winP1': '플레이어 1 승리!',
      'ticTacToe.winP2': '플레이어 2 승리!',
      'ticTacToe.drawMsg': '무승부!',
      'ticTacToe.newRound': '새 게임',
      'ticTacToe.tip': '가로·세로·대각선 중 하나로 세 개를 나란히 놓으세요.',
      'memoryMatch.docTitle': 'Memory Match — 무료 온라인 카드 기억 게임',
      'memoryMatch.title': 'MEMORY MATCH',
      'memoryMatch.subtitle': '모든 짝을 찾아라',
      'memoryMatch.modeEasy': '쉬움',
      'memoryMatch.modeMedium': '보통',
      'memoryMatch.modeHard': '어려움',
      'memoryMatch.hudPairs': '남은 짝',
      'memoryMatch.hudMoves': '이동',
      'memoryMatch.hudTime': '시간',
      'memoryMatch.bestLine': '🏅 최고 기록: {moves}수 · {time}',
      'memoryMatch.first': '아직 기록이 없습니다 —— 기준을 세워 보세요!',
      'memoryMatch.cardAria': '{n}번 카드',
      'memoryMatch.winTitle': '모든 짝을 찾았습니다!',
      'memoryMatch.result': '{moves}수 · {time}',
      'memoryMatch.share': 'Memory Match 🃏 를 {moves}수({time})에 클리어했습니다. 이길 수 있나요? 여기서 플레이: {url}',
      'whackAMole.docTitle': 'Whack-a-Mole — 무료 온라인 아케이드 게임',
      'whackAMole.title': 'WHACK-A-MOLE',
      'whackAMole.subtitle': '60초 반사신경 대결',
      /* ---- water-sort ---- */
      'waterSort.docTitle': 'Water Sort — 무료 온라인 액체 분류 퍼즐',
      'waterSort.final': '레벨 {n}을 <b>{m}</b>수로 클리어',
      'waterSort.first': '기록이 아직 없습니다 — 한 레벨을 깨보세요!',
      'waterSort.hudBest': '최고',
      'waterSort.hudLevel': '레벨',
      'waterSort.hudMoves': '수',
      'waterSort.next': '다음 레벨',
      'waterSort.over': '클리어!',
      'waterSort.restart': '다시 시작',
      'waterSort.share': 'Water Sort 레벨 {n}을(를) {m}수로 클리어했습니다 🧪 더 잘할 수 있나요? {url}',
      'waterSort.stuck': '더 이상 옮길 수 없습니다 — 되돌리거나 다시 시작하세요',
      'waterSort.tip': '시험관을 탭한 뒤 다른 시험관을 탭하면 부을 수 있습니다.<br><b>같은 색</b> 위나 빈 시험관에만 부을 수 있습니다.<br>모든 문제는 풀 수 있음을 검증했습니다.',
      'waterSort.title': 'WATER SORT',
      'waterSort.undo': '되돌리기',

      'whackAMole.hudTime': '시간',
      'whackAMole.hudScore': '점수',
      'whackAMole.hudBest': '최고',
      'whackAMole.tip': '두더지 🐹(+1)와 황금 두더지 ⭐(+3)를 치세요 —— 폭탄 💣(−2)은 절대 치지 마세요',
      'whackAMole.startTip': '<b>60초</b>가 주어집니다.<br>두더지 🐹 1점 · 황금 ⭐ 3점 · 폭탄 💣 −2점.',
      'whackAMole.first': '첫 도전 —— 행운을 빌어요!',
      'whackAMole.over': '시간 종료!',
      'whackAMole.hits': '{hits}회 명중 · 폭탄 {bombs}회',
      'whackAMole.share': 'Whack-a-Mole 🔨 에서 {n}점({hits}회 명중)을 기록했습니다. 이길 수 있나요? 여기서 플레이: {url}',
      'connectFour.docTitle': 'Connect Four — 무료 온라인 컴퓨터 대전 게임',
      'connectFour.title': 'CONNECT FOUR',
      'connectFour.subtitle': '네 개를 나란히 놓으면 승리',
      'connectFour.modeEasy': '쉬움',
      'connectFour.modeMedium': '보통',
      'connectFour.modeHard': '어려움',
      'connectFour.you': '나',
      'connectFour.ai': '컴퓨터',
      'connectFour.draws': '무승부',
      'connectFour.thinking': '컴퓨터가 생각 중…',
      'connectFour.turn': '{p} 차례',
      'connectFour.winYou': '당신의 승리! 🎉',
      'connectFour.winAI': '컴퓨터 승리',
      'connectFour.drawMsg': '무승부!',
      'connectFour.newRound': '새 게임',
      'connectFour.tip': '열을 탭해 말을 떨어뜨리세요 —— 당신은 빨간색입니다.',
      'connectFour.colAria': '{n}번 열',
      'crossRoad.docTitle': 'Cross Road — 무료 온라인 점프 게임',
      'crossRoad.down': '아래',
      'crossRoad.first': '아직 기록이 없어요 — 첫 점프를!',
      'crossRoad.hudScore': '걸음',
      'crossRoad.left': '왼쪽',
      'crossRoad.over': '게임 오버',
      'crossRoad.overCar': '차에 치였어요!',
      'crossRoad.overWater': '물에 빠졌어요!',
      'crossRoad.right': '오른쪽',
      'crossRoad.share': 'Cross Road 🐸 에서 {n} 칸을 전진했어요. 더 멀리 갈 수 있나요? {url}',
      'crossRoad.subtitle': '점프 · 회피 · 탑승',
      'crossRoad.tip': '한 칸씩 <b>앞으로</b> 뛰세요. 차를 피해야 합니다.<br>물 위에서는 <b>통나무</b>에 올라타세요. 놓치면 가라앉습니다.<br>스와이프, 아래 방향키, 또는 <b>화살표 / WASD</b>.',
      'crossRoad.title': 'CROSS ROAD',
      'crossRoad.up': '위',
      'fruitSlice.combo': '콤보 x{n}!',
      'fruitSlice.docTitle': 'Fruit Slice — 무료 온라인 과일 자르기 게임',
      'fruitSlice.first': '아직 기록이 없어요 — 자르기 시작!',
      'fruitSlice.hudBest': '최고',
      'fruitSlice.hudScore': '과일',
      'fruitSlice.over': '게임 오버',
      'fruitSlice.overBomb': '폭탄을 잘랐어요!',
      'fruitSlice.overMiss': '과일을 떨어뜨렸어요!',
      'fruitSlice.share': 'Fruit Slice 🍉 에서 과일 {n} 개를 잘랐어요. 폭탄은 하나도 안 건드렸죠. 도전해 보세요: {url}',
      'fruitSlice.subtitle': '스와이프 · 자르기 · 콤보',
      'fruitSlice.tip': '과일 위를 스와이프하면 잘립니다. 하나를 놓치면 하트를 하나 잃어요.<br><b>폭탄</b>을 잘라도 하트를 잃습니다.<br>모바일: 손가락으로 드래그. PC: 마우스만 움직이면 됩니다.',
      'fruitSlice.title': 'FRUIT SLICE',
      'game.cross-road': 'Cross Road',
      'game.fruit-slice': 'Fruit Slice',
      'game.piano-tap': 'Piano Tap',
      'game.slide-puzzle': 'Slide Puzzle',
      'hub.desc.cross-road': '한 칸씩 앞으로 뛰며 차를 피하고, 통나무를 타고 강을 건너세요.',
      'hub.desc.fruit-slice': '스와이프로 과일을 자르고 콤보를 이어가세요. 폭탄은 피해야 합니다.',
      'hub.desc.piano-tap': '맨 아래 검은 타일을 치세요. 놓치면 판이 흘러가 버립니다. 흰 타일을 누르면 즉시 종료.',
      'hub.desc.slide-puzzle': '고전 15 퍼즐. 최소 이동으로 숫자를 순서대로 되돌리세요.',
      'pianoTap.docTitle': 'Piano Tap — 무료 온라인 반응 속도 게임',
      'pianoTap.first': '아직 기록이 없어요 — 첫 기록을 세워 보세요!',
      'pianoTap.hudBest': '최고',
      'pianoTap.hudScore': '타일',
      'pianoTap.over': '게임 오버',
      'pianoTap.overMiss': '타일을 놓쳤어요!',
      'pianoTap.overWrong': '흰 타일을 쳤어요!',
      'pianoTap.share': 'Piano Tap 🎹 에서 타일 {n} 개를 쳤어요. 손가락이 더 빠른가요? 도전해 보세요: {url}',
      'pianoTap.subtitle': '탭 · 빠르게 · 흰색 금지',
      'pianoTap.tip': '<b>맨 아래 검은 타일</b>을 치세요. 놓치면 판이 흘러가 끝납니다.<br>흰색을 누르면 바로 아웃.<br>키보드: <b>D F J K</b> 또는 <b>1 2 3 4</b>',
      'pianoTap.title': 'PIANO TAP',
      'slidePuzzle.docTitle': 'Slide Puzzle — 무료 온라인 15 퍼즐',
      'slidePuzzle.final': '<b>{m}</b> 수 · {t} 만에 완성',
      'slidePuzzle.first': '아직 기록이 없어요 — 하나 풀어 보세요!',
      'slidePuzzle.hudBest': '최고',
      'slidePuzzle.hudMoves': '이동',
      'slidePuzzle.hudTime': '시간',
      'slidePuzzle.mode3': '3 × 3 퍼즐',
      'slidePuzzle.mode4': '4 × 4 퍼즐',
      'slidePuzzle.mode5': '5 × 5 퍼즐',
      'slidePuzzle.over': '완성!',
      'slidePuzzle.share': '{n}×{n} Slide Puzzle 🔢 을 {m} 수({t})만에 풀었어요. 더 잘할 수 있나요? {url}',
      'slidePuzzle.tip': '빈칸 옆 타일을 누르면 밀려납니다. 스와이프도 됩니다.<br><b>1, 2, 3 …</b> 순서로 되돌리세요. 모든 판은 풀 수 있습니다.',
      'slidePuzzle.title': 'SLIDE PUZZLE',
      'bubbleShooter.docTitle': '버블 슈터 — 무료 온라인 버블 팝 게임',
      'bubbleShooter.first': '기록이 없습니다 — 버블을 터뜨려 보세요!',
      'bubbleShooter.hudBest': '최고',
      'bubbleShooter.hudScore': '점수',
      'bubbleShooter.next': '다음',
      'bubbleShooter.over': '게임 오버',
      'bubbleShooter.overFull': '버블이 라인에 닿았습니다!',
      'bubbleShooter.share': '버블 슈터에서 {n}점 🫧 이길 수 있나요? {url}',
      'bubbleShooter.subtitle': '조준 · 3개 매치 · 팝',
      'bubbleShooter.tip': '같은 색 버블을 <b>3개 이상</b> 붙이면 터집니다.<br>위에 아무것도 없는 버블은 함께 떨어집니다.<br>마우스: 움직여 조준, 클릭해 발사. 터치: 드래그로 조준, 놓아서 발사. 키보드: <b>← →</b> 와 <b>스페이스</b>.',
      'bubbleShooter.title': 'BUBBLE SHOOTER',
      'mergeDrop.docTitle': '머지 드롭 — 무료 온라인 과일 합치기 게임',
      'mergeDrop.first': '기록이 없습니다 — 떨어뜨려 보세요!',
      'mergeDrop.hudBest': '최고',
      'mergeDrop.hudScore': '점수',
      'mergeDrop.next': '다음',
      'mergeDrop.over': '게임 오버',
      'mergeDrop.overFull': '더미가 선을 넘었습니다!',
      'mergeDrop.share': '머지 드롭에서 {n}점 🍉 이길 수 있나요? {url}',
      'mergeDrop.subtitle': '떨어뜨리기 · 합치기 · 키우기',
      'mergeDrop.tip': '<b>같은 크기</b>의 과일 두 개가 만나면 다음 단계로 합쳐집니다.<br>더미가 빨간 선을 넘지 않게 하세요.<br>마우스: 움직여 조준, 클릭해 떨어뜨리기. 터치: 드래그로 조준, 놓아서 떨어뜨리기. 키보드: <b>← →</b> 와 <b>스페이스</b>.',
      'mergeDrop.title': 'MERGE DROP',
      'sudoku.docTitle': '스도쿠 — 무료 온라인 스도쿠, 3가지 난이도',
      'sudoku.easy': '쉬움',
      'sudoku.erase': '지우기',
      'sudoku.final': '{d} {t2} 만에 완성',
      'sudoku.first': '기록이 없습니다 — 한 판 풀어보세요!',
      'sudoku.hard': '어려움',
      'sudoku.hudBest': '최고',
      'sudoku.hudTime': '시간',
      'sudoku.medium': '보통',
      'sudoku.over': '완성!',
      'sudoku.share': '{d} 스도쿠를 {t2} 만에 풀었습니다 🔢 더 빠르다고요? 도전해 보세요: {url}',
      'sudoku.tip': '모든 행, 열, 3×3 박스를 <b>1–9</b>로 채우세요.<br>칸을 탭한 뒤 숫자를 탭하세요.<br>키보드: <b>1–9</b> 입력, <b>방향키</b> 이동, <b>0</b> 지우기.',
      'sudoku.title': 'SUDOKU',
      'game.bubble-shooter': 'Bubble Shooter',
      'game.merge-drop': 'Merge Drop',
      'game.sudoku': 'Sudoku',
      'hub.desc.bubble-shooter': '조준해서 발사하고 같은 색 3개 이상을 붙여 터뜨리세요. 지지대를 끊으면 아래 버블도 함께 떨어집니다.',
      'hub.desc.merge-drop': '과일을 떨어뜨려 같은 크기를 합치고 가장 큰 과일까지 키우세요. 더미가 선을 넘으면 끝입니다.',
      'hub.desc.sudoku': '모든 행, 열, 3×3 박스를 1–9로 채우세요. 3가지 난이도, 모든 문제의 답은 하나뿐입니다.',

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

  /* Escape a plain dictionary value before it goes into innerHTML. The
     dictionaries hold bare text (实体陷阱: `data-i18n` 写裸 &), so anything
    拼接进 HTML 都必须先过这一道。 */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

    /* 图标旁的文字标签(🔊 关闭声音 / 🏠 返回主页)也是可翻译文案,跟着一起刷。
       静音标签还要看 muted 状态,renderMute() 自己会算。 */
    renderMute();
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
    renderHome();
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
    '.wg-lang-btn{display:inline-flex;align-items:center;gap:7px;min-height:44px;font:600 13px/1.1 inherit;font-family:inherit;' +
      'color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);' +
      'border-radius:999px;padding:0 14px;cursor:pointer;white-space:nowrap;box-shadow:none;margin:0;' +
      'transition:background .15s,border-color .15s;}' +
    '.wg-lang-btn:hover{background:rgba(255,255,255,.24);border-color:rgba(255,255,255,.4);}' +
    '.wg-lang-btn:active{transform:scale(.96);}' +
    /* 图标 + 文字的图标尺寸:语言键、静音键、返回键共用同一枚 .wg-ico */
    '.wg-ico{font-size:16px;font-weight:400;line-height:1;}' +
    /* 方向由 placeMenu() 量过可用空间后决定,两个方向各留一条规则。
       原本写死 bottom:100% —— 按钮贴在页面顶部时面板整个弹到视口外,
       被浏览器裁掉(实测 hub 页:按钮 top=40、面板高 292 → 顶边 -260)。 */
    '.wg-lang-menu{position:absolute;left:50%;transform:translateX(-50%);' +
      'background:#132432;border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:6px;' +
      'min-width:168px;box-shadow:0 16px 44px rgba(0,0,0,.55);z-index:99999;display:none;text-align:left;' +
      'overflow-y:auto;overscroll-behavior:contain;}' +
    '.wg-lang-menu.open{display:block;}' +
    '.wg-lang-menu.up{bottom:calc(100% + 8px);}' +
    '.wg-lang-menu.down{top:calc(100% + 8px);}' +
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
      /* 显示语言全称(简体中文 / Português),不再是 "中"/"EN" 这种缩写 ——
         缩写对非目标语言的用户等于没给信息。 */
      var name = btn.querySelector('.wg-lang-name');
      if (name) name.textContent = currentLang().name;
    }
    var items = box.querySelectorAll('.wg-lang-menu button');
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-current', items[i].getAttribute('data-lang') === lang ? 'true' : 'false');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Shared tool row — [🔊] [🏠] [🌐] 同排,挂在 .footer 的第一个子节点。   */
  /*                                                                     */
  /* 站点级按钮一律不进游戏画面。此前 18 个 canvas 游戏的静音键是绝对定位   */
  /* 压在画布上、返回键又由 renderHome() 自动堆在它正下方,右边缘两层浮层    */
  /* 盖住玩法区(BEST 分牌 → 🔊 → 🏠)。统一搬进这一行后,页面上再没有浮在    */
  /* 游戏上的按钮;4 个把静音键放在 topbar 的游戏也一并统一,不再例外。      */
  /*                                                                     */
  /* 权重:`.wg-tools #mute-btn` = (1,1,0) 压过各页自带的 #mute-btn(1,0,0)、  */
  /* `.face-btn,#mute-btn`(1,0,0)、`.icon-btn`(0,1,0);因此不需要 !important。 */
  /* `.wg-tools a.wg-home-btn` = (0,2,1) 压过各页 `.footer a`(0,1,1)。       */
  /* ------------------------------------------------------------------ */
  var TOOLS_CSS_ID = 'wg-tools-css';
  var TOOLS_CSS = '' +
    '.wg-tools{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin:0 0 10px;}' +
    /* 图标 + 文字并排:宽度随文案自适应,不再钉死 44×44 方块。
       min-width/min-height 保住 44px 触控目标(规格 11)。 */
    '.wg-tools #mute-btn,.wg-tools a.wg-home-btn{' +
      'position:static;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:7px;' +
      'width:auto;height:auto;min-width:44px;min-height:44px;padding:0 14px;margin:0;box-sizing:border-box;' +
      'border:none;border-radius:10px;background:rgba(255,255,255,.14);color:#fff;' +
      'font-family:inherit;font-size:13px;font-weight:600;line-height:1.1;letter-spacing:0;' +
      'white-space:nowrap;text-align:center;overflow:visible;' +
      'cursor:pointer;text-decoration:none;box-shadow:none;' +
      'transition:background .15s,transform .12s;}' +
    '.wg-tools #mute-btn:hover,.wg-tools a.wg-home-btn:hover{background:rgba(255,255,255,.26);}' +
    '.wg-tools #mute-btn:active,.wg-tools a.wg-home-btn:active{transform:scale(.94);}' +
    '.wg-tools .wg-ico{font-size:16px;font-weight:400;line-height:1;}' +
    '.wg-tools .wg-lang{flex:0 0 auto;}';

  function buildTools(doc) {
    var row = doc.querySelector('.wg-tools');
    if (row) return row;
    var footer = doc.querySelector('.footer');
    if (!footer) return null;            /* 无 footer 的页面:退回旧行为 */
    if (!doc.getElementById(TOOLS_CSS_ID)) {
      var st = doc.createElement('style');
      st.id = TOOLS_CSS_ID;
      st.appendChild(doc.createTextNode(TOOLS_CSS));
      (doc.head || doc.documentElement).appendChild(st);
    }
    row = doc.createElement('div');
    row.className = 'wg-tools';
    footer.insertBefore(row, footer.firstChild);
    return row;
  }

  /* 顺序固定 🔊 → 🏠 → 🌐。appendChild 会把已在行内的节点移到末尾,所以按序
     连续 append 即可;重复调用结果一致(幂等),也顺手把顺序纠正回来。 */
  function arrangeTools() {
    var doc = global.document;
    if (!doc || !doc.querySelector) return;
    var row = doc.querySelector('.wg-tools');
    if (!row) return;
    var seq = [doc.getElementById('mute-btn'),
               row.querySelector('.wg-home-btn'),
               row.querySelector('#wg-lang')];
    for (var i = 0; i < seq.length; i++) if (seq[i]) row.appendChild(seq[i]);
  }

  /* ------------------------------------------------------------------ */
  /* 静音键的文字标签 — 在 🔊/🔇 旁边补一枚"关闭声音 / 打开声音"          */
  /*                                                                     */
  /* 宿主页面自己持有 muted 状态,并且在每次点击时用一行                  */
  /*     muteBtn.textContent = muted ? '🔇' : '🔊';                       */
  /* 整体重写按钮内容 —— 我们塞进去的 <span> 会被这一行直接抹掉。          */
  /* 所以这里不跟宿主抢所有权,改成"写完再补":                            */
  /*   1. 用 MutationObserver 盯住按钮的子节点,宿主写完图标后立刻把标签    */
  /*      补回来(重建一次即稳定,不会来回打架);                            */
  /*   2. 静音状态从宿主刚写下的 emoji 反读,不依赖 muted 变量 —— 它在各页  */
  /*      IIFE 里,外部读不到。                                            */
  /* 结构约定: [span.wg-ico][span.wg-mute-lbl]                            */
  /* ------------------------------------------------------------------ */
  var MUTE_ATTR = 'data-wg-mute';
  var muteObserver = null;

  function muteIsOff(btn) {
    var txt = btn.textContent || '';
    if (txt.indexOf('🔇') >= 0) return true;
    if (txt.indexOf('🔊') >= 0) return false;
    if (btn.getAttribute(MUTE_ATTR) === '1') return true;
    return !!global.muted;   /* 图标万一被换掉,退而看页面全局状态 */
  }

  function paintMute(btn, off) {
    var ico = off ? '🔇' : '🔊';
    var lbl = t(off ? 'common.soundOn' : 'common.soundOff');
    var icoEl = btn.querySelector('.wg-ico');
    var lblEl = btn.querySelector('.wg-mute-lbl');
    if (!icoEl || !lblEl) {
      /* 宿主刚整体重写过按钮 → 结构没了,重建(先摘观察者,再挂回去) */
      if (muteObserver) muteObserver.disconnect();
      btn.innerHTML = '<span class="wg-ico" aria-hidden="true">' + ico + '</span>' +
                      '<span class="wg-mute-lbl">' + esc(lbl) + '</span>';
      if (muteObserver) muteObserver.observe(btn, { childList: true });
    } else {
      /* 结构完好 → 只动文字,不再碰 innerHTML(否则会自触发观察者) */
      if (icoEl.textContent !== ico) icoEl.textContent = ico;
      if (lblEl.textContent !== lbl) lblEl.textContent = lbl;
    }
    btn.setAttribute(MUTE_ATTR, off ? '1' : '0');
    btn.setAttribute('title', lbl);
    btn.setAttribute('aria-label', lbl);
  }

  function renderMute() {
    var doc = global.document;
    if (!doc || !doc.getElementById) return;
    var btn = doc.getElementById('mute-btn');
    if (!btn || !btn.querySelector) return;
    paintMute(btn, muteIsOff(btn));
  }

  function startMuteWatch() {
    var doc = global.document;
    var btn = doc && doc.getElementById && doc.getElementById('mute-btn');
    if (!btn || !global.MutationObserver) return;
    if (!muteObserver) {
      muteObserver = new global.MutationObserver(function () { renderMute(); });
    }
    /* 注意:把节点搬进工具行不会触发这里 —— 观察的是按钮的子节点,
       不是它的父节点。 */
    muteObserver.disconnect();
    muteObserver.observe(btn, { childList: true });
  }

  function buildSwitcher() {
    var doc = global.document;
    if (doc.getElementById('wg-lang')) return;

    /* mount point: [data-lang-switcher] if present, otherwise the shared
       tool row at the top of the footer (see buildTools) */
    var host = doc.querySelector('[data-lang-switcher]');
    if (!host) {
      host = buildTools(doc);
      if (!host) return;
    }

    injectCSS();

    var box = doc.createElement('span');
    box.className = 'wg-lang';
    box.id = 'wg-lang';

    var html = '<button type="button" class="wg-lang-btn" aria-haspopup="true" aria-expanded="false" ' +
      'aria-label="' + t('common.language').replace(/"/g, '&quot;') + '" ' +
      'title="' + t('common.language').replace(/"/g, '&quot;') + '">' +
      '<span class="wg-ico" aria-hidden="true">🌐</span>' +
      '<span class="wg-lang-name">' + currentLang().name + '</span></button>' +
      '<span class="wg-lang-menu" role="menu">';
    for (var i = 0; i < LANGS.length; i++) {
      html += '<button type="button" role="menuitem" data-lang="' + LANGS[i].code + '">' + LANGS[i].name + '</button>';
    }
    html += '</span>';
    box.innerHTML = html;

    host.appendChild(box);

    var trigger = box.querySelector('.wg-lang-btn');
    var menu = box.querySelector('.wg-lang-menu');

    /* ------------------------------------------------------------------ */
    /* Panel placement — pick the direction that actually fits             */
    /*                                                                     */
    /* A menu pinned to `bottom:100%` vanishes the moment the button sits   */
    /* near the top of the viewport: measure the room on both sides, open   */
    /* on the roomier one, and clamp max-height into that room so a short   */
    /* window scrolls the list instead of clipping it.                      */
    /* ------------------------------------------------------------------ */
    var GAP = 8;      /* button ↔ panel gap */
    var EDGE = 8;     /* keep this much away from every viewport edge */
    var MIN_H = 120;  /* never squeeze the panel below this (then it scrolls) */

    function placeMenu() {
      try {
        var vw = global.innerWidth || (doc.documentElement && doc.documentElement.clientWidth) || 1024;
        var vh = global.innerHeight || (doc.documentElement && doc.documentElement.clientHeight) || 768;
        if (!trigger.getBoundingClientRect) { menu.classList.add('open', 'down'); return; }
        var br = trigger.getBoundingClientRect();
        if (!br.height && !br.top && !br.bottom) { menu.classList.add('open', 'down'); return; }

        /* Reset last round's constraints first — a stale max-height would
           make every re-measure report a shorter panel than it really is. */
        menu.style.visibility = 'hidden';
        menu.style.maxHeight = 'none';
        menu.style.marginLeft = '';
        menu.classList.remove('up', 'down');
        menu.classList.add('open', 'down');
        var mh = menu.offsetHeight;

        var above = br.top - EDGE;
        var below = vh - br.bottom - EDGE;
        var dir;
        if (below >= mh + GAP) dir = 'down';
        else if (above >= mh + GAP) dir = 'up';
        else dir = below >= above ? 'down' : 'up';  /* fits nowhere: roomier side + scroll */
        menu.classList.toggle('down', dir === 'down');
        menu.classList.toggle('up', dir === 'up');

        var room = (dir === 'down' ? below : above) - GAP;
        if (room < mh) menu.style.maxHeight = Math.max(MIN_H, room) + 'px';

        /* The panel is centred on the button, so a button hugging either
           side of the screen pushes it out horizontally too. */
        var mr = menu.getBoundingClientRect();
        var dx = mr.left < EDGE ? EDGE - mr.left
          : mr.right > vw - EDGE ? (vw - EDGE) - mr.right : 0;
        if (dx) menu.style.marginLeft = Math.round(dx) + 'px';

        menu.style.visibility = '';
      } catch (e) {
        /* never let placement break the picker — fall back to opening down */
        menu.style.visibility = '';
        menu.classList.add('open', 'down');
      }
    }

    function openMenu() {
      placeMenu();
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    /* Scrolling or resizing changes the button's position relative to the
       viewport — recompute, so the panel never stays stranded outside it. */
    var reflowPending = false;
    function queueReflow() {
      if (reflowPending) return;
      reflowPending = true;
      var run = function () {
        reflowPending = false;
        if (menu.classList.contains('open')) placeMenu();
      };
      if (global.requestAnimationFrame) global.requestAnimationFrame(run);
      else global.setTimeout(run, 16);
    }
    if (global.addEventListener) {
      global.addEventListener('scroll', queueReflow, true);
      global.addEventListener('resize', queueReflow);
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenu(); else openMenu();
    });

    menu.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-lang]') : null;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      setLang(b.getAttribute('data-lang'));
      closeMenu();
    });

    doc.addEventListener('click', function () {
      if (menu.classList.contains('open')) closeMenu();
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    renderSwitcher();
  }

  /* ------------------------------------------------------------------ */
  /* Back-to-home button — only on pages opting in via <body data-wg-home>.
     落点:优先放进 buildTools() 建的 .wg-tools 工具行(与静音键、语言键同排,
     在 .footer 里,不压游戏画面)。只有当页面没有 .footer 时才退回旧策略:
       · 静音键是绝对/固定定位 → 同一边、堆叠在它正下方
       · 静音键是流式布局 → 插到它旁边
       · 都没有(或测试桩环境)→ fixed 左上角兜底
     退化路径里的 z-index:8 用于压过 block-drop 的 overlay(z7);
     进入工具行后不再需要抢层,该内联样式不会生效。                     */
  /* ------------------------------------------------------------------ */
  var HOME_CSS_ID = 'wg-home-css';
  var HOME_CSS = '' +
    /* 与工具行那两枚按钮同一套几何:图标 + 文字并排、宽度随文案自适应,
       min-height 44px 保住触控目标。无 .footer 的页面走这套退化样式时
       也带着文字,不再是孤零零一个方块。 */
    '.wg-home-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;' +
      'width:auto;min-width:44px;min-height:44px;padding:0 14px;border-radius:10px;' +
      'background:rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:600;line-height:1.1;' +
      'white-space:nowrap;text-align:center;text-decoration:none;cursor:pointer;z-index:8;box-sizing:border-box;' +
      'transition:background .15s;}' +
    '.wg-home-btn .wg-ico{font-size:16px;font-weight:400;line-height:1;}' +
    '.wg-home-btn:hover{background:rgba(255,255,255,.32);}' +
    '.wg-home-btn:active{transform:scale(.92);}';

  function homeHTML(shortLbl) {
    return '<span class="wg-ico" aria-hidden="true">🏠</span>' +
           '<span class="wg-home-lbl">' + esc(shortLbl) + '</span>';
  }

  function renderHome() {
    var doc = global.document;
    if (!doc || !doc.body || !doc.body.hasAttribute || !doc.body.hasAttribute('data-wg-home')) return;
    var lbl = t('common.backHome');   /* 完整说明 → title / aria-label */
    var short = t('common.home');     /* 键面短词 → 可见文字 */
    var existing = doc.querySelector('.wg-home-btn');
    if (existing) {   /* 语言切换后只刷新文案 */
      var span = existing.querySelector('.wg-home-lbl');
      if (span) span.textContent = short;
      else existing.innerHTML = homeHTML(short);
      existing.setAttribute('title', lbl);
      existing.setAttribute('aria-label', lbl);
      return;
    }
    if (!doc.getElementById(HOME_CSS_ID)) {
      var st = doc.createElement('style');
      st.id = HOME_CSS_ID;
      st.appendChild(doc.createTextNode(HOME_CSS));
      (doc.head || doc.documentElement).appendChild(st);
    }
    var a = doc.createElement('a');
    a.className = 'wg-home-btn';
    a.href = '../';
    a.innerHTML = homeHTML(short);
    a.setAttribute('title', lbl);
    a.setAttribute('aria-label', lbl);

    /* 统一落点:与静音键、语言键同排的工具行(不压游戏画面) */
    var row = doc.querySelector('.wg-tools');
    if (row) { row.appendChild(a); return; }

    var mute = doc.getElementById('mute-btn');
    var placed = false;
    if (mute && global.getComputedStyle) {
      try {
        var cs = global.getComputedStyle(mute);
        if (cs.position === 'absolute' || cs.position === 'fixed') {
          /* 用 offset* 量真实布局(比读 computed top/right 可靠),同边堆叠 */
          var parent = mute.offsetParent;
          if (parent) {
            var pw = parent.clientWidth;
            a.style.position = 'absolute';
            a.style.top = (mute.offsetTop + mute.offsetHeight + 8) + 'px';
            if (mute.offsetLeft + mute.offsetWidth / 2 > pw / 2) {
              a.style.right = Math.max(0, pw - mute.offsetLeft - mute.offsetWidth) + 'px';
            } else {
              a.style.left = mute.offsetLeft + 'px';
            }
            mute.parentNode.insertBefore(a, mute.nextSibling);
            placed = true;
          }
        } else {
          mute.parentNode.insertBefore(a, mute);
          placed = true;
        }
      } catch (e) { /* 测试桩环境:走兜底 */ }
    }
    if (!placed) {
      a.style.position = 'fixed';
      a.style.top = '12px';
      a.style.left = '12px';
      doc.body.appendChild(a);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    apply();
    buildSwitcher();
    renderHome();
    arrangeTools();   /* 静音键搬进工具行 + 拍定 🔊 → 🏠 → 🌐 顺序 */
    renderMute();     /* 图标旁补上"关闭声音 / 打开声音" */
    startMuteWatch(); /* 宿主下次整体重写按钮内容时,自动把标签补回来 */
    /* keep other tabs of the same site in sync */
    if (global.addEventListener) {
      global.addEventListener('storage', function (e) {
        if (e.key === STORE_KEY && e.newValue && normalize(e.newValue) && normalize(e.newValue) !== lang) {
          lang = normalize(e.newValue);
          apply();
          renderSwitcher();
          renderHome();
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
