export default class Background {
  constructor(scene) {
    const { width, height } = scene.game.config
    this.sky = scene.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(1)
    this.sun = scene.add.image(0, 0, 'sun').setOrigin(0, 0).setScale(1)

    this.clouds = scene.add
      .tileSprite(0, 0, width, height, 'clouds')
      .setOrigin(0, 0)
      .setScale(1)
    this.backTrees = scene.add
      .tileSprite(0, 0, width, height, 'backTrees')
      .setOrigin(0, 0)
      .setScale(1)
    this.frontTrees = scene.add
      .tileSprite(0, 0, width, height, 'frontTrees')
      .setOrigin(0, 0)
      .setScale(1)
    this.midground = scene.add
      .tileSprite(0, 0, width, height, 'midground')
      .setOrigin(0, 0)
      .setScale(1)
    this.mediumSign = scene.physics.add
      .sprite(1500, 300, 'medium')
      .setScale(2)
      .play('flash')
    this.mediumSign.body.allowGravity = false
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
      .setScale(1.2)
    this.scene = scene
  }

  move() {
    this.clouds.tilePositionX += 0.008 * this.scene.gameSpeed
    this.backTrees.tilePositionX += 0.04 * this.scene.gameSpeed
    this.frontTrees.tilePositionX += 0.07 * this.scene.gameSpeed
    this.midground.tilePositionX += 0.08 * this.scene.gameSpeed
    this.mediumSign.body.position.x -= 0.08 * this.scene.gameSpeed
    this.fence.tilePositionX += (0.1 * this.scene.gameSpeed) / 1.2
    this.ground.tilePositionX += 0.1 * this.scene.gameSpeed
    this.foreground.tilePositionX += 0.15 * this.scene.gameSpeed
  }
}
