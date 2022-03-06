module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.frame = 1;
    this.attempt = 1;
    this.score = 0;
    this.roll = function roll(noOfPins) {
      if (!this.validRollAmount(noOfPins) || !this.validFrameAmount(noOfPins)) {
        return;
      }
      this.match = [...this.match, noOfPins];
      this.moveFrame();
      if (this.strike(noOfPins)) {
        //reset the attempt after a strike
        this.attempt = 1;
      }
      this.updateScore();
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
      const remainingPins = this.remainingPins(noOfPins);
      return remainingPins < 0 ? false : true;
    };
    this.moveFrame = function moveFrame() {
      if (this.attempt == 2) {
        this.frame++;
        this.attempt = 1;
        this.updateScore();
      } else {
        this.attempt++;
      }
    };
    this.strike = function strike(noOfPins) {
      return noOfPins == 10 && this.attempt == 1 ? true : false;
    };
    this.spare = function spare(noOfPins) {
      const remainingPins = this.remainingPins(noOfPins);
      return remainingPins == 0 && this.attempt == 2 ? true : false;
    };
    this.remainingPins = function remainingPins(noOfPins) {
      const lastRoll = this.match.at(-1);
      const remainingPins = 10 - lastRoll - noOfPins;
      return remainingPins;
    };
    this.updateScore = function updateScore() {
      //account for simple games
      const matchSum = this.match.reduce((a, b) => a + b, 0);
      this.score = matchSum;
    };
  },
};
