# Escape from Pleasantville - level 6

Level 6 is part of 'Escape from Pleasantville', a group coding project in which myself and five other teammates each created a level that makes up an entire game. This was created as part of Hyper Island's exploring code module, wherein we were encouraged to experiment with new technologies and think about aspects of the web experience that weren't necessarily related to code.

Escape from Pleasantville is a story of the missing Alex, told through a series of postcards. You're on a mission to find out just what happened to them, and the trail has led you to a bizarre little town called Pleasantville.

Now, at the end of your journey, you can't wait to get out and get home...

This project was built from a Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

## Play the live version here

[Game start: ](https://escapefromhyperisland.github.io/pleasantville)
[This level: ](https://escapefromhyperisland.github.io/pleasantville/level-6)
[Escape from Hyper Island: ](https://escapefromhyperisland.github.io)

## Or run locally

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

**New things I worked with:**

- Game design and storytelling
- Pixel art - discovered a new obsession!
- Phaser framework and Classes

**Challenges:**

1. The code could use a lot of refactoring; I found the Phaser 3 docs to be rather beginner unfriendly and ended up hacking together a lot of solutions that I didn't know how to do the way they were intended. There are several methods and classes that could be reorganised and cleaned up.

2. The build script manually loads the fontfile in currently, as I couldn't get the right loader to work in webpack for .otf files.

**Tools and Tech stack:**

[Phaser:](https://phaser.io/) “Desktop and mobile HTML5 game framework.”

[Aseprite:](https://www.aseprite.org/) "Animated sprite editor and pixel art tool."

**Links to the other levels in the Pleasantville universe:**

- [Level 1 - Sofia Darke](https://github.com/sofiadarkeweb/pleasantville)
- [Level 2 - Agnes Kalström](https://github.com/agneskalstrom/level-2-the-dream)
- [Level 3 - Elin Amrén](https://github.com/elinamren/pleasantville-level3)
- [Level 4 - Emilia Frisell](https://github.com/emiliafrisell/MazeGame)
- [Level 5 - Anna Roos](https://github.com/AnnaRoos/the-medium-aframe)
