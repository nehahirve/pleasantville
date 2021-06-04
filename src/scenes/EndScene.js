import Phaser from 'phaser'

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('endscene')
  }

  create() {
    const { width, height } = this.game.config

    this.anims.create({
      key: 'carinside',
      frames: this.anims.generateFrameNumbers('endScene', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    })
    this.background = this.add
      .sprite(0, 0, 'endScene')
      .play('carinside')
      .setOrigin(0, 0)
    this.postcard = this.add.sprite(340, 460, 'postcard').setInteractive()
    this.blink(this.postcard)
    this.postcard.on('pointerover', () => {
      this.postcard.setTint(0xff0000)
    })

    this.postcard.on('pointerup', () => {
      this.add
        .tileSprite(0, 0, width, height, 'endSceneWithPostcard')
        .setOrigin(0, 0)
    })

    this.postcard.on('pointerout', () => {
      this.postcard.clearTint()
    })
  }

  blink(item) {
    let blink = this.tweens.add({
      targets: [item],
      scale: { value: 1.1, duration: 1000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })
  }
}
