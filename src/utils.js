const createTextLabel = (scene, x, y) => {
  return scene.add.text(x, y, '', {
    fontFamily: 'mxCompis',
    color: '#241a1e',
    fontSize: 15
  })
}

export { createTextLabel }
