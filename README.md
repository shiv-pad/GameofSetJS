# gameofsetJS-team8

## Overview

Game of Sets is an interactive web-based card game inspired by the popular pattern recognition game, Set. The goal is to find sets of three cards from a grid of cards laid out on the screen, each card with unique attributes such as shape, color, number, and shading. The game supports multiple players and provides a fun, engaging way to practice logic and observation skills.

## Rules of the Game

The objective of the game is to find a "set" of three cards.

A deck consists of 81 unique cards, each card having four attributes:

    Shape: Oval, Squiggle, Diamond

    Color: Red, Green, Blue

    Number of Shapes: One, Two, Three

    Shading: Solid, Stripped, Open

A valid set consists of three cards where, for each attribute, the cards are either all the same or all different.


## Examples of a Set

Three cards with different shapes but same color, shading, and number of shapes.

Three cards with same shading but different shapes, colors, and numbers of shapes.

## Game Features

Multiple Players: Supports up to 6 players. Players can take turns to find sets, with scores being tracked throughout the game.

Timer: A timer is displayed to add an element of time pressure to the game.

Score Display: Player scores are displayed on-screen to keep track of progress.

Interactive Interface: The game interface provides buttons to start and finish games, confirm selections, and show status messages for player turns.

## How to Play

1. Setup: Open the game in your browser. The main screen will allow you to select the number of players (from 1 to 6).

2. Start Game: Click the "Start Game" button to begin.

3. Select Cards: Click on cards to select them. Once you have selected three cards, click the "Confirm Selection" button to see if your selection forms a valid set.

## Hint Option!
If you are looking for a set and can't find one you can inspect the webpage and navigate to console it will give you the indices of the cards that make a set. 

4. Turn-Based Play: When playing with multiple players, each player gets their turn to find a set. The timer will countdown to signal when the current player's time is up.

5. End Game: The game ends when all valid sets have been found or when players decide to end the game using the "Finish Game" button.

## Installation and Setup

Prerequisites

    A modern web browser (Google Chrome, Firefox, Safari, etc.)

## Running the Game

Clone or download the repository.

Ensure all the necessary files are available in the directory, including:

    index.html or gameofsetjs.html

    styles.css

    JavaScript files: display.js, main.js, player_creator.js, set_handler.js, set.js, timer.js

Open gameofsetjs.html in your browser.

## File Structure

    gameofsetjs.html: The HTML file that contains the structure of the game.

    styles.css: Defines the styling for all elements in the game to make it visually appealing.

    main.js: The main JavaScript file responsible for handling the game logic and interactions.

    player_creator.js: Manages player creation and player-specific operations.

    timer.js: Controls the countdown timer for each player's turn.

## Gameplay Tips

Look for cards that share one attribute and try to find combinations that either share or completely differ in other attributes.

Keep an eye on the timer; it adds pressure but also excitement to the game.

## Technologies Used

HTML5: For structuring the game interface.

CSS3: For styling the game elements and making the game visually appealing.

JavaScript: For game logic, user interaction, and handling game state.

