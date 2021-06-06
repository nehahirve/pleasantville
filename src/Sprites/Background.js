import Phaser from 'phaser'

export default class Background {
  constructor(scene) {
    const { width, height } = scene.game.config
    this.sky = scene.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.skyEnd = scene.add.image(0, 0, 'skyEnd').setOrigin(0, 0).setAlpha(0)
    this.sun = scene.add.image(width / 2, 100, 'sun')

    this.clouds = scene.add
      .tileSprite(0, 0, width, height, 'clouds')
      .setOrigin(0, 0)
    this.cloudsEnd = scene.add
      .tileSprite(0, 0, width, height, 'cloudsEnd')
      .setOrigin(0, 0)
      .setAlpha(0)
    this.backTrees = scene.add
      .tileSprite(0, 0, width, height, 'backTrees')
      .setOrigin(0, 0)
    this.frontTrees = scene.add
      .tileSprite(0, 0, width, height, 'frontTrees')
      .setOrigin(0, 0)
    this.midground = scene.add
      .tileSprite(0, 0, width, height, 'midground')
      .setOrigin(0, 0)

    this.ground = scene.add
      .tileSprite(0, 0, width, height, 'ground')
      .setOrigin(0, 0)
      .setDepth(2)
    this.foreground = scene.add
      .tileSprite(0, height - 16 * 3, width, 16, 'backfence')
      .setOrigin(0, 0)
      .setScale(3)
      .setDepth(4)
    this.fence = scene.add
      .tileSprite(0, 315, width, 16, 'backfence')
      .setOrigin(0, 0)
      .setDepth(1)
      .setScale(1.2)

    this.scene = scene

    this.scene.timedEvent = this.scene.time.addEvent({
      delay: 10000,
      callback: this.createMediumSign,
      callbackScope: this,
      loop: true
    })
  }

  createMediumSign() {
    console.log('hey')
    if (!this.mediumSign) {
      this.mediumSign = this.scene.physics.add
        .sprite(1500, 300, 'medium')
        .setScale(2)
        .play('flash')
      this.mediumSign.body.allowGravity = false
    }
  }

  move() {
    if (this.scene.milestone) {
      this.scene.milestone.body.position.x -= 0.1 * this.scene.gameSpeed
      if (this.scene.milestone.body.position.x < -50) {
        this.scene.milestone.destroy()
        this.scene.milestone = undefined
      }
    }

    this.clouds.tilePositionX += 0.008 * this.scene.gameSpeed
    this.cloudsEnd.tilePositionX += 0.008 * this.scene.gameSpeed
    this.backTrees.tilePositionX += 0.04 * this.scene.gameSpeed
    this.frontTrees.tilePositionX += 0.07 * this.scene.gameSpeed
    this.midground.tilePositionX += 0.08 * this.scene.gameSpeed
    if (this.mediumSign && this.mediumSign.body) {
      this.mediumSign.body.position.x -= 0.08 * this.scene.gameSpeed
      if (this.mediumSign.body.position.x < -200) {
        this.mediumSign.destroy()
        this.mediumSign = undefined
      }
    }
    this.fence.tilePositionX += (0.1 * this.scene.gameSpeed) / 1.2
    this.ground.tilePositionX += 0.1 * this.scene.gameSpeed
    this.foreground.tilePositionX += 0.15 * this.scene.gameSpeed
  }

  setSun(duration) {
    this.scene.add.tween({
      targets: [this.sun],
      y: 350,
      duration: duration,
      repeat: 0
    })

    this.scene.add.tween({
      targets: [this.skyEnd, this.cloudsEnd],
      alpha: 1,
      duration: duration,
      repeat: 0
    })

    const color1 = Phaser.Display.Color.ValueToColor('#ffffff')
    const color2 = Phaser.Display.Color.ValueToColor('#fc9003')
    this.sunTween = this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: duration,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: 0,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          color1,
          color2,
          100,
          value
        )
        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )
        this.sun.setTint(color)
      }
    })
  }

  stopFlash() {
    this.tween.stop()
    this.frontTrees.setTint(0xffffff)
    this.sky.setTint(0xffffff)
    this.skyEnd.setTint(0xffffff)
    this.sun.setTint(0xffffff)
    this.clouds.setTint(0xffffff)
    this.cloudsEnd.setTint(0xffffff)
    this.ground.setTint(0xffffff)
    this.midground.setTint(0xffffff)
    if (this.mediumSign) {
      this.mediumSign.setTint(0xffffff)
    }
    if (this.scene.milestone) {
      this.scene.milestone.setTint(0xffffff)
    }
  }

  flash(color1, color2, duration) {
    color1 = Phaser.Display.Color.ValueToColor(color1)
    color2 = Phaser.Display.Color.ValueToColor(color2)

    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          color1,
          color2,
          100,
          value
        )
        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )
        this.sky.setTint(color)
        this.skyEnd.setTint(color)
        this.frontTrees.setTint(color)
        this.sun.setTint(color)
        this.clouds.setTint(color)
        this.cloudsEnd.setTint(color)
        this.ground.setTint(color)
        this.midground.setTint(color)
        if (this.mediumSign) {
          this.mediumSign.setTint(color)
        }
        if (this.scene.milestone) {
          this.scene.milestone.setTint(color)
        }
      }
    })
  }
}
