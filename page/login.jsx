import { useState } from 'preact/hooks'
import { P } from '../component/elements.jsx'
import { css } from '../lib/dom.js'
import { Form, Input, Button } from '../component/form.jsx'
import { Github } from '../component/icons.jsx'
import { API } from '../lib/env.js'
import { logo } from '../data/ascii'

css(`
.vl {
  height: 220px;
  border: 1px solid white;
}
.form-div{
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
  justify-content: space-around;
}
`)

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail = ({ target }) => setEmail(target.value)
  const onChangePassword = ({ target }) => setPassword(target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <P fg="comment" style={{ fontSize: 13, textAlign: 'center' }}>
        {logo.split('#').join('')}
      </P>
      <div class="form-div">
        <Button
          value="Sign in with Github"
          link={`${API}/link/github`}
          icon={Github}
        />
        <div class="vl"></div>
        <Form title="Signin with email" submit="Sign in" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Email"
            width={20}
            value={email}
            onChange={onChangeEmail}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            width={20}
            value={password}
            onChange={onChangePassword}
            required
          />
        </Form>
      </div>
    </>
  )
}
