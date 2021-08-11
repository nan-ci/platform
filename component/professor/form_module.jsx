import { css } from '../../lib/dom.js'
import { useState } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`

  .prof-modal-form-submit {
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

export const FormModule = ({ module, onSubmit }) => {
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    hours: null,
    codeColor: null,
  })

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    onSubmit(data)
  }

  return (
    <Form
      submit={!module ? 'add module' : 'update module'}
      buttonClassName="prof-modal-form-submit"
      style={{ whiteSpace: 'pre', padding: '01rem' }}
      onSubmit={submit}
    >
      <Input
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
      <Input
        type="color"
        inputType="input"
        name="codeColor"
        comment="select the module code color"
        value={module ? module.codeColor : ''}
        errors={errors}
        updateErrors={setErrors}
        opacity
      />
    </Form>
  )
}
