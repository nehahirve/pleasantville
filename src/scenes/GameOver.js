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

    this.input.keyboard.once('keydown', () => {
      this.scene.start('game')
    })
  }
}
