import { Main, Title, Color } from '../component/elements.jsx'
import { useState } from 'preact/hooks'
import { Form } from '../component/form'
import { PhoneInput } from '../component/PhoneInput'
import { user } from '../lib/auth'

export const Profile = () => {
  let [errors, setErrors] = useState({})

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    const json = JSON.stringify(data)
    const request = await fetch('/api/user/updateProfile', {
      method: 'POST',
      headers: { 'content-type': 'json' },
      body: { ...json },
    })
    const response = await request.json()
    if (response?.errors) {
      setErrors({ ...errors })
    } else {
      setErrors({})
    }
  }

  return (
    <Main>
      <Title>Profile informations</Title>
      <Form title="profile form" onSubmit={onSubmit} submit="submit">
        <PhoneInput
          name="ownContact"
          comment="please enter a number please"
          errors={errors}
        />
        <PhoneInput
          name="emergencyContact"
          comment="please enter an emergency phone number"
          errors={errors}
        />
      </Form>
    </Main>
  )
}
