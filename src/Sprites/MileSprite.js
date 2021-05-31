import Phaser from 'phaser'

export default class MileSign {
  constructor(scene) {
    super(scene, x, y, 'mileSign')
  }

  update() {
    this.position.x -= this.scene.gameSpeed * 0.8
  }
}
