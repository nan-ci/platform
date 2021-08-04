import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useRef, useEffect } from 'preact/hooks'
import { Form, Input, Row } from '../form.jsx'

css(`
   .prof-quizzes-modalQuiz {
     width: 900px;
     background: black;
     position:absolute;
     top:5%;
     left:20%;
     right:20%;
     transform:translate(-50%,-50%);
     border:2px solid blue;
     padding-bottom: 2rem;
     border-radius:0.5rem;
     transform:scale(0);
     transition: all .2s ease-in-out;
   }

   .prof-quizzes-modalQuiz-form {
     display:flex;
     flex-direction: row;
     align-items:flex-start;
     justify-content:center;
   }

   .prof-quizzes-modalQuiz-form .left_block{
     width:30%;
  }

  .prof-quizzes-modalQuiz .right_block{

    margin-left: 20px;
      width:60%;
  }

   .prof-quizzes-modalQuiz button.close {
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

   .prof-quizzes-modalQuiz-input{
     border: 2px solid white;
     border-radius: 0.2rem;
     height: 40px;
     padding: 0.4rem;
     width: 100%;
     margin-bottom: 20px;
   }


   .prof-quizzes-modalQuiz-textarea{
    border: 2px solid white;
    border-radius: 0.2rem;
    width: 100%;
    padding: 0.4rem;
    width: 100%;
    margin-bottom: 20px;
  }

  .prof-quizzes-modalQuiz-submit {
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

  .prof-quizzes-modalQuiz-form .questions {
    width:100%;
    height:400px;
  }

  .prof-quizzes-modalQuiz-form .questions  span{
    font-weight:bolder;
    color: var(--purple-darker);
  }



  .prof-quizzes-modalQuiz-form .questions_length {
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
  }

  .prof-quizzes-modalQuiz-form .questions_length .question_button{
      padding: 0.5rem 01rem;
      background: var(--comment-darker);
      outline:none;
      font-weight:bolder;
      cursor:pointer;
      margin: 5px;
      text-align:center;
  }

  .prof-quizzes-modalQuiz-form .questions_length .question_button.active{
      background: transparent;
      border:1px solid var(--comment-darker);
      color: white;
  }

  .prof-quizzes-modalQuiz-form .questions_length .question_add{
    padding: 0.5rem;
    background: purple;
    font-size: 1rem;
    outline:none;
    font-weight:bolder;
    cursor:pointer;
}

.prof-quizzes-modalQuiz-question-component{
  width: 100%;
  height:100%;
}


.prof-quizzes-modalQuiz-question-component .group_buttons  {
  width:100%;
  display:flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

}

.prof-quizzes-modalQuiz-question-component .group_buttons button {
     padding: 0.5rem;
     cursor:pointer;
     outline:none;
     background: purple;
     font-weight:bolder;
     background: red;
     margin: 5px;
}

.prof-quizzes-modalQuiz-question-component .responses{
  width: 100%;
  height: 175px;
  overflow:auto;
}

.prof-quizzes-modalQuiz-question-component .responses::-webkit-scrollbar{
  width: 5px;
}


.prof-quizzes-modalQuiz-question-responses-component{
  display:flex;
  flex-direction:row;
  align-items:flex-end;
  padding-top: -5px;
  justify-content:space-between;
}

.prof-quizzes-modalQuiz-question-responses-component input[type="text"]{
border:2px solid white;
padding:0.4rem;
width:100%;
height: 40px;
}



.prof-quizzes-modalQuiz-question-responses-component button{
    padding: 0.5rem;
    text-align:center;
    background: red;
    font-weight:bolder;
    outline:none;
    width: 40px;
    cursor:pointer;
}

.prof-quizzes-modalQuiz-question-responses-component .container{
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  display:flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.prof-quizzes-modalQuiz-question-responses-component .container input{
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.prof-quizzes-modalQuiz-question-responses-component .container .check-box{
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width:  20px;
  background-color: #eee;
}

.prof-quizzes-modalQuiz-question-responses-component .container:hover input ~ .check-box {
  background-color: #ccc;
}

.prof-quizzes-modalQuiz-question-responses-component .container input:checked ~ .check-box {
  background-color: #2196F3;
}

.prof-quizzes-modalQuiz-question-responses-component .container input:checked ~ .check-box:after {
    display: block;
}

.prof-quizzes-modalQuiz-question-responses-component .container .check-box:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  content: "";
  position: absolute;
  display: none;
}


`)

const ResponseQuestionComponent = ({
  qind,
  ind,
  responses,
  updateCountQuestion,
  errors,
  updateErrors,
}) => {
  const sup = (index) => {
    updateCountQuestion((count) => {
      count[qind].splice(index, 1)
      return [...count]
    })
  }

  return (
    <Div class="prof-quizzes-modalQuiz-question-responses-component">
      <Input
        inputType="input"
        type="text"
        name={`question${qind}-response${ind}`}
        value={responses ? Object.keys(responses)[ind] : ''}
        errors={errors}
        updateErrors={updateErrors}
      />
      <label class="container">
        isTrue
        <input type="checkbox" name={`question${qind}-isTrue${ind}`} />
        <span class="check-box"></span>
      </label>

      <button
        onClick={(e) => {
          e.preventDefault()
          sup(ind)
        }}
      >
        x
      </button>
    </Div>
  )
}

