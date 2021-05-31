export default class Timer {
  constructor(scene, label) {
    this.scene = scene
    this.label = label
    this.countdown = false
  }

  start(callback, duration = 100000) {
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
    const seconds = remaining / 1000

    if (remaining < 6000) {
      console.log('time us up')
      if (!this.countdown) {
        this.tween()
        this.countdown = true
      }
    }
    this.label.text = seconds.toFixed(2)
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
