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

test('roll of 10 will increase frame by 1', () => {
  const bowlingGame = new Game();
  const initialframe = bowlingGame.frame;
  const spy = jest.spyOn(bowlingGame, 'roll');
  bowlingGame.roll(10);
  const afterframe = bowlingGame.frame;
  const result = afterframe - initialframe;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(1);
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

test('validFrameAmount will return false if passed remaining pins of -1 ', () => {
  const bowlingGame = new Game();
  bowlingGame.attempt = 2;

  const spy = jest.spyOn(bowlingGame, 'validFrameAmount');
  const result = bowlingGame.validFrameAmount(-1);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('validFrameAmount will return true if passed remaining pins of 0 ', () => {
  const bowlingGame = new Game();
  bowlingGame.attempt = 2;
  const spy = jest.spyOn(bowlingGame, 'validFrameAmount');
  const result = bowlingGame.validFrameAmount(0);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});
test('validFrameAmount will return true if passed remaining pins of 10 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'validFrameAmount');
  const result = bowlingGame.validFrameAmount(10);
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

test('strike will cause attempt to be 1 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'strike');
  bowlingGame.strike(10);
  const result = bowlingGame.attempt;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(1);
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

test('remainingPins will be 10 when 0,0 rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'remainingPins');
  bowlingGame.roll(0);
  const result = bowlingGame.remainingPins(0);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(10);
  spy.mockRestore();
});

test('remainingPins will be -1 when 2,9 rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'remainingPins');
  bowlingGame.roll(2);
  const result = bowlingGame.remainingPins(9);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(-1);
  spy.mockRestore();
});

test('remainingPins will be 10 when 10 rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'remainingPins');
  const result = bowlingGame.remainingPins(10);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(10);
  spy.mockRestore();
});

test('spare will be false when remainingPins=5 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'spare');
  bowlingGame.roll(1);
  const result = bowlingGame.spare(10);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('spare will be true when passed remainingPins =0', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'spare');
  bowlingGame.roll(1);
  const result = bowlingGame.spare(0);
  ~expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
  spy.mockRestore();
});

test('spare will be false when remainingPins=10 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'spare');
  bowlingGame.roll(1);
  const result = bowlingGame.spare(10);

  expect(spy).toHaveBeenCalled();
  expect(result).toBe(false);
  spy.mockRestore();
});

test('updateScore will make score 20 when 20 ones are rolled ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'updateScore');
  for (let i = 0; i < 20; i++) {
    bowlingGame.roll(1);
  }
  const result = bowlingGame.score;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(20);
  spy.mockRestore();
});

// test('updateScore will make score 20 for 10,5,0 ', () => {
//   const bowlingGame = new Game();
//   const spy = jest.spyOn(bowlingGame, 'updateScore');
//   bowlingGame.roll(10);
//   bowlingGame.roll(5);
//   bowlingGame.roll(0);
//   const result = bowlingGame.score;
//   expect(spy).toHaveBeenCalled();
//   expect(result).toBe(20);
//   spy.mockRestore();
// });

test('updateScore will make score 20 for 5,5,5 ', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'updateScore');
  bowlingGame.roll(5);
  bowlingGame.roll(5);
  bowlingGame.roll(5);
  const result = bowlingGame.score;
  expect(spy).toHaveBeenCalled();
  expect(result).toBe(20);
  spy.mockRestore();
});

test('returnTrick will store X for strike, noOfPins=10 remaininPins=10', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'returnTrick');
  const result = bowlingGame.returnTrick(10, 10);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe('X');
  spy.mockRestore();
});

test('returnTrick will store / for spare of 1,9, noOfPins=9 remainingPins=0', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'returnTrick');
  bowlingGame.roll(1);
  const result = bowlingGame.returnTrick(9, 0);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe('/');
  spy.mockRestore();
});

test('returnTrick will store 0 for frame of 1,8', () => {
  const bowlingGame = new Game();
  const spy = jest.spyOn(bowlingGame, 'returnTrick');
  bowlingGame.roll(1);
  const result = bowlingGame.returnTrick(2, 8);
  expect(spy).toHaveBeenCalled();
  expect(result).toBe('0');
  spy.mockRestore();
});
