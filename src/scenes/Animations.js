export default class Animations {
  constructor(scene) {
    if (scene.game.restarted) {
      return
    }
    scene.anims.create({
      key: 'fly',
      frames: scene.anims.generateFrameNumbers('raven', {
        start: 12,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })
    scene.anims.create({
      key: 'driveForward',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })
    scene.anims.create({
      key: 'driveLeft',
      frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1
    })
    scene.anims.create({
      key: 'driveRight',
      frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1
    })
    scene.anims.create({
      key: 'enemyCar1',
      frames: scene.anims.generateFrameNumbers('enemyCar', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    })
    scene.anims.create({
      key: 'enemyCar2',
      frames: scene.anims.generateFrameNumbers('enemyCar', {
        start: 4,
        end: 7
      }),
      frameRate: 4,
      repeat: -1
    })
    scene.anims.create({
      key: 'enemyCar3',
      frames: scene.anims.generateFrameNumbers('enemyCar', {
        start: 8,
        end: 11
      }),
      frameRate: 4,
      repeat: -1
    })
    scene.anims.create({
      key: 'police',
      frames: scene.anims.generateFrameNumbers('policeCar', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    })
    scene.anims.create({
      key: 'flash',
      frames: scene.anims.generateFrameNumbers('mediumSign', {
        start: 0,
        end: 1
      }),
      frameRate: 4,
      repeat: -1
    })
    scene.anims.create({
      key: 'lastSign',
      frames: scene.anims.generateFrameNumbers('lastSign', {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    })
  }
}
