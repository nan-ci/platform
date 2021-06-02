import { Div, P } from '../component/elements.jsx'
import { Input, Form, Select } from '../component/form.jsx'
import { NavLink, parseColor } from '../component/header.jsx'
import { roles } from '../data/discord.js'
import { css } from '../lib/dom.js'
import { API } from '../lib/env.js'
import { useState } from 'preact/hooks'
import { user } from '../lib/auth.js'
import { navigate } from '../lib/router.js'

css(`
.div-learning {
  display: flex;
  min-height: 100vh;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.navlink-learning{
  margin: 5px 0px;
}
.navlink-learning:hover{
  background: var(--white);
}
.title-learning{
  font-size: 2.4rem;
  margin: 5px 0px;
}
`)

export const LearningChoice = () => {
  let [errors, setErrors] = useState({})
  if (!user) {
    navigate('/login')
    return
  }
  const send = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const { why, speciality } = Object.fromEntries(form)
    if (!why) {
      setErrors((d) => {
        return { ...d, why: 'you must fill this input' }
      })
      return
    }
    location.href = `${API}/link/discord?speciality=${speciality}`
  }

  return (
    <Div class="div-learning">
      <Form
        submit="Go"
        onSubmit={send}
        style={{ textAlign: 'center' }}
        title="Formulaire"
      >
        <Input
          name="why"
          comment="why do you want to join NaN?"
          errors={errors}
          type="text"
        />
        <br />
        <br />
        <Select
          name="speciality"
          comment="why do you want to learn 📚 ?"
          errors={errors}
          value={Object.keys(roles)[0]}
        >
          {Object.entries(roles).map(([key, { name, color }]) => (
            <option value={key} style={{ background: color, color: 'white' }}>
              {name}
            </option>
          ))}
        </Select>
      </Form>

      {/* <P class="title-learning">What do you want to learn 📚 ?</P>
      {Object.entries(roles).map(([key, { name, color }]) => (
        <span class="navlink-learning" key={key}>
          <NavLink
            href={`${API}/link/discord?speciality=${key}`}
            style={{ color: parseColor(color), fontSize: 35 }}
          >
            {name}
          </NavLink>
        </span>
      ))} */}
    </Div>
  )
}
