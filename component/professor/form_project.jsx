import { css } from '../../lib/dom.js'
import { useState } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`
  .prof-project-form-submit {
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

export const FormProject = ({ idModule, project, onSubmit }) => {
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    beginDate: null,
    endDate: null,
  })

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    onSubmit(project ? data : { idModule, ...data })
  }

  return (
    <Form
      submit={!project ? 'add project' : 'update  project'}
      buttonClassName="prof-project-form-submit"
      style={{ whiteSpace: 'pre', padding: '01rem' }}
      onSubmit={submit}
    >
      {(!project || !project?.ifStart) && (
        <>
          <Input
            type="text"
            inputType="input"
            name="name"
            comment="Enter the project Name"
            value={project ? project.name : ''}
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
            comment="Enter the project description"
            value={project ? project.description : ''}
            errors={errors}
            updateErrors={setErrors}
          />
          <Input
            type="datetime-local"
            inputType="input"
            name="beginDate"
            comment="Enter the begin date of the project"
            required
            value={project ? project.beginDate : ''}
            errors={errors}
            updateErrors={setErrors}
          />
        </>
      )}
      <Input
        type="datetime-local"
        inputType="input"
        name="endDate"
        comment="Enter the end date of the project"
        required
        value={project ? project.endDate : ''}
        errors={errors}
        updateErrors={setErrors}
      />
    </Form>
  )
}
