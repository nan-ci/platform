import { Text } from './form.jsx'

const formatNumber = ({ target: { value: num } }) => {
  const normalized = num.replace(/[^0-9+ext]+/g, '', '')
  if (!normalized.startsWith('+255')) return num
  const formated = normalized
    .slice(4, 10)
    .split('')
    .map((n, i) => (i % 2 ? n : ` ${n}`))
    .join('')
  return `+225${formated} ${normalized.slice(10)}`
}

export const Phoneinput = (props) => (
  <Text formatNumber={formatNumber} {...props} />
)
