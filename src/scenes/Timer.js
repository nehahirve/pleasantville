export default class Timer {
  constructor(scene, x, y) {
    this.scene = scene
    this.label = this.scene.add
      .text(x - 35, y - 15, '45', {
        fontSize: 36,
        fontFamily: 'mxCompis'
      })
      .setDepth(4)
    this.countdown = false
    this.scene.add.image(x, y, 'clock').setScale(2)
    this.beep = this.scene.sound.add('timer')
  }

  start(callback, duration) {
    this.stop()

    this.finishedCallback = callback
    this.duration = duration

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        this.label.text = '0'

        this.stop()

        if (callback) {
          callback()
        }
      }
    })
  }

  stop() {
    if (this.timerEvent) {
      this.beep.stop()
      this.timerEvent.destroy()
      this.timerEvent = undefined
    }
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return
    }

    const elapsed = this.timerEvent.getElapsed()
    const remaining = this.duration - elapsed
    const minutes = Math.floor((remaining / 1000 / 60) % 60)
    const seconds = Math.floor((remaining / 1000) % 60)
    const timeString = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':')

    if (remaining < 10000) {
      if (!this.beep.isPlaying) this.beep.play()
      console.log('time us up')
      if (!this.countdown) {
        this.tween()
        this.countdown = true
      }
    }
    this.label.text = `${timeString}`
  }

  tween() {
    const red = Phaser.Display.Color.ValueToColor('#ff0000')
    const blue = Phaser.Display.Color.ValueToColor('#ffcc00')

    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: tween => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          red,
          blue,
          100,
          value
        )
        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )
        this.label.setTint(color)
      }
    })
  }
}
