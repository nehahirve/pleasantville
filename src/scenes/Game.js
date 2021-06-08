import Phaser from 'phaser'

import Timer from './Timer'
import Animations from './Animations'
import Player from '../Sprites/Player'
import Raven from '../Sprites/Raven'
import Background from '../Sprites/Background'
import PoliceCar from '../Sprites/PoliceCar'
import { loadHearts } from '../utils'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  create() {
    this.params = {
      totalDistance: 12000,
      totalTime: 85000,
      gameSpeed: 22,
      enemyCarRespawnRate: 3000,
      sunsetTime: 70000,
      carScale: 400,
      noOfLives: 5,
      policeCarSpeed: 159
    }

    this.anims = new Animations(this)

    this.totalDistance = this.params.totalDistance
    this.gameTime = this.params.totalTime
    this.gameSpeed = this.params.gameSpeed
    this.maxGameSpeed = 80
    this.sunsetTime = this.params.sunsetTime
    this.carScale = this.params.carScale
    // GAME VARIABLES
    this.respawnTime = 0

    this.isPoliceChase = false
    this.winGameAnim = false
    this.slowedDown = false
    this.crashes = 0
    this.remainingDistance = this.totalDistance

    this.background = new Background(this)

    this.crash = this.sound.add('crash')
    this.music = this.sound.add('music')
    if (!this.music.isPlaying) {
      this.music.play({ volume: 0.2, loop: true })
    }
    //LOAD SPRITES
    this.player = this.add.existing(new Player(this, 50, 400))
    this.raven = this.add.existing(new Raven(this, 150, 100))

    //LOAD HEARTS
    loadHearts(this, 40, 60, this.params.noOfLives)

    //LOAD MINIMAP
    this.minimap = this.add.graphics()
    this.progress = this.add.graphics()
    this.minimapBar = new Phaser.Geom.Rectangle(30, 30, 200, 5)

    this.minimap.fillStyle(0xfdf7e2, 1)
    this.minimap.fillRectShape(this.minimapBar)

    //ADD ENEMY GROUP
    this.enemyCars = this.physics.add.group()
    this.policeCars = this.physics.add.group()

    this.enemyCollider = this.physics.world.addOverlap(
      this.policeCars,
      this.enemyCars,
      (obj1, obj2) => console.log(obj1, obj2),
      null,
      this
    )
    console.log(this.enemyCollider)
    // ADD CURSOR INPUT
    this.cursors = this.input.keyboard.createCursorKeys()

    // TIMER
    this.timer = new Timer(this, 900, 65)
    this.timer.start(this.gameOver.bind(this), this.gameTime)
    this.background.setSun(this.sunsetTime)

    // EVENTS
    const mileEvents = [
      'mile900',
      'mile800',
      'mile700',
      'mile600',
      'mile500',
      'mile400',
      'mile300',
      'mile200',
      'mile100'
    ]
    mileEvents.forEach(event => {
      this.events.once(event, () => this.handleMilestone(event), this)
    })
    this.events.once('police1', this.spawnPolice, this)
    this.events.once('police2', this.spawnPolice, this)
    this.events.once('police3', this.spawnPolice, this)
    this.events.once('wingame', this.winGame, this)
    this.events.once('moveon', this.moveOn, this)
    this.events.once(
      'ravenEvent',
      () => {
        this.raven = this.add.existing(new Raven(this, 150, 100))
      },
      this
    )
  }

  accelerateMusic(input) {
    const outputStart = 1
    const outputEnd = 1.3
    const inputStart = 22
    const inputEnd = this.maxGameSpeed
    const slope = (outputEnd - outputStart) / (inputEnd - inputStart)
    return outputStart + slope * (input - inputStart)
  }
  decelerateMusic(input) {
    const outputStart = 0.0001
    const outputEnd = 1
    const inputStart = 0
    const inputEnd = 22
    const slope = (outputEnd - outputStart) / (inputEnd - inputStart)
    return outputStart + slope * (input - inputStart)
  }
  update(time, delta) {
    this.music.setRate(this.accelerateMusic(this.gameSpeed))
    if (this.gameSpeed < 20)
      this.music.setRate(this.decelerateMusic(this.gameSpeed))
    this.carScale = this.params.carScale
    if (this.crashes > this.params.noOfLives) {
      this.gameOver()
      this.crash.play()
    }
    if (this.winGameAnim) {
      this.animateGameOver()
      return
    }
    // PROGRESS BAR
    this.progressBar = new Phaser.Geom.Rectangle(
      30,
      30,
      (200 / this.totalDistance) *
        (this.totalDistance - this.remainingDistance),
      5
    )
    this.progress.fillStyle(0x5fcde4, 1)
    this.progress.fillRectShape(this.progressBar)
    // UPDATE
    this.timer.update()
    if (this.raven) this.raven.update()
    this.background.move()

    this.remainingDistance -= (this.gameSpeed * time) / 1000000
    if (this.remainingDistance <= (this.totalDistance / 10) * 9) {
      this.events.emit('mile900')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 8) {
      this.events.emit('mile800')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 7) {
      this.events.emit('mile700')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 6) {
      this.events.emit('mile600')
      this.events.emit('ravenEvent')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 5) {
      this.events.emit('mile500')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 4) {
      this.events.emit('mile400')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 3) {
      this.events.emit('mile300')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 2) {
      this.events.emit('mile200')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 1) {
      this.events.emit('mile100')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 0) {
      this.events.emit('wingame')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 9) {
      this.events.emit('police1')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 5) {
      this.events.emit('police2')
    }
    if (this.remainingDistance <= (this.totalDistance / 10) * 2.5) {
      this.events.emit('police3')
    }

    //MOVE PLAYER
    if (this.player.body.position.y < 330) this.player.body.position.y = 330
    this.player.setScale(this.player.body.position.y / this.carScale)
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
      if (this.gameSpeed < this.maxGameSpeed) this.gameSpeed += 0.5
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
    if (this.player.body.position.x > this.game.config.width - 400)
      this.player.body.position.x = this.game.config.width - 400

    this.respawnTime += delta * this.gameSpeed * 0.08

    if (this.respawnTime >= this.params.enemyCarRespawnRate) {
      this.spawnEnemyCar()
      this.respawnTime = 0
    }

    //UPDATE ENEMY CARS
    this.enemyCars.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().right < 0) {
        this.enemyCars.killAndHide(obstacle)
      }
    })
    Phaser.Actions.IncX(this.enemyCars.getChildren(), -this.gameSpeed * 0.3)
    // UPDATE POLICE
    this.policeCars.getChildren().forEach(child => {
      child.update()
    })

    if (this.slowedDown) {
      this.gameSpeed = 20
      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
    }
  }

  winGame() {
    this.isPoliceChase = false
    this.background.stopFlash()
    this.siren.stop()
    this.timer.label.setTint(0x00ff00)
    console.log('game is won')
    this.lastSign = this.add
      .sprite(this.game.config.width + 200, 220, 'lastSign')
      .setScale(1)
      .setDepth(0)
      .play('lastSign')
    this.winGameAnim = true
  }

  gameOver() {
    this.game.restarted = true
    this.music.stop()
    if (this.milestone) {
      this.milestone.destroy()
      this.milestone = undefined
    }
    if (this.background.mediumSign) {
      this.background.mediumSign.destroy()
      this.background.mediumSign = undefined
    }
    this.scene.start('gameover')
  }

  spawnEnemyCar() {
    const distance = Phaser.Math.Between(100, 200)
    const arr = [330, 350, 390, 420, 480]
    const cars = ['enemyCar1', 'enemyCar2', 'enemyCar3']
    const randomDistance = arr[Math.floor(Math.random() * arr.length)]
    const randomCar = cars[Math.floor(Math.random() * cars.length)]
    const car = this.enemyCars
      .create(this.game.config.width + distance, randomDistance, 'enemycars')
      .play(randomCar)
      .setImmovable()
      .setDepth(3)
      .setSize(20, 20, 20, 20)
    car.setScale(car.body.position.y / this.carScale)
    car.body.allowGravity = false
    this.physics.add.collider(
      this.player,
      car,
      () => {
        if (!this.slowedDown) {
          this.bump = this.sound.add('bump')
          this.bump.play({ volume: 0.5 })
          this.crashes++
          this.slowedDown = true
          this.blink(this.player)
          this.blink(this[`heart${6 - this.crashes}`])

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
    this.background.flash('#ff0000', '#0000ff', 5000)
    this.siren = this.sound.add('siren')
    this.siren.play({ loop: true })
    const car = new PoliceCar(this)
    this.policeCars.add(car)
    car.setVelocityX(this.params.policeCarSpeed)
    this.policeCollider = this.physics.add.collider(
      this.player,
      car,
      () => {
        this.isPoliceChase = false
        this.background.stopFlash()
        this.siren.stop()
        this.physics.pause()
        this.policeCars.killAndHide()
        this.gameOver()
        this.crash.play()
      },
      null,
      this
    )
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
      if (this[`heart${6 - this.crashes}`]) {
        this[`heart${6 - this.crashes}`].destroy()
      }
    }, 1000)
  }

  moveOn() {
    setTimeout(() => {
      this.add.image(0, 0, 'pressEnter').setOrigin(0, 0).setDepth(10)
      this.input.keyboard.once('keydown-ENTER', () => {
        this.scene.start('endscene')
      })
    }, 1500)
  }

  animateGameOver() {
    if (this.player) {
      this.player.body.position.x += 5
      this.player.setCollideWorldBounds(false)
    }
    this.enemyCars.getChildren().forEach(obstacle => {
      this.enemyCars.killAndHide(obstacle)
    })

    if (this.background.mediumSign) this.background.mediumSign.destroy()
    this.policeCars.getChildren().forEach(obstacle => {
      this.policeCars.killAndHide(obstacle)
    })
    this.background.midground.destroy()
    this.gameSpeed -= 0.5
    if (this.gameSpeed <= 10) {
      this.gameSpeed = 10
    }
    this.lastSign.x -= 0.08 * this.gameSpeed
    if (this.lastSign.x <= this.game.config.width / 2) {
      this.gameSpeed -= 1
      this.events.emit('moveon')
    }
    this.background.move()
  }

  handleMilestone(event) {
    const mile = event.slice(4, 6)
    this.milestone = this.physics.add.image(
      this.game.config.width,
      400,
      `mile${mile}`
    )
    this.milestone.body.allowGravity = false
    this.milestone.setDepth(2).setImmovable()
  }
}
