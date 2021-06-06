import Phaser from 'phaser'

export default class PoliceCar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, -500, 400, 'policeCar')
    scene.physics.world.enableBody(this).setSize(20, 20, 20, 20).setImmovable()
    scene.sys.displayList.add(this)
    this.play('police')
    this.setDepth(3)

    this.body.allowGravity = false
    scene.isPoliceChase = true
    this.scene = scene
  }

  update() {
    this.setScale(this.body.position.y / this.scene.carScale)
    if (this.body.position.x >= this.scene.game.config.width - 450) {
      this.scene.physics.world.removeCollider(this.scene.policeCollider)
      if (this.scene.player.body.position.y > 400) {
        this.body.position.y--
      } else {
        this.body.position.y++
      }
      this.setVelocityX(500)
    } else {
      this.body.position.y = this.scene.player.body.position.y
    }
    if (this.getBounds().left > this.scene.game.config.width) {
      this.scene.isPoliceChase = false
      this.scene.background.stopFlash()
      this.scene.siren.stop()
      this.destroy()
    }
  }
}
