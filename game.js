module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.roll = function roll(noOfPins) {
      this.match = [...this.match, noOfPins];
    };
    this.validRollAmount = function validRollAmount(noOfPins) {
      let validRollAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return validRollAmounts.includes(noOfPins) ? true : false;
    };
  },
};
