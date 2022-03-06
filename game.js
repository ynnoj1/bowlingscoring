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
    };
    this.validRollAmount = function validRollAmount(noOfPins) {
      let validRollAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return validRollAmounts.includes(noOfPins) ? true : false;
    };
    this.validFrameAmount = function validFrameAmount(noOfPins) {
      this.rollcount;
      if (this.match.length < 1) {
        //no need to check the frame amount on the first roll
        return true;
      }
      //TODO add way to figure out the frame and values in frame
      //TODO calculate sum of frame
    };
    this.moveFrame = function moveFrame() {
      if (this.attempt == 2) {
        this.frame++;
        this.attempt = 1;
      } else {
        this.attempt++;
      }
    };
  },
};
