import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'car')
    scene.physics.world.enableBody(this)
    this.play('driveForward').setDepth(3).setImmovable().setSize(20, 20, 20, 20)
    this.setCollideWorldBounds(true)
    this.body.allowGravity = false
  }
}
