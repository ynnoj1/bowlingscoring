module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.frame = 1;
    this.attempt = 1;
    this.roll = function roll(noOfPins) {
      if (!this.validRollAmount(noOfPins) || !this.validFrameAmount(noOfPins)) {
        return;
      }
      this.match = [...this.match, noOfPins];
      this.moveFrame();
    };
    this.validRollAmount = function validRollAmount(noOfPins) {
      let validRollAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return validRollAmounts.includes(noOfPins) ? true : false;
    };
    this.validFrameAmount = function validFrameAmount(noOfPins) {
      if (this.match.length < 1 || this.attempt == 1) {
        //no need to check the frame amount on the first roll or attempt
        return true;
      }
      const lastRoll = this.match.at(-1);
      const remainingPins = 10 - lastRoll - noOfPins;
      return remainingPins < 0 ? false : true;
    };
    this.moveFrame = function moveFrame() {
      if (this.attempt == 2) {
        this.frame++;
        this.attempt = 1;
      } else {
        this.attempt++;
      }
    };
    this.strike = function strike(noOfPins) {
      return noOfPins == 10 && this.attempt == 1 ? true : false;
    };
    //TODO spare
  },
};
