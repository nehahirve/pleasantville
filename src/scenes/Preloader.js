import Phaser from 'phaser'

import background from '../assets/background-title.png'
import endScene from '../assets/endscene.png'
import endSceneWithPostcard from '../assets/endscene-postcard.png'
import postcard from '../assets/postcard.png'
import gameOver from '../assets/gameover.png'
import sky from '../assets/sky.png'
import sun from '../assets/sun.png'
import clouds from '../assets/clouds.png'
import backTrees from '../assets/back-trees.png'
import frontTrees from '../assets/front-trees.png'
import midground from '../assets/midground.png'
import foreground from '../assets/foreground.png'
import ground from '../assets/ground.png'
import backfence from '../assets/backfence.png'
import player from '../assets/car.png'
import enemyCar from '../assets/enemycars.png'
import policeCar from '../assets/police.png'
import raven from '../assets/raven.png'
import fire from '../assets/fire.png'
import mediumSign from '../assets/sign-medium.png'
import lastSign from '../assets/sign-last.png'
import mile100 from '../assets/mile-100.png'
import clock from '../assets/clock.png'
// import keyboard from '../assets/sfx/keyboard.mp3'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // scene backgrounds
    this.load.image('background', background)
    this.load.image('gameOver', gameOver)

    this.load.image('endSceneWithPostcard', endSceneWithPostcard)
    this.load.image('postcard', postcard)
    // parallax background
    this.load.image('sky', sky)
    this.load.image('sun', sun)
    this.load.image('clouds', clouds)
    this.load.image('backTrees', backTrees)
    this.load.image('frontTrees', frontTrees)
    this.load.image('midground', midground)
    this.load.image('foreground', foreground)
    this.load.image('lastSign', lastSign)
    this.load.image('mile100', mile100)
    this.load.image('clock', clock)
    //road
    this.load.image('ground', ground)
    this.load.image('backfence', backfence)

    //sprites
    this.load.spritesheet('player', player, {
      frameWidth: 89,
      frameHeight: 32
    })
    this.load.spritesheet('policeCar', policeCar, {
      frameWidth: 79,
      frameHeight: 32
    })
    this.load.spritesheet('enemyCar', enemyCar, {
      frameWidth: 79,
      frameHeight: 32
    })
    this.load.spritesheet('raven', raven, {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.spritesheet('mediumSign', mediumSign, {
      frameWidth: 128,
      frameHeight: 256
    })
    this.load.spritesheet('fire', fire, {
      frameWidth: 32,
      frameHeight: 90
    })
    this.load.spritesheet('endScene', endScene, {
      frameWidth: 1024,
      frameHeight: 512
    })
    this.load.audio('keyboard', ['src/assets/sfx/keyboard.mp3'])
    this.load.audio('music', ['src/assets/sfx/music.mp3'])

    this.graphics = this.add.graphics()
    this.newGraphics = this.add.graphics()
    this.progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50)
    this.progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40)

    this.graphics.fillStyle(0xffffff, 1)
    this.graphics.fillRectShape(this.progressBar)

    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(this.progressBarFill)

    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics
    })
    this.load.on('complete', this.complete, { scene: this.scene })
  }

  updateBar(percentage) {
    this.newGraphics.clear()
    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40)
    )
    percentage = percentage * 100
  }

  complete() {
    this.scene.start('game')
  }
}
