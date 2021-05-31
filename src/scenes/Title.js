import Phaser from 'phaser'

import { createTextLabel } from '../utils'

export default class Title extends Phaser.Scene {
  constructor() {
    super('title')
  }

  create() {
    const { height, width } = this.game.config

    this.keyboard = this.sound.add('keyboard')
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 13 }),
      frameRate: 8,
      repeat: -1
    })
    this.background = this.add
      .tileSprite(0, 0, width, height, 'background')
      .setOrigin(0, 0)
    this.fire = this.add.sprite(900, 400, 'fire').play('burn').setScale(2)
    this.fire = this.add.sprite(100, 300, 'fire').play('burn').setScale(1.5)

    this.label1 = createTextLabel(this, 210, 136)
    this.label2 = createTextLabel(this, 210, 166)
    this.label3 = createTextLabel(this, 210, 220)
    this.label4 = createTextLabel(this, 220, 260)
    this.label5 = createTextLabel(this, 210, 280)
    this.label6 = createTextLabel(this, 210, 310)
    this.label7 = createTextLabel(this, 210, 370)
    this.label8 = createTextLabel(this, 210, 390)

    this.input.keyboard.once('keydown', () => {
      this.keyboard.play()
      this.type(
        "I'm leaving, Alex. I'm finally leaving Pleasantville.",
        this.label1,
        () => {
          this.input.keyboard.once('keydown', () => {
            this.type(
              'Leaving behind my crazy dreams and the\nold lady and the psychics and the popcorn\nand the cornflakes and the corn syrup.',
              this.label2,
              () => {
                this.input.keyboard.once('keydown', () => {
                  this.type(
                    'The highway is on fire and\nall the cars are going the wrong way.',
                    this.label3,
                    () => {
                      this.input.keyboard.once('keydown', () => {
                        this.type(
                          "Or maybe that's just been me all along",
                          this.label4,
                          () => {
                            this.input.keyboard.once('keydown', () => {
                              this.type(
                                'Looks like I have a long drive\nahead of me, and not much time.',
                                this.label5,
                                () => {
                                  this.input.keyboard.once('keydown', () => {
                                    this.type(
                                      'I can already hear the Vermin Extermination\nPolice cars ringing in my ears.',
                                      this.label6,
                                      () => {
                                        this.input.keyboard.once(
                                          'keydown',
                                          () => {
                                            this.type(
                                              "Alex, I'm sorry.",
                                              this.label7,
                                              () => {
                                                this.input.keyboard.once(
                                                  'keydown',
                                                  () => {
                                                    this.type(
                                                      "But now, Alex, I'm going home.",
                                                      this.label8,
                                                      () => {
                                                        this.input.keyboard.once(
                                                          'keydown',
                                                          () => {
                                                            this.scene.start(
                                                              'game'
                                                            )
                                                          }
                                                        )
                                                      }
                                                    )
                                                  }
                                                )
                                              }
                                            )
                                          }
                                        )
                                      }
                                    )
                                  })
                                }
                              )
                            })
                          }
                        )
                      })
                    }
                  )
                })
              }
            )
          })
        }
      )
    })
  }

  type(text, label, onDone) {
    this.keyboard.play()
    const length = text.length
    let i = 0
    this.time.addEvent({
      callback: () => {
        label.text += text[i]
        ++i
        if (i >= length) {
          if (onDone) {
            this.keyboard.stop()
            onDone()
          }
        }
      },
      repeat: length - 1,
      delay: 50
    })
  }
}
