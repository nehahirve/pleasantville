const createTextLabel = (scene, x, y) => {
  return scene.add.text(x, y, '', {
    fontFamily: 'mxCompis',
    color: '#241a1e',
    fontSize: 15
  })
}

const loadHearts = (scene, x, y, number) => {
  for (let i = 0; i < number; i++) {
    scene[`heart${i + 1}`] = scene.add.image(x + 20 * i, y, 'heart')
  }
}

export { createTextLabel, loadHearts }
