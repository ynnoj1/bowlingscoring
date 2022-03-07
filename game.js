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
      //Check that the roll is valid
      if (!this.validRollAmount(noOfPins)) {
        console.warn(`${noOfPins} is not a valid noOfPins`);
        return;
      }
      const remainingPins = this.remainingPins(noOfPins);
      if (!this.validFrameAmount(remainingPins)) {
        console.log(`${noOfPins} exceeeds frame limit`);
        return;
      }
      //Store values for, and at the time of the roll
      this.storeTrick(noOfPins, remainingPins);
      this.match = [...this.match, noOfPins]; //store the number of pins rolled
      this.frameHistory = [...this.frameHistory, this.frame]; // store the current frame
      //check whether
      this.moveFrame(noOfPins);
      this.updateScore(noOfPins, remainingPins);
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
      if (this.match.length < 1 || this.strike(noOfPins)) {
        return 10;
      }
      const lastRoll = this.match.at(-1);
      const remainingPins = 10 - lastRoll - noOfPins;
      return remainingPins;
    };
    this.updateScore = function updateScore(noOfPins, remainingPins) {
      //account for simple games
      const matchSum = this.match.reduce((a, b) => a + b, 0);
      //account for strike
      if (this.trick.at(-4) == 'X') {
        const strikeValue = this.match.at(-3) + this.match.at(-2);
        this.trickResult = [...this.trickResult, strikeValue];
      } else if (this.trick.at(-2) == '/') {
        //account for spare
        const spareValue = this.match.at(-1);
        this.trickResult = [...this.trickResult, spareValue];
      }
      //account for spare
      const totalTricks = this.trickResult.reduce((a, b) => a + b, 0);
      this.score = matchSum + totalTricks;
    };
    this.storeTrick = function storeTrick(noOfPins, remainingPins) {
      if (this.strike(noOfPins)) {
        this.trick = [...this.trick, 'X'];
      } else if (this.spare(remainingPins)) {
        this.trick = [...this.trick, '/'];
      } else {
        this.trick = [...this.trick, 0];
      }
    };
  },
};
