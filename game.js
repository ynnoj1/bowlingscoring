module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.roll = function roll(noOfPins) {
      this.match = [...this.match, noOfPins];
    };
  },
};
