import { Div } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useEffect } from 'preact/hooks'

import { FormCourse } from './form_course.jsx'
import { FormModule } from './form_module.jsx'
import { FormProject } from './form_project.jsx'
import { FormQuiz } from './form_quiz.jsx'

css(`
   .prof-modal {
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

   .prof-modal button.close {
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

   .prof-modal input{
     border: 2px solid white;
     border-radius: 0.2rem;
     height: 40px;
     padding: 0.4rem;
     width: 100%;
     margin-bottom: 20px;
   }


   .prof-modal textarea{
    border: 2px solid white;
    border-radius: 0.2rem;
    width: 100%;
    padding: 0.4rem;
    width: 100%;
    margin-bottom: 20px;
  }

  .prof-modal-submit {
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

export const Modal = ({
  infoType,
  show,
  close,
  idModule,
  datasLength,
  data,
  setData,
}) => {
  useEffect(() => {
    if (show) {
      document.querySelector('.prof-modal').style.transform = 'scale(1)'
    }
  }, [show])

  const onSubmit = (datas) => {
    !data
      ? setData({ id: datasLength + 1, ...datas }, 'add')
      : setData({ ...data, ...datas }, 'update')
    document.querySelector('.prof-modal').style.transform = 'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div
      class="prof-modal"
      style={{
        width:
          infoType === 'quizzes'
            ? data
              ? '200px'
              : '900px'
            : infoType === 'courses'
            ? '800px'
            : '400px',
        left:
          infoType === 'quizzes'
            ? data
              ? '30%'
              : '20%'
            : infoType === 'courses'
            ? '20%'
            : '40%',
        right:
          infoType === 'quizzes'
            ? data
              ? '30%'
              : '20%'
            : infoType === 'courses'
            ? '20%'
            : '40%',
      }}
    >
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-modal').style.transform = 'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      {infoType === 'modules' && (
        <FormModule module={data} onSubmit={onSubmit} />
      )}
      {infoType === 'projects' && (
        <FormProject idModule={idModule} project={data} onSubmit={onSubmit} />
      )}
      {infoType === 'courses' && (
        <FormCourse idModule={idModule} course={data} onSubmit={onSubmit} />
      )}
      {infoType === 'quizzes' && <FormQuiz quiz={data} onSubmit={onSubmit} />}
    </Div>
  )
}
