import Phaser from 'phaser'

import Timer from './Timer'
import Player from '../Sprites/Player'
import Raven from '../Sprites/Raven'
import Animations from './Animations'
import Background from '../Sprites/Background'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  create() {
    // GAME VARIABLES
    this.mileage = 5000
    this.gameSpeed = 22
    this.respawnTime = 0
    this.isPoliceChase = false
    this.totalDistance = this.mileage
    this.winGameAnim = false
    this.slowedDown = false
    this.crashes = 0

    this.anims = new Animations(this)
    this.background = new Background(this)

    this.music = this.sound.add('music')
    if (!this.music.isPlaying) this.music.play({ volume: 0.3 })
    //LOAD SPRITES
    this.player = this.add
      .existing(new Player(this, 50, 400))
      .setImmovable()
      .setSize(20, 20, 20, 20)
    this.raven = this.add.existing(new Raven(this, 150, 100))

    //ADD ENEMY GROUP
    this.enemyCars = this.physics.add.group()
    this.policeCars = this.physics.add.group()

    //ADD COLLIDERS

    // ADD CURSOR INPUT
    this.cursors = this.input.keyboard.createCursorKeys()

    const timerLabel = this.add
      .text(850, 50, '45', {
        fontSize: 36,
        fontFamily: 'mxCompis'
      })
      .setDepth(4)

    // TIMER
    this.clock = this.add.image(890, 65, 'clock').setScale(2)
    this.timer = new Timer(this, timerLabel)
    this.timer.start(this.gameOver.bind(this))

    // EVENTS
    this.events.once('police1', this.spawnPolice, this)
    this.events.once('police2', this.spawnPolice, this)
    this.events.once('police3', this.spawnPolice, this)
    this.events.once('mileage900', this.handler, this)
    // this.events.once('mileage800', this.handler, this)
    // this.events.once('mileage700', this.handler, this)
    // this.events.once('mileage600', this.handler, this)
    // this.events.once('mileage500', this.handler, this)
    this.events.once('wingame', this.winGame, this)
  }

  handler() {
    this.mile100 = this.physics.add.sprite(1500, 300, 'mile100').setScale(2)
    this.mile100.body.allowGravity = false
    this.mile100.setVelocityX(-160)
  }

  winGame() {
    this.timer.label.setTint(0x00ff00)
    console.log('game is won')
    this.lastSign = this.add
      .image(this.game.config.width + 200, 250, 'lastSign')
      .setScale(2)
      .setDepth(1)
    this.winGameAnim = true
    // this.scene.start('endscene')
  }

  gameOver() {
    this.scene.start('gameover')
  }

  update(time, delta) {
    if (this.crashes > 5) this.gameOver()
    if (this.winGameAnim) {
      this.animateGameOver()
      return
    }
    // UPDATE TIMER DISPLAY
    this.timer.update()
    //UPDATE RAVEN
    if (this.raven) this.raven.update()

    this.totalDistance -= (this.gameSpeed * time) / 1000000
    if (this.totalDistance <= (this.mileage / 10) * 9) {
      this.events.emit('mileage900')
    }
    if (this.totalDistance <= (this.mileage / 10) * 8) {
      this.events.emit('mileage800')
    }
    if (this.totalDistance <= (this.mileage / 10) * 7) {
      this.events.emit('mileage700')
    }
    if (this.totalDistance <= (this.mileage / 10) * 6) {
      this.events.emit('mileage600')
    }
    if (this.totalDistance <= 0) {
      this.events.emit('mileage500')
      this.events.emit('wingame')
    }

    if (this.totalDistance <= (this.mileage / 10) * 9) {
      this.events.emit('police1')
    }

    if (this.totalDistance <= (this.mileage / 10) * 5) {
      this.events.emit('police2')
    }

    if (this.totalDistance <= (this.mileage / 10) * 4) {
      this.events.emit('police3')
    }

    this.background.move()

    //MOVE PLAYER
    if (this.player.body.position.y < 320) this.player.body.position.y = 320
    this.player.setScale(this.player.body.position.y / 300)
    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
      if (this.gameSpeed > 0 && !this.isPoliceChase) {
        this.gameSpeed -= 0.5
        this.player.setVelocityX(-160)
      }
      if (this.gameSpeed >= 0 && !this.isPoliceChase) {
        this.player.setVelocityX(0)
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      if (this.gameSpeed === 0) this.gameSpeed = 19
      if (this.gameSpeed < 80) this.gameSpeed += 0.5
    } else {
      if (this.isPoliceChase) {
        this.player.setVelocityX(-200)
      } else {
        this.player.setVelocityX(-100)
        if (this.gameSpeed > 20) this.gameSpeed -= 0.5
        if (this.gameSpeed < 20) this.gameSpeed += 0.5
      }
    }
    if (this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.player.setVelocityY(-200)
      this.player.anims.play('driveLeft', true)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200)
      this.player.anims.play('driveRight', true)
    } else {
      this.player.setVelocityY(0)
      this.player.anims.play('driveForward', true)
    }
    if (this.player.body.position.x < 100) this.player.body.position.x = 100
    if (this.player.body.position.x > this.game.config.width - 200)
      this.player.body.position.x = this.game.config.width - 200

    this.respawnTime += delta * this.gameSpeed * 0.08

    if (this.respawnTime >= 3000) {
      this.spawnEnemyCar()
      this.respawnTime = 0
    }

    //REMOVE ENEMY CARS AS THEY EXIT SCREEN
    this.enemyCars.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().right < 0) {
        this.enemyCars.killAndHide(obstacle)
      }
    })
    this.policeCars.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().left > this.game.config.width) {
        this.policeCars.killAndHide(obstacle)
        this.isPoliceChase = false
      }
    })
    Phaser.Actions.IncX(this.enemyCars.getChildren(), -this.gameSpeed * 0.3)
    // POLICE
    this.policeCars.getChildren().forEach(child => {
      if (child.body.position.x > this.game.config.width - 300) {
        this.physics.world.removeCollider(this.policeCollider)
        if (this.player.body.position.y > 300) {
          child.body.position.y++
        } else {
          child.body.position.y--
        }
        child.setVelocityX(500)
      } else {
        child.body.position.y = this.player.body.position.y
      }
    })
    if (this.slowedDown) {
      this.gameSpeed = 20

      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
    }
  }

  //HELPER METHODS
  spawnEnemyCar() {
    const distance = Phaser.Math.Between(100, 200)
    const arr = [330, 390, 480]
    const cars = ['enemyCar1', 'enemyCar2', 'enemyCar3']
    const randomDistance = arr[Math.floor(Math.random() * arr.length)]
    const randomCar = cars[Math.floor(Math.random() * cars.length)]
    const car = this.enemyCars
      .create(this.game.config.width + distance, randomDistance, 'enemycars')
      .play(randomCar)
      .setImmovable()
      .setDepth(3)
      .setSize(20, 20, 20, 20)
    car.setScale(car.body.position.y / 300)
    car.body.allowGravity = false
    this.physics.add.collider(
      this.player,
      car,
      () => {
        if (!this.slowedDown) {
          this.crashes++
          this.slowedDown = true
          this.blink(this.player)
          this.blink(car)
          setTimeout(() => {
            this.player.setTint(0xffffff)
            this.slowedDown = false
          }, 500)
        } else return
      },
      null,
      this
    )
  }

  spawnPolice() {
    this.isPoliceChase = true
    const height = this.player.body.position.y
    const car = this.policeCars
      .create(-500, height, 'police')
      .play('police')
      .setImmovable()
      .setDepth(3)
    car.setScale(car.body.position.y / 300)
    car.body.allowGravity = false
    this.tween()
    car.setVelocityX(159)
    this.policeCollider = this.physics.add.collider(
      this.player,
      car,
      () => {
        this.player.setTint(0x00ff00)
        // this.physics.pause()
        // this.policeCars.killAndHide()
        // this.gameOver()
      },
      null,
      this
    )
  }

  tween() {
    const red = Phaser.Display.Color.ValueToColor('#ff0000')
    const blue = Phaser.Display.Color.ValueToColor('#0000ff')

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          red,
          blue,
          100,
          value
        )
        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )
        this.background.sky.setTint(color)
        this.background.frontTrees.setTint(color)
        this.background.sun.setTint(color)
        this.background.clouds.setTint(color)
        this.background.ground.setTint(color)
        this.background.midground.setTint(color)
        setTimeout(() => {
          tween.stop()
          this.background.frontTrees.setTint(0xffffff)
          this.background.sky.setTint(0xffffff)
          this.background.sun.setTint(0xffffff)
          this.background.clouds.setTint(0xffffff)
          this.background.ground.setTint(0xffffff)
          this.background.midground.setTint(0xffffff)
        }, 5000)
      }
    })
  }

  blink(item) {
    let blink = this.tweens.add({
      targets: [item],
      alpha: { value: 0, duration: 100, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })
    setTimeout(() => {
      this.tweens.remove(blink)
      this.player.setAlpha(1)
    }, 1000)
  }

  animateGameOver() {
    this.enemyCars.getChildren().forEach(obstacle => {
      this.enemyCars.killAndHide(obstacle)
    })
    this.policeCars.getChildren().forEach(obstacle => {
      this.policeCars.killAndHide(obstacle)
    })
    if (this.gameSpeed <= 20) {
      this.gameSpeed = 20
    }
    this.gameSpeed -= 0.5
    if (this.lastSign.x <= this.game.config.width / 2) {
      setTimeout(this.scene.start('endscene'), 2000)
    }
    this.lastSign.x -= 0.08 * this.gameSpeed
    this.background.move()
    if (this.player.body.position.x < 50) this.player.body.position.x = 50
    if (this.player.body.position.x > this.game.config.width - 200)
      this.player.body.position.x = this.game.config.width - 200
  }
}
