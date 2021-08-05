import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useRef, useEffect } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`
   .prof-cours-modalModule {
     width: 400px;
     background: black;
     position:absolute;
     top:20%;
     left:40%;
     right:40%;
     transform:translate(-50%,-50%);
     border:2px solid blue;
     border-radius:0.5rem;
     transform:scale(0);
     transition: all .2s ease-in-out;
   }

   .prof-cours-modalModule button.close {
     width: 40px;
     padding: 0.5rem;
     font-size: 20px;
     background: red;
     border:none;
     border-radius:2rem;
     position: absolute;
     right: -20px;
     top: -20px;
     outline: none;
    cursor:pointer;
   }

   .prof-cours-modalModule-input{
     border: 2px solid white;
     border-radius: 0.2rem;
     height: 40px;
     padding: 0.4rem;
     width: 100%;
     margin-bottom: 20px;
   }


   .prof-cours-modalModule-textarea{
    border: 2px solid white;
    border-radius: 0.2rem;
    width: 100%;
    padding: 0.4rem;
    width: 100%;
    margin-bottom: 20px;
  }

  .prof-cours-modalModule-submit {
      padding: 0.4rem;
      width: 200px;
      position: absolute;
      bottom:-23px;
      left: 50%;
      right: 50%;
      transform: translate(-50%,-50%);
      cursor:pointer;
      margin-bottom: 20px;
      background : var(--comment-darker)
  }


`)

export const ModalModule = ({
  show,
  close,
  modulesLength,
  module,
  setModule,
}) => {
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    hours: null,
  })

  useEffect(() => {
    if (show) {
      document.querySelector('.prof-cours-modalModule').style.transform =
        'scale(1)'
    }
  }, [show])

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    !module
      ? setModule({ id: modulesLength + 1, ...data, projects: [] }, 'add')
      : setModule({ ...module, ...data }, 'update')
    document.querySelector('.prof-cours-modalModule').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div class="prof-cours-modalModule">
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-cours-modalModule').style.transform =
            'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <Form
        class="prof-cours-modalModule-form"
        submit={!module ? 'add module' : 'update module'}
        buttonClassName="prof-cours-modalModule-submit"
        style={{ whiteSpace: 'pre', padding: '01rem' }}
        onSubmit={submit}
      >
        <Input
          class="prof-cours-modalModule-input"
          type="text"
          inputType="input"
          name="name"
          comment="Enter the module Name"
          value={module ? module.name : ''}
          required
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          class="prof-cours-modalModule-textarea"
          type="textarea"
          rows="5"
          inputType="textarea"
          name="description"
          required
          comment="Enter the module Description"
          value={module ? module.description : ''}
          errors={errors}
          updateErrors={setErrors}
        />
        <Input
          class="prof-cours-modalModule-input"
          type="number"
          rows="5"
          inputType="input"
          name="hours"
          comment="How many hours to learn the module"
          required
          value={module ? module.hours : 0}
          errors={errors}
          updateErrors={setErrors}
        />
      </Form>
    </Div>
  )
}
