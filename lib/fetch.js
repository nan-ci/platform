import ressources from '../data/ressources.json'

const handleMessage = (status, val) => {
  return status ? { status, data: val } : { status: false, message: val }
}

const getSpecialityData = (data, spec) => {
  for (let el in data) {
    if (spec !== data[el].speciality) delete data[el]
  }
  return data
}

export const Fetch = (type = 'notions', { name, speciality, ...rest }) => {
  let Dtf = getSpecialityData(type === 'notions' ? ressources : {}, speciality)
  if (type === 'notions') {
    if (!name) {
      return handleMessage(true, Dtf)
    } else {
      return Dtf[name]
        ? handleMessage(true, Dtf[name])
        : handleMessage(false, `can't found an ${type} with the name ${name}`)
    }
  }
}
