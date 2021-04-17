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
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        />
        {'\n'}
        <PhoneInput
          name="emergencyContact"
          comment="please enter a phone number to join in case of emergency"
          errors={errors}
        />{' '}
      </Form>
    </>
  )
}

const PhoneInput = (props) => (
  <Text
    value={'+225'}
    minLength="14"
    maxLength="14"
    pattern="^\+225((01[0456789][1-3])|(05[0456789][4-6])|(07[0456789][7-9]))([0-9]{2}){3}$"
    {...props}
  />
)