const QuestionComponent = ({
  ind,
  currentInd,
  responses,
  questions,
  updateCurrentQuestion,
  updateCountQuestions,
  errors,
  updateErrors,
}) => {
  return (
    <Div
      class="prof-quizzes-modalQuiz-question-component"
      style={{ display: ind === currentInd ? 'block' : 'none' }}
    >
      <Input
        class="prof-quizzes-modalQuiz-input"
        inputType="input"
        type="text"
        name={`question${ind}`}
        value={questions ? Object.keys(questions)[ind] : ''}
        errors={errors}
        updateErrors={updateErrors}
      />
      <span>responses ({responses.length})</span>
      <Div class="responses">
        {responses.map((r, index) => (
          <ResponseQuestionComponent
            qind={ind}
            responses={questions && questions[Object.keys(questions)[ind]]}
            ind={index}
            errors={errors}
            updateCountQuestion={updateCountQuestions}
            updateErrors={updateErrors}
          />
        ))}
      </Div>
      <Div class="group_buttons">
        <button
          onClick={(e) => {
            e.preventDefault()
            updateCountQuestions((count) => {
              if (ind === count.length - 1) updateCurrentQuestion(ind - 1)
              count.splice(ind, 1)
              return [...count]
            })
          }}
        >
          remove question
        </button>
        <button
          style={{ background: 'purple' }}
          onClick={(e) => {
            e.preventDefault()
            updateCountQuestions((count) => {
              count[ind].push(responses.length)
              return [...count]
            })
          }}
        >
          {' '}
          + response
        </button>
      </Div>
    </Div>
  )
}

export const ModalQuiz = ({ show, close, quizzesLength, quiz, setQuiz }) => {
  const [errors, setErrors] = useState({
    name: null,
    duration: null,
    percentOfValidation: null,
    beginDate: null,
    endDate: null,
  })

  const [countQuestions, setCountQuestions] = useState(
    quiz
      ? Object.keys(quiz.questions).map((v, i) =>
          Object.keys(quiz.questions[v]).map((v2, i2) => i2),
        )
      : [[0]],
  )

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (show) {
      document.querySelector('.prof-quizzes-modalQuiz').style.transform =
        'scale(1)'
    }
  }, [show])

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    !quiz
      ? setQuiz({ id: quizzesLength + 1, ...data }, 'add')
      : setQuiz({ ...quiz, ...data }, 'update')
    document.querySelector('.prof-quizzes-modalQuiz').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div class="prof-quizzes-modalQuiz">
      <button
        class="close"
        onClick={() => {
          document.querySelector('.prof-quizzes-modalQuiz').style.transform =
            'scale(0)'
          setTimeout(() => close(), 200)
        }}
      >
        &times;
      </button>
      <Form
        class="prof-quizzes-modalQuiz-form"
        submit={!quiz ? 'add quiz' : 'update quiz'}
        buttonClassName="prof-quizzes-modalQuiz-submit"
        style={{ whiteSpace: 'pre', padding: '01rem' }}
        onSubmit={submit}
      >
        <Div class="left_block">
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="text"
            name="name"
            value={quiz ? quiz.name : ''}
            comment="quiz name"
            errors={errors}
            updateErrors={setErrors}
          />
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="text"
            name="duration"
            value={quiz ? quiz.durationi : ''}
            comment="quiz duration (00:00:00)"
            errors={errors}
            updateErrors={setErrors}
          />
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="number"
            name="percentOfValidation"
            comment="percent to  pass the quiz"
            value={quiz ? quiz.percentOfValidation : ''}
            errors={errors}
            updateErrors={setErrors}
          />
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="datetime-local"
            name="beginDate"
            comment="begin date of the quiz"
            value={quiz ? quiz.beginDate : ''}
            errors={errors}
            updateErrors={setErrors}
          />
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="datetime-local"
            name="endDate"
            comment="end date of the quiz"
            value={quiz ? quiz.endDate : ''}
            errors={errors}
            updateErrors={setErrors}
          />
        </Div>
        <Div class="right_block">
          <Div class="questions">
            <span>Question N°{currentQuestionIndex + 1}</span>
            {countQuestions.map((responses, index) => (
              <QuestionComponent
                key={index}
                ind={index}
                currentInd={currentQuestionIndex}
                responses={responses}
                questions={quiz && quiz.questions}
                updateCurrentQuestion={setCurrentQuestionIndex}
                updateCountQuestions={setCountQuestions}
                errors={errors}
                updateErrors={setErrors}
              />
            ))}
          </Div>
          <Div class="questions_length">
            {countQuestions.map((question, index) => (
              <button
                key={index}
                class={`question_button ${
                  index === currentQuestionIndex && 'active'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentQuestionIndex(index)
                }}
              >
                {index + 1}
              </button>
            ))}
            <butto
              class="question_add"
              onClick={(e) => {
                e.preventDefault()
                setCountQuestions((count) => {
                  return [...count, [[0]]]
                })
              }}
            >
              {' '}
              +{' '}
            </butto>
          </Div>
        </Div>
      </Form>
    </Div>
  )
}
