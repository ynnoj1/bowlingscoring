# A bowling scoring system

## Description

A bowling scoring program created for the DiUS bowling club using Javascript and Node.js

## Installation

Install the project dependencies using `yarn install` or `npm install`

## Usage

Open the project directory using your preferred command line tool<br>

Run the program by entering `yarn run start` or `npm run start` in the console<br>

Run the tests created for the program by entering `yarn run test` or `npm run test` in the console<br>

## Play the game

Enter the following functions in the index.js file interact with the game: <br>

### Initialise the game

Initialise the game by defining a variable and providing the Game object with the player name<br>
`const bowlingGame = new Game('Name of player')` <br>
For example:<br>
`const bowlingGame = new Game('Jonny')`
<br>

### Roll a ball

Roll a ball by entering the provding the roll function with the number of you have rolled (noOfPins)<br>
`bowllingGame.roll(noOfPins)` <br>
For example:<br>
`bowllingGame.roll(4)`<br>

You can roll many balls at once by providing the number of pins for each roll separated by a comma<br>
`bowllingGame.roll(noOfPins,noOfPins,noOfPins)`<br>
For example:<br>
`bowlingGame.rollMany(1, 2, 10)`<br>

### Check the score

Get the score of your game by calling the score() method on the bowlingGame object<br>
`bowlingGame.score();`<br>
You can also view the score and other information about your game by calling the scoreboard() method on the bowlingGame object<br>
`bowlingGame.scoreboard();`<br>
