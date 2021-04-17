import { useState } from 'preact/hooks'
import { Form, Text } from './form.jsx'

export const RegistrationForm = () => {
  let [errors, setErrors] = useState({})
  const onSubmit = async (e) => {
    e.preventDefault()
    // form data
    const form = new FormData(e.target)
    const data = Object.fromEntries(form)
    const json = JSON.stringify(data)
    console.log('json', json)
    const fetching = await fetch('/api/user/registerForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: json,
    })
    const response = await fetching.json()
    if (response?.errors) {
      setErrors(response.errors)
    } else {
      console.log(response)
      // redirect here
    }
  }

  return (
    <>
      <Form onSubmit={(e) => onSubmit(e)} title="Profile-Info" submit="save">
        <PhoneInput
          name="ownContact"
          comment="please enter your phone number"
          errors={errors}
          value="+225"
        />
        {'\n'}
        <PhoneInput
          name="emergencyContact"
          comment="please enter a phone number to join in case of emergency"
          errors={errors}
          value="+225"
        />{' '}
      </Form>
    </>
  )
}

const check = ({ target: { value: num } }) => {
  const normalized = num.replace(/[^0-9+ext]+/g, '')
  if (normalized.startsWith('+225')) {
    const formated = normalized
      .slice(4, 10)
      .split('')
      .map((numb, ind) => (ind % 2 ? numb : ` ${numb}`))
      .join('')
    return `+225${formated} ${normalized.slice(10)}`
  }
}

const PhoneInput = (props) => (
  <Text
    minLength="18"
    maxLength="18"
    pattern="^\+225 ((01 [0456789][1-3])|(05 [0456789][4-6])|(07 [0456789][7-9])) ([0-9]{2}) [0-9]{4}$"
    check={(e) => check(e)}
    {...props}
  />
)
