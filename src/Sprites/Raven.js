import Phaser from 'phaser'

export default class Raven extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'raven')
    scene.physics.world.enableBody(this)
    this.setScale(1.5).play('fly').setVelocityX(100)
    this.body.allowGravity = false
    this.body.allowGravity = false
    this.scene = scene
  }

  update() {
    if (this.body.x > this.scene.game.config.width) {
      this.scene.raven = undefined
      this.destroy()
    }
  }
}
