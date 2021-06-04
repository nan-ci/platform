import { Div, P } from '../component/elements.jsx'
import { Input, Form } from '../component/form.jsx'
import { specialities } from '../data/discord.js'
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
  white-space:pre;
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

.input{
  padding:0.5rem;
  border: 2px solid white;
  width:300px;
}
.send {
   padding:0.5rem;
   background:var(--comment-darker);
   cursor:pointer;
}

`)

export const LearningChoice = () => {
  let [errors, setErrors] = useState({})
  let [col, setCol] = useState('6585772')
  if (!user) return navigate('/login')
  if (user && user.discordId) return navigate('/')

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
    <Div class="div-learning" >
      <Form
        submit="submit"
        style={{ textAlign: 'center' }}
        onSubmit={send}
        buttonClassName="send"
      >
        <Input
          inputType="textarea"
          name="why"
          comment="Why do you want to join NaN?"
          errors={errors}
          type="textarea"
          className="input"
        />
        <br />
        <br />
        <Input
          inputType="select"
          name="speciality"
          comment="What do you want to learn 📚 ?"
          errors={errors}
          value={Object.keys(specialities)[0]}
          className="input"
        >
          {Object.entries(specialities).map(([key, { name }]) => (
            <option value={key}>{name}</option>
          ))}
        </Input>
      </Form>
    </Div>
  )
}
