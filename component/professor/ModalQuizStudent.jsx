import { Div, P } from '../elements.jsx'
import { useEffect } from 'preact/hooks'
import { API } from '../../lib/env.js'
import { css } from '../../lib/dom.js'
import { Table } from '../table.jsx'

css(`
.prof-quizzes-modalQuizStudent {
  width: 700px;
  background: black;
  position:absolute;
  top:20%;
  left:25%;
  right:25%;
  transform:translate(-50%,-50%);
  border:2px solid blue;
  padding-bottom: 2rem;
  padding: 0.5rem;
  border-radius:0.5rem;
  text-align:center;
  transform:scale(0);
  transition: all .2s ease-in-out;
}

.prof-quizzes-modalQuizStudent button.close {
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

.prof-quizzes-modalQuizStudent h1 {
   font-size: 1.5rem;
   text-decoration: underline;
}

.prof-quizzes-modalQuizStudent span {
     color: grey;
     font-weight:bolder;
     display:block;
     margin-top: 10px;
}

`)

export const ModalQuizStudent = ({ show, close, quiz, students }) => {
  const columns = Object.entries({
    student: {
      size: '40%',
      bgcolor: '#444',
      color: 'transparent',
    },
    questions_found: {
      size: '20%',
      bgcolor: '#444',
      color: 'transparent',
    },
    percent: {
      size: '20%',
      bgcolor: '#444',
      color: 'transparent',
    },
    status: {
      size: '20%',
      bgcolor: '#444',
      color: 'none',
    },
  })

  useEffect(() => {
    if (show) {
      document.querySelector('.prof-quizzes-modalQuizStudent').style.transform =
        'scale(1)'
    }
  }, [show])

  return (
    <Div class="prof-quizzes-modalQuizStudent">
      <button
        class="close"
        onClick={() => {
          document.querySelector(
            '.prof-quizzes-modalQuizStudent',
          ).style.transform = 'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <h1>Results quiz ({quiz.name})</h1>
      <span>percent of validation : {quiz.percentOfValidation} %</span>
      <br />
      <Table data={students} columns={columns} />
    </Div>
  )
}
