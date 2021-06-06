import Phaser from 'phaser'

import background from '../assets/background-title.png'
import endScene from '../assets/endscene.png'
import endSceneWithPostcard from '../assets/endscene-postcard.png'
import gameOver from '../assets/gameover.png'

import heart from '../assets/heart.png'
import postcard from '../assets/postcard.png'
import clock from '../assets/clock.png'
import pressEnter from '../assets/press-enter.png'

import sky from '../assets/sky.png'
import skyEnd from '../assets/sky-end.png'
import sun from '../assets/sun.png'
import clouds from '../assets/clouds.png'
import cloudsEnd from '../assets/clouds-end.png'
import backTrees from '../assets/back-trees.png'
import frontTrees from '../assets/front-trees.png'
import midground from '../assets/midground.png'
import foreground from '../assets/foreground.png'
import ground from '../assets/ground.png'
import backfence from '../assets/backfence.png'
import mediumSign from '../assets/sign-medium.png'
import lastSign from '../assets/sign-last.png'

import player from '../assets/car.png'
import enemyCar from '../assets/enemycars.png'
import policeCar from '../assets/police.png'
import raven from '../assets/raven.png'
import fire from '../assets/fire.png'

import mile10 from '../assets/miles/10.png'
import mile20 from '../assets/miles/20.png'
import mile30 from '../assets/miles/30.png'
import mile40 from '../assets/miles/40.png'
import mile50 from '../assets/miles/50.png'
import mile60 from '../assets/miles/60.png'
import mile70 from '../assets/miles/70.png'
import mile80 from '../assets/miles/80.png'
import mile90 from '../assets/miles/90.png'

import keyboard from '../assets/sfx/keyboard.mp3'
import music from '../assets/sfx/music.wav'
import crash from '../assets/sfx/crash.wav'
import timer from '../assets/sfx/timer.wav'
import siren from '../assets/sfx/siren.wav'
import bump from '../assets/sfx/bump.wav'

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
    this.load.image('skyEnd', skyEnd)
    this.load.image('sun', sun)
    this.load.image('clouds', clouds)
    this.load.image('cloudsEnd', cloudsEnd)
    this.load.image('backTrees', backTrees)
    this.load.image('frontTrees', frontTrees)
    this.load.image('midground', midground)
    this.load.image('foreground', foreground)
    this.load.image('clock', clock)
    this.load.image('heart', heart)
    //road
    this.load.image('ground', ground)
    this.load.image('backfence', backfence)
    this.load.image('pressEnter', pressEnter)
    this.load.image('mile10', mile10)
    this.load.image('mile20', mile20)
    this.load.image('mile30', mile30)
    this.load.image('mile40', mile40)
    this.load.image('mile50', mile50)
    this.load.image('mile60', mile60)
    this.load.image('mile70', mile70)
    this.load.image('mile80', mile80)
    this.load.image('mile90', mile90)

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
    this.load.spritesheet('lastSign', lastSign, {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.audio('keyboard', keyboard)
    this.load.audio('music', music)
    this.load.audio('crash', crash)
    this.load.audio('timer', timer)
    this.load.audio('siren', siren)
    this.load.audio('bump', bump)

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
