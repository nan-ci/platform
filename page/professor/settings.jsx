import { useState } from 'preact/hooks'
import { Alert } from '../../component/alert.jsx'
import { Form, Input, Row, Fieldset } from '../../component/form.jsx'
import { DangerZone } from '../../component/dangerzone.jsx'
import { API } from '../../lib/env.js'
import { Layout } from '../../component/layout.jsx'
import { user } from '../../lib/auth.js'
export const Settings = () => {
  const [alert, setAlert] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const getModifyValue = (data) => {
    for (let key in data) {
      if (data[key] && user[key] === data[key]) delete data[key]
    }
    return Object.keys(data).length ? data : null
  }

  const checkErrors = (data) => {
    let errors = {}
    for (let key in data) {
      if (!data[key]) {
        errors[key] = `${key} is required`
      }
    }
    return errors
  }

  const submitAccount = async (e) => {
    e.preventDefault()
    const data = getModifyValue(Object.fromEntries(new FormData(e.target)))
    const json = data && JSON.stringify(data)
    if (json && !Object.keys(checkErrors(data)).length) {
      let resp = await (
        await fetch(`${API}/user/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: json,
        })
      ).json()

      if (!resp.errors) {
        localStorage.user = JSON.stringify({ ...user, ...resp.data })
        setMessage('Save with success')
        setAlert(true)
      }
    } else {
      setErrors((v) => {
        return { ...v, ...checkErrors(data) }
      })
    }

    if (!json) {
      setMessage('Nothing to update')
      setAlert(true)
    }
  }

  return (
    <Layout>
      <center>Account settings for {user.name}</center>
      <Alert
        alert={alert}
        message={message}
        color="#1ee70fe0"
        onClose={(val) => setAlert(val)}
      />
      <Form
        submit="update"
        buttonClassName="btn-settings"
        onSubmit={submitAccount}
      >
        <Fieldset legend="informations">
          <Row>
            <Input
              inputType="input"
              name="username"
              comment="Username"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.username}
              errors={errors}
              updateErrors={setErrors}
            />
            <Input
              inputType="input"
              name="name"
              comment="Name"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.name}
              errors={errors}
              updateErrors={setErrors}
            />
          </Row>
          <br />
          <Row>
            <Input
              inputType="input"
              name="location"
              comment="Location"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.location}
              errors={errors}
              updateErrors={setErrors}
            />
          </Row>

          <br />
          <Input
            inputType="textarea"
            rows={6}
            name="biography"
            comment="Biography"
            class="input-settings"
            value={user.biography}
            errors={errors}
            updateErrors={setErrors}
          />
        </Fieldset>
        <br />
        <Fieldset legend={'Social Netwok'}>
          <Row>
            <Input
              inputType="input"
              name="linkedIn"
              comment="LinkedIn"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.linkedIn}
              errors={errors}
              updateErrors={setErrors}
            />
            <Input
              inputType="input"
              name="twitter"
              comment="Twitter"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.twitter}
              errors={errors}
              updateErrors={setErrors}
            />
          </Row>
        </Fieldset>
        <br />
        <DangerZone discordId={user?.discordId} userId={''} />
      </Form>
    </Layout>
  )
}
