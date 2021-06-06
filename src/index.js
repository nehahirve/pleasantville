import Phaser from 'phaser'

import Title from './scenes/Title'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import End from './scenes/EndScene'

const config = {
  type: Phaser.AUTO,
  scale: {
    _mode: Phaser.Scale.FIT,
    parent: 'container',
    width: 1024,
    height: 512
  },
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [Preloader, Title, Game, GameOver, End]
}
export default new Phaser.Game(config)
