import { useState } from 'preact/hooks'
import { Alert } from '../component/alert.jsx'
import { Form, Input, Row, Fieldset } from '../component/form.jsx'
import { DangerZone } from '../component/dangerzone.jsx'
import { divider } from '../component/elements.jsx'
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

.pay {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pay-div-contain {
  width: 300px;
  height: 25px;
  border: 1px solid var(--comment-darker);
  border-radius: 0.4rem;
  margin-left: 10px;
}

.pay-div-progress {
  height: 100%;
  border-radius: 0.4rem 0 0 0.4rem;
  background: red;
}

.pay-diff {
  font-weight: bolder;
  font-size: 20px;
  margin-left: 10px;
}

.historical-contain {
  display:flex;
  flex-direction:row;
  align-items:center;
  justfiy-content:center;
  position:relative;
  top:0;
  left:10%;
}

.historical-contain div{
  margin-top:15px;
  height:50px;
  width:100px;
  border:1px solid white;
  border-right:none;
  text-align:center;
}

.historical-contain div header {
  color:white;
  font-size:1rem;
  font-weight:bolder;
}

.historical-contain div p {
  margin-top: 7px;
  font-weight:bolder;
}

.pay-btn {
  padding:0.5rem;
  background:var(--comment-darker);
  font-weight:bolder;
  font-size: 0.9rem;
  cursor:pointer;
  margin-left:35%;
  margin-top:20px;
}

`)

export const Settings = () => {
  const [alert, setAlert] = useState(false)
  const [errors, setErrors] = useState({})
  const months = ['October', 'November', 'December', 'January', 'February']
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
            />
            <Input
              inputType="input"
              name="name"
              comment="Name"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.name}
              errors={errors}
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
            />
            <Input
              inputType="input"
              name="avatar"
              comment="Picture"
              divStyle={{ width: '45%' }}
              class="input-settings"
              value={user.avatar}
              errors={errors}
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
              value={user.github}
              errors={errors}
            />
            <Input
              inputType="input"
              name="twitter"
              comment="Twitter"
              class="input-settings"
              divStyle={{ width: '45%' }}
              value={user.twitter}
              errors={errors}
            />
          </Row>
        </Fieldset>
        <br />
        {user && user.role === 'student' && (
          <Fieldset legend="Payment">
            <p class="pay">
              <strong>Progression : </strong>
              <div class="pay-div-contain">
                <div class="pay-div-progress" style={{ width: '70%' }} />
              </div>
              <h1 class="pay-diff">400000 F / 600000 F</h1>
            </p>
            <br />
            <div class="historical-contain">
              {months.map((month, index) => (
                <div
                  key={month}
                  style={{
                    borderRight:
                      index === months.length - 1 && '1px solid white',
                  }}
                >
                  <header
                    style={{
                      background: index < 3 ? 'var(--purple-darker)' : 'grey',
                    }}
                  >
                    {month}
                  </header>
                  <p style={{ color: index < 3 ? 'white' : 'grey' }}>10000 F</p>
                </div>
              ))}
            </div>
            <br />
            <div>
              <p>
                <strong> Remain to pay : </strong> 200000 F
              </p>
              <br />
              <p>
                <strong> Next Payment Month : </strong> January
              </p>
              <button class="pay-btn"> Make a payement </button>
            </div>
          </Fieldset>
        )}
        <DangerZone discordId={user.discordId} userId={''} />
      </Form>
    </Layout>
  )
}
