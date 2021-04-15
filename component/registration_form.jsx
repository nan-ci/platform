import { TYPE_JSON } from '../api/defs'

export const registrationForm = () => {
  const onSubmit = async (e) => {
    e.preventDefault()
    // form data
    const form = new FormData(e.target)
    const data = Object.fromEntries(form)
    const json = JSON.stringify(data)
    const fetching = await fetch('/api/user/registerForm', {
      method: 'POST',
      headers: { ...TYPE_JSON },
      body: { ...json },
    })
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
          name="own_contact"
          placeholder="please enter your phone number"
        />
        <input
          type="text"
          name="emergency_contact"
          placeholder="please enter a phone number to join in case of emergency"
        />
        <button type="submit"> submit </button>
      </form>
    </>
  )
}

export default registrationForm
