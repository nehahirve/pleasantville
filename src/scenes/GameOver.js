import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover')
  }

  create() {
    const { width, height } = this.game.config
    this.background = this.add
      .tileSprite(0, 0, width, height, 'gameOver')
      .setOrigin(0, 0)
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 13 }),
      frameRate: 8,
      repeat: -1
    })
    this.fire = this.add.sprite(900, 400, 'fire').play('burn').setScale(2)
    this.fire = this.add.sprite(100, 300, 'fire').play('burn').setScale(1.5)
    this.anims.create({
      key: 'police',
      frames: this.anims.generateFrameNumbers('policeCar', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    })
    this.policeCar = this.add
      .sprite(350, 400, 'policeCar')
      .play('police')
      .setScale(1.5)

    this.player = this.add
      .sprite(450, 450, 'player')
      .setScale(1.5)
      .setRotation(3)

    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('game')
    })
  }
}
