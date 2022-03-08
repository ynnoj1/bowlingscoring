module.exports = {
  Game: function Game(player = 'Player1') {
    this.player = player;
    this.match = [];
    this.frame = 1;
    this.attempt = 1;
    this.currentscore = 0;
    this.trick = []; //a strike or spare will be considered a trick shot
    this.trickResult = [];
    this.frameLog = [];
    this.attemptLog = [];
    this.remainingRollLog = [];
    this.finalFrameTrick = 0;
    this.remainingRolls = 20;
    this.gameEnded = 0;
    this.score = function score() {
      console.log(this.currentscore);
    };
    this.roll = function roll(noOfPins) {
      //Check that the roll is valid or if the game should have ended
      const remainingPins = this.remainingPins(noOfPins);

      if (!this.validRollAmount(noOfPins)) {
        console.warn(`${noOfPins} is not a valid noOfPins`);
        return;
      }
      if (!this.validFrameAmount(remainingPins)) {
        console.log(
          `${noOfPins} exceeeds the total amount of pins in a single frame`
        );
        return;
      }
      if (this.gameEnded == 1) {
        console.log(`Game completed. Your score is ${this.currentscore}`);
        return;
      }

      //Store values for, and at the time of the roll
      this.storeTrick(noOfPins, remainingPins);
      this.match = [...this.match, noOfPins]; //store the number of pins rolled
      this.frameLog = [...this.frameLog, this.frame]; // store the current frame
      this.attemptLog = [...this.attemptLog, this.attempt];
      this.remainingRollLog = [...this.remainingRollLog, this.remainingRolls];

      //check whether to move frames and if there is a trick in the final frame

      this.updateScore(noOfPins, remainingPins);
      if (this.frame == 10) {
        this.updateFinalFrame();
      } else {
        this.updateTurn(noOfPins);
      }
      if (this.remainingRolls == 0) {
        this.endGame();
      }
    };
    this.validRollAmount = function validRollAmount(noOfPins) {
      let validRollAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return validRollAmounts.includes(noOfPins) ? true : false;
    };
    this.validFrameAmount = function validFrameAmount(remainingPins) {
      if (this.frame == 10) {
        //no need to check the frame amount on the first roll or on the third roll in last frame
        return true;
      }
      return remainingPins < 0 ? false : true;
    };
    this.updateTurn = function updateTurn(noOfPins) {
      if (this.attempt == 2) {
        //we are at the end of the frame, move frame, reset attempt, reduce roll
        this.remainingRolls -= 1;
        this.attempt = 1;
        this.frame++;
      } else if (this.strike(noOfPins)) {
        //we on the first attempt with a strike, move frame, reset attempt, maxroll by -2 (we will miss the second shot in the frame)
        this.remainingRolls -= 2;
        this.attempt = 1;
        this.frame++;
      } else {
        //otherwise, on the first attempt
        this.remainingRolls -= 1;
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
      if (this.attempt != 2) {
        return 10;
      }
      //the remainingPins =  10 if the first throw in final frame was a strike
      const lastRoll = this.match.at(-1);
      if (this.frame == 10 && lastRoll == 'X') {
        return 10;
      }

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
      this.currentscore = matchSum + totalTricks;
    };
    this.storeTrick = function storeTrick(noOfPins, remainingPins) {
      if (this.strike(noOfPins)) {
        this.trick = [...this.trick, 'X'];
      } else if (this.spare(remainingPins)) {
        this.trick = [...this.trick, '/'];
      } else {
        this.trick = [...this.trick, noOfPins];
      }
    };
    this.trickInFinalFrame = function trickInFinalFrame() {
      //applies an extra roll if there is a trick in the final frame
      if (this.attempt > 1) {
        //we will know if a spare has occured on the second attepmt
        const strikeFinalFrame = this.trick.at(-1) == 'X';
        const spareFinalFrame = this.trick.at(-1) == '/';
        if (strikeFinalFrame || spareFinalFrame) {
          this.remainingRolls = this.remainingRolls + 1;
        }
      }
    };
    this.endGame = function endGame() {
      console.log(`Game completed. Your score is ${this.currentscore}`);
      this.gameEnded = 1;
    };
    this.updateFinalFrame = function updateFinalFrame() {
      //in all cases we will decrease the maxRoll and increase the attempt by 1
      this.remainingRolls = this.remainingRolls - 1;
      this.attempt = this.attempt + 1;
      this.trickInFinalFrame();
    };
  },
};
