import { useState } from 'preact/hooks'

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
      setErrors(() => response.errors)
      document.querySelector('span.error').textContent = Object.values(
        response.errors,
      ).join(',')
    } else {
      // redirect here
    }
  }

  return (
    <>
      <br />
      <span className="error" style={{ color: 'red', fontSize: '15px' }}></span>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          name="ownContact"
          placeholder="please enter your phone number"
          style={{ border: errors.ownContact && '1px solid red' }}
        />
        <input
          name="emergencyContact"
          placeholder="please enter a phone number to join in case of emergency"
          style={{ border: errors.emergencyContact && '1px solid red' }}
        />
        <button type="submit"> submit </button>
      </form>
    </>
  )
}
