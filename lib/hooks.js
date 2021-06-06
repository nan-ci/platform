import { useState, useEffect } from 'preact/hooks'

export const useEve = ({ get, on }) => {
  const [value, setValue] = useState(get())
  useEffect(() => on(setValue), [])
  return value
}
