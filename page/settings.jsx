import { useState } from 'preact/hooks'
import { Alert } from '../component/alert.jsx'
import { DangerZone } from '../component/dangerzone.jsx'
import { divider, Title } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
css(`
.input-settings{
  outline: none;
  color: var(--yellow-dark);
  border: 1px solid var(--white);
  padding: 0.6em;
  width: 100%;
}
.hr-settings{
  border: 2px dashed var(--grey-lighter);
  margin: 15px 0px;
}
.btn-settings{
  background: var(--purple-darker);
  outline: none;
  padding:7px;
  width: 25%;
  cursor: pointer;
  margin: 10px 0px;
}
`)

export const Settings = () => {

  const [account, setAccount] = useState(
    user || {
      name: '',
      username: '',
      avatar: '',
      biography: '',
      location: '',
      github: ''
    },
  )
  const [alert, setAlert] = useState(false)
  const [errors, setErrors] = useState({})

  const checkErrors = (data) => {
    let found = false
    if (!data.biography) {
      setErrors((d) => {
        return { ...d, biography: 'biography is required' }
      })
      found = true
    }
    return found
  }

  const submitAccount = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    if (!checkErrors(data)) {
      localStorage.user = JSON.stringify({ ...user, ...data })
      setAlert(!alert)
    }
  }

  return (
    <Layout>
      <center>Account settings for {user.name}</center>
      <Alert alert={alert} message="Save with success" color="var(--green)" />
      <Form
        submit="save"
        buttonClassName="btn-settings"
        onSubmit={submitAccount}
      >
        <Input
          inputType="input"
          name="username"
          comment="Username"
          class="input-settings"
          value={user.username}
          errors={errors}
        />
        <br />
        <Input
          inputType="input"
          name="name"
          comment="Name"
          class="input-settings"
          value={user.name}
          errors={errors}
        />
        <br />
        <Input
          inputType="input"
          name="location"
          comment="Location"
          class="input-settings"
          value={user.location}
          errors={errors}
        />
        <br />
        <Input
          inputType="input"
          name="avatar"
          comment="Picture"
          class="input-settings"
          value={user.avatar}
          errors={errors}
        />
        <br />
        <Input
          inputType="textarea"
          rows={6}
          name="biography"
          comment="Biography"
          class="input-settings"
          value={user.biography}
          errors={errors}
        />
      </Form>
    </Layout>
  )
}
