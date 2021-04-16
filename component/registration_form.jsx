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
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
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

  console.log(errors)

  return (
    <>
      <span style={{ color: 'red', fontSize: '20px' }}></span>
      <Form onSubmit={(e) => onSubmit(e)} title="Profile-Info" submit="save">
        <Text
          name="ownContact"
          comment="please enter your phone number"
          errors={errors}
        />{'\n'}
        <Text
          name="emergencyContact"
          comment="please enter a phone number to join in case of emergency"
          errors={errors}
        />{' '}
      </Form>
    </>
  )
}
