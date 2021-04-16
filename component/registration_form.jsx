import { TYPE_JSON } from '../api/defs.js'

export const RegistrationForm = () => {
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
    console.log('response', fetching, fetching.body)
    const response = await fetching.json()
    if (response.status) {
      // redirect some where
    } else {
      // show Errors
      document.querySelector('span').innerText = response.errors.join(',')
    }
  }

  return (
    <>
      <span style={{ color: 'red', fontSize: '20px' }}></span>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="ownContact"
          placeholder="please enter your phone number"
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="please enter a phone number to join in case of emergency"
        />
        <button type="submit"> submit </button>
      </form>
    </>
  )
}
