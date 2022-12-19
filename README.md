# Description

The application is a simulator of elevators system control.
There are 16 elevators which could process till three target floors.

## Installation

Install the [Node.js](https://nodejs.org/en/download/). The Node Package Manager is needed also and it comes bundled with node. Next clone the repo and type:

```js
npm install
```
in order to download all dependencies needed.

## Usage
To start the app, type:

```js
npm start
```
in your terminal (Git Bash, IDE terminal, etc).

There is a table with the following lines and columns:
- Current floor of the elevator
- Target floors (1,2,3) related to amount of passengers
- Amount passengers provide a number of target floors needed
- E1 - E16 - indexes of elevators

In order to run elevator **choose amount of passengers**, then **select target floors** and run **"Simulate step"** to simulate one step of elevators moving.

![screen](screen.jpg)

If the elevator moves it colorized by *blue*, when it reaches one of several target floors it change color to *yellow*, reaching the last floor the color changes to *green* and with the next step the elevator becomes inactive. The current elevator floor is saved.

Each elevator define the nearest target floor to order all target floors. The prioritization of targets performs after the first step simulation and repeats after reaching each of the target floors.

## License

[MIT](https://choosealicense.com/licenses/mit/)