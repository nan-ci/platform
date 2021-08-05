import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { useState, useEffect } from 'preact/hooks'
import { Form, Input } from '../form.jsx'

css(`
   .prof-quizzes-modalQuiz {
     width: 900px;
     background: black;
     position:absolute;
     top:20%;
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
  height: 170px;
  overflow:auto;
}

.prof-quizzes-modalQuiz-question-component .responses::-webkit-scrollbar{
  width: 5px;
}


.prof-quizzes-modalQuiz-question-responses-component{
  display:flex;
  flex-direction:row;
  align-items:flex-end;
  padding: 0.5rem;
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
  updateResponses,
  errors,
  updateErrors,
}) => {
  const sup = (index) => {
    updateResponses((count) => {
      count[qind].responses.splice(index, 1)
      return [...count]
    })
  }

  return (
    <Div class="prof-quizzes-modalQuiz-question-responses-component">
      <input
        type="text"
        onKeyUp={(e) => {
          updateResponses((count) => {
            count[qind].responses[ind].value = e.target.value
            return [...count]
          })
        }}
        value={responses[ind].value}
      />
      <label class="container">
        isTrue
        <input
          type="checkbox"
          onChange={(e) => {
            updateResponses((count) => {
              count[qind].responses[ind].isTrue = e.target.checked
              return [...count]
            })
          }}
          checked={responses[ind].isTrue}
        />
        <span class="check-box"></span>
      </label>

      {responses.length > 1 && (
        <button
          onClick={(e) => {
            e.preventDefault()
            sup(ind)
          }}
        >
          x
        </button>
      )}
    </Div>
  )
}

const QuestionComponent = ({
  currentInd,
  questions,
  updateCurrentQuestion,
  updateQuestions,
  errors,
  updateErrors,
}) => {
  return (
    <Div class="prof-quizzes-modalQuiz-question-component">
      <input
        class="prof-quizzes-modalQuiz-input"
        type="text"
        onKeyUp={(e) =>
          updateQuestions((quests) => {
            quests[currentInd].question = e.target.value
            return [...quests]
          })
        }
        value={questions[currentInd].question}
      />
      <br />
      <span>responses ({questions[currentInd].responses.length})</span>
      <Div class="responses">
        {questions[currentInd].responses.map((r, index) => (
          <ResponseQuestionComponent
            qind={currentInd}
            ind={index}
            responses={questions[currentInd].responses}
            errors={errors}
            updateResponses={updateQuestions}
            updateErrors={updateErrors}
          />
        ))}
      </Div>
      <Div class="group_buttons">
        <button
          style={{ background: 'purple' }}
          onClick={(e) => {
            e.preventDefault()
            updateQuestions((count) => {
              count[currentInd].responses.push({ value: '', isTrue: false })
              return [...count]
            })
          }}
        >
          {' '}
          + response
        </button>
        {questions.length > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault()
              updateQuestions((count) => {
                if (currentInd === count.length - 1)
                  updateCurrentQuestion(currentInd - 1)
                count.splice(currentInd, 1)
                return [...count]
              })
            }}
          >
            remove question
          </button>
        )}
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

  const [questions, setQuestions] = useState(
    quiz
      ? Object.keys(quiz.questions).map((q) => {
          return {
            question: q,
            responses: Object.keys(quiz.questions[q]).map((b) => {
              return { value: b, isTrue: quiz.questions[q][b] }
            }),
          }
        })
      : [{ question: '', responses: [{ value: '', isTrue: false }] }],
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
    data.questions = {}
    for (let q of questions) {
      data.questions[q.question] = {}
      for (let r of q.responses) {
        data.questions[q.question][r.value] = r.isTrue
      }
    }
    !quiz
      ? setQuiz({ id: quizzesLength + 1, ...data }, 'add')
      : setQuiz({ ...quiz, ...data }, 'update')
    document.querySelector('.prof-quizzes-modalQuiz').style.transform =
      'scale(0)'
    setTimeout(() => close(), 200)
  }

  return (
    <Div
      class="prof-quizzes-modalQuiz"
      style={{
        width: quiz && quiz.ifQuizStart ? '300px' : '900px',
        left: quiz && quiz.ifQuizStart ? '40%' : '20%',
        right: quiz && quiz.ifQuizStart ? '40%' : '20%',
      }}
    >
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
        {!quiz || !quiz?.ifQuizStart ? (
          <>
            <Div class="left_block">
              <Input
                class="prof-quizzes-modalQuiz-input"
                inputType="input"
                type="text"
                name="name"
                value={quiz ? quiz.name : ''}
                comment="quiz name"
                required
                errors={errors}
                updateErrors={setErrors}
              />
              <Input
                class="prof-quizzes-modalQuiz-input"
                inputType="input"
                type="text"
                name="duration"
                value={quiz ? quiz.duration : ''}
                required
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
                required
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
                required
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
                required
                errors={errors}
                updateErrors={setErrors}
              />
            </Div>
            <Div class="right_block">
              <Div class="questions">
                <span>Question N°{currentQuestionIndex + 1}</span>
                <QuestionComponent
                  currentInd={currentQuestionIndex}
                  questions={questions}
                  updateQuestions={setQuestions}
                  updateCurrentQuestion={setCurrentQuestionIndex}
                  errors={errors}
                  updateErrors={setErrors}
                />
              </Div>
              <Div class="questions_length">
                {questions.map((question, index) => (
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
                    setQuestions((count) => {
                      setCurrentQuestionIndex(count.length)
                      return [
                        ...count,
                        {
                          question: '',
                          responses: [{ value: '', isTrue: false }],
                        },
                      ]
                    })
                  }}
                >
                  {' '}
                  +{' '}
                </butto>
              </Div>
            </Div>
          </>
        ) : (
          <Input
            class="prof-quizzes-modalQuiz-input"
            inputType="input"
            type="datetime-local"
            name="endDate"
            comment="end date of the quiz"
            value={quiz ? quiz.endDate : ''}
            required
            errors={errors}
            updateErrors={setErrors}
          />
        )}
      </Form>
    </Div>
  )
}
