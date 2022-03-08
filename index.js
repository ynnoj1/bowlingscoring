const { Game } = require('./game');

const bowlingGame = new Game('Player Name');
bowllingGame.roll(4);
bowlingGame.rollMany(1, 2, 3);
bowlingGame.score();
bowlingGame.scoreboard();
