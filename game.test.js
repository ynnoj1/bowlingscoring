const { Game } = require('./game');

//test function is a part of the jest library and is automatically added to .test.js files

test('roll adds value to bowlingGame.match array', () => {
  // Prepare a spy for the Game.roll method
  const noOfPins = 0;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'roll');
  bowlingGame.roll(noOfPins);
  const result = bowlingGame.match.at(-1);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(noOfPins);
  spy.mockRestore();
});

test('validRollAmount will be false when noOfPins =11', () => {
  // Prepare a spy for the Game.roll method
  const noOfPins = 11;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validRollAmount will be false when noOfPins =-1', () => {
  // Prepare a spy for the Game.roll method
  const noOfPins = -1;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validRollAmount will be true when noOfPins =1', () => {
  // Prepare a spy for the Game.roll method
  const noOfPins = 1;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});
