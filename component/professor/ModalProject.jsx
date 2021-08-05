import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useRef, useEffect } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`
   .prof-cours-modalProject {
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

   .prof-cours-modalProject button.close {
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

   .prof-cours-modalProject-input{
     border: 2px solid white;
     border-radius: 0.2rem;
     height: 40px;
     padding: 0.4rem;
     width: 100%;
     margin-bottom: 20px;
   }


   .prof-cours-modalProject-textarea{
    border: 2px solid white;
    border-radius: 0.2rem;
    width: 100%;
    padding: 0.4rem;
    width: 100%;
    margin-bottom: 20px;
  }

  .prof-cours-modalProject-submit {
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

export const ModalProject = ({
  show,
  close,
  projectsLength,
  project,
  setProject,
}) => {
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    beginDate: null,
    endDate: null,
  })

  useEffect(() => {
    if (show) {
      document.querySelector('.prof-cours-modalProject').style.transform =
        'scale(1)'
    }
  }, [show])

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    !project
      ? setProject({ id: projectsLength + 1, ...data }, 'add')
      : setProject({ ...project, ...data }, 'update')
    document.querySelector('.prof-cours-modalProject').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div class="prof-cours-modalProject">
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-cours-modalProject').style.transform =
            'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <Form
        class="prof-cours-modalProject-form"
        submit={!project ? 'add project' : 'update  project'}
        buttonClassName="prof-cours-modalProject-submit"
        style={{ whiteSpace: 'pre', padding: '01rem' }}
        onSubmit={submit}
      >
        {(!project || !project?.ifStart) && (
          <>
            <Input
              class="prof-cours-modalProject-input"
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
              class="prof-cours-modalProject-textarea"
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
              class="prof-cours-modalProject-input"
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
          class="prof-cours-modalProject-input"
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
    </Div>
  )
}
