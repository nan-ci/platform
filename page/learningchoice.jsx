import { Div } from '../component/elements.jsx'
import { Input, Form, Select } from '../component/form.jsx'
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
`)

export const LearningChoice = () => {
  let [errors, setErrors] = useState({})
  if (!user) {
    return navigate('/login')
  }
  const send = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const { why, speciality } = Object.fromEntries(form)
    if (!why) {
      setErrors((d) => {
        return { ...d, why: 'You must fill this input' }
      })
      return
    }
    location.href = `${API}/link/discord?speciality=${speciality}`
  }

  return (
    <Div class="div-learning">
      <Form
        submit="Submit"
        onSubmit={send}
        style={{ textAlign: 'center' }}
        title="Fill this form below"
      >
        <Input
          name="why"
          comment="Why do you want to join NaN?"
          errors={errors}
          type="text"
        />
        <br />
        <br />
        <Select
          name="speciality"
          comment="What do you want to learn 📚 ?"
          errors={errors}
          value={Object.keys(specialities)[0]}
        >
          {Object.entries(roles).map(([key, { name, color }]) => (
            <option value={key}>{name}</option>
          ))}
        </Select>
      </Form>
    </Div>
  )
}
