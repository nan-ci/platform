import { Div, P } from '../../component/elements'
import { logo } from '../../data/ascii'
import { css } from '../../lib/dom'
import { API } from '../../lib/env'
import { user } from '../../lib/auth.js'
import { navigate } from '../../lib/router'
import { Form, Input } from '../../component/form.jsx'
import { useState } from 'preact/hooks'
import { profs } from '../../data/profs.js'
import { Alert } from '../../component/alert.jsx'

css(`
  .prof-div-login {
    display:flex;
    min-height:100vh;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }

  .prof-div-login h1 {
    border:2px solid white;
    border-radius:0.2rem;
    padding: 0.5rem;
    font-size: 2rem;
    margin-bottom: 50px;
  }
    .prof-login-input {
      border:1px solid white;
      border-radius:0.2rem;
      padding:0.4rem;
      height:40px;
      width: 300px;
      margin-bottom: 20px;
    }

    .prof-login-form {
      border:2px solid white;
      border-radius:0.2rem;
      padding: 3rem;
      position:relative;
    }

    .prof-login-submit-button {
      background: var(--comment-darker);
      padding: 0.5rem;
      width: 300px;
      position:absolute;
      bottom:10px;
      left:50%;
      right:50%;
      transform:translate(-50%,-50%);
      cursor:pointer;
    }
`)

export const Login = () => {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })

  const [notFound, setNotFound] = useState(false)

  const SignIn = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const prof = profs.find(
      (p) => p.email === data.email && data.password === p.password,
    )
    if (prof) {
      delete prof.password
      return (location.href = `/professor/dashboard?${new URLSearchParams({
        ...prof,
        login: prof.name,
      })}`)
    } else {
      setNotFound(true)
    }
  }

  return (
    <Div class="prof-div-login" style={{ whiteSpace: 'pre' }}>
      <h1>NaN - Professor Auth</h1>
      <Alert
        alert={notFound}
        message="Email ou mot de passe incorrect"
        color="red"
      />
      <Form
        class="prof-login-form"
        submit="Log In"
        buttonClassName="prof-login-submit-button"
        onSubmit={SignIn}
      >
        <Input
          class="prof-login-input"
          inputType="input"
          name="email"
          type="email"
          comment="Enter you Email"
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          class="prof-login-input"
          inputType="input"
          name="password"
          type="password"
          comment="Enter you password"
          errors={errors}
          updateErrors={setErrors}
        />
      </Form>
    </Div>
  )
}
