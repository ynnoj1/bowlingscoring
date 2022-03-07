module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.frame = 1;
    this.frameHistory = [];
    this.attempt = 1;
    this.score = 0;
    this.trick = [];
    this.trickResult = [];
    this.roll = function roll(noOfPins) {
      const remainingPins = this.remainingPins(noOfPins);
      if (!this.validFrameAmount(remainingPins)) {
        console.log(`${noOfPins} exceeeds frame limit`);
        return;
      }
      this.trick = [...this.trick, this.returnTrick(noOfPins, remainingPins)];
      this.match = [...this.match, noOfPins]; //store the number of pins rolled
      this.frameHistory = [...this.frameHistory, this.frame]; // store the current frame
      if (!this.validRollAmount(noOfPins)) {
        console.warn(`${noOfPins} is not a valid noOfPins`);
        return;
      }
      this.moveFrame(noOfPins);
      this.updateScore();
    };
    this.validRollAmount = function validRollAmount(noOfPins) {
      let validRollAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return validRollAmounts.includes(noOfPins) ? true : false;
    };
    this.validFrameAmount = function validFrameAmount(remainingPins) {
      if (this.attempt == 1) {
        //no need to check the frame amount on the first roll or attempt
        return true;
      }
      return remainingPins < 0 ? false : true;
    };
    this.moveFrame = function moveFrame(noOfPins) {
      if (this.attempt == 2) {
        //we are at the end of the frame
        this.frame++;
        this.attempt = 1;
        this.updateScore();
      } else if (this.strike(noOfPins)) {
        this.attempt = 1;
        this.frame++;
      } else {
        this.attempt++;
      }
    };
    this.strike = function strike(noOfPins) {
      return noOfPins == 10 && this.attempt == 1 ? true : false;
    };
    this.spare = function spare(remainingPins) {
      return remainingPins == 0 && this.attempt == 2 ? true : false;
    };
    this.remainingPins = function remainingPins(noOfPins) {
      //must be called before the number of pins is added to match
      if (this.match.length < 1 || this.strike(noOfPins)) {
        return 10;
      }
      const lastRoll = this.match.at(-1);
      const remainingPins = 10 - lastRoll - noOfPins;
      return remainingPins;
    };
    this.updateScore = function updateScore() {
      //account for simple games
      const matchSum = this.match.reduce((a, b) => a + b, 0);
      this.score = matchSum;
    };
    this.returnTrick = function returnTrick(noOfPins, remainingPins) {
      if (this.strike(noOfPins)) {
        return 'X';
      } else if (this.spare(remainingPins)) {
        return '/';
      } else {
        return '0';
      }
    };
  },
};
