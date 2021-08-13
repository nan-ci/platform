import moment from 'moment'

export const durationToSeconds = (duration) => {
  const split = duration.split(':')
  return (
    (split.length > 2 ? parseInt(split[0]) * 3600 : 0) +
    parseInt(split[split.length > 2 ? 1 : 0]) * 60 +
    parseInt(split[split.length > 2 ? 2 : 1])
  )
}

export const EndDate = (duration) => {
  return moment().add(durationToSeconds(duration), 'seconds')
}

export const progressColor = (val) => {
  if (val <= 0) return '#1bff00'
  if (val > 0 && val < 10) return '#79ff00'
  if (val >= 10 && val < 20) return '#a9ff00'
  if (val >= 20 && val < 30) return '#e3ff00'
  if (val >= 30 && val < 40) return '#ffe000'
  if (val >= 40 && val < 50) return '#ffc800'
  if (val >= 50 && val < 60) return '#ff9900'
  if (val >= 60 && val < 70) return '#ff7600'
  if (val >= 70 && val < 80) return '#ff5300'
  if (val >= 80 && val <= 90) return '#ff0000'
  if (val >= 90 && val <= 100) return '#ed0606'
}

export const format = (meth, method) => {
  return `${
    (meth[method] < 10 ? '0' + meth[method] : meth[method]) + method[0]
  }`
}

export const getQuiz = () => JSON.parse(sessionStorage.getItem('quiz'))
export const getUser = () => JSON.parse(localStorage.getItem('user'))

export const time = (type, end_date) => {
  switch (type) {
    case 'all':
      return moment.duration(moment(end_date).diff(moment()))
    case 'asSeconds':
      return moment.duration(moment(end_date).diff(moment())).asSeconds()
  }
}

export const equals = (array1, array2) => {
  // if the other array is a falsy value, return
  if (!array1 || !array2) return false

  // compare lengths - can save a lot of time
  if (array1.length != array2.length) return false

  for (var i = 0, l = array1; i < l; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array1[i].equals(array2[i])) return false
    } else if (array1[i] != array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}
