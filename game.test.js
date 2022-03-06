const { Game } = require('./game');

//test function is a part of the jest library and is automatically added to .test.js files

test('roll adds value to bowlingGame.match array', () => {
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
  const noOfPins = 11;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validRollAmount will be false when noOfPins =-1', () => {
  const noOfPins = -1;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validRollAmount will be true when noOfPins =1', () => {
  const noOfPins = 1;
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validRollAmount');
  const result = bowlingGame.validRollAmount(noOfPins);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});

test('validFrameAmount will return false if 2,9 rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validFrameAmount');
  bowlingGame.roll(2);
  const result = bowlingGame.validFrameAmount(9);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validFrameAmount will return true if 1, 2,9 rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validFrameAmount');
  bowlingGame.roll(1);
  bowlingGame.roll(2);
  const result = bowlingGame.validFrameAmount(9);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});

//TODO test move frame
test('moveFrame cause attempt to become 2 if current attempt is 1 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'moveFrame');
  bowlingGame.attempt = 1;
  bowlingGame.moveFrame();
  const result = bowlingGame.attempt;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(2);
  spy.mockRestore();
});

test('moveFrame cause attempt to become 1 if current attempt is 2 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'moveFrame');
  bowlingGame.attempt = 2;
  bowlingGame.moveFrame();
  const result = bowlingGame.attempt;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(1);
  spy.mockRestore();
});

test('strike will be true if 10 is rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'strike');
  const result = bowlingGame.strike(10);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});

test('strike will be false if 8 is rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'strike');
  const result = bowlingGame.strike(8);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});
