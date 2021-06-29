export const getUserLevel = (level) => {
  const [first, second] = level.split('-')
  if (second === 'X') {
    return { level: parseInt(first.slice(1)), step: 0, x: true }
  }
  return {
    level: parseInt(first.slice(1)),
    step: parseInt(second.slice(1)),
    x: false,
  }
}

export const generateStepName = (mInd, cInd) => {
  return `L${mInd}-S${cInd < 10 ? '0' + cInd : cInd}`
}
