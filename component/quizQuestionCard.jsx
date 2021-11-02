import { useEffect, useState, useRef } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, P, Span } from './elements.jsx'
import { Check } from './markdown.jsx'

css(`
    .question_card {
      padding: 2ch;
      outline: 2px dashed var(--comment-darker);
      margin: 2ch;
    }

    .question_card p {
      display:flex;
      flex-direction: row;
      align-items:center;
      justify-content:flex-start;
      margin: 1ch auto;
      width: auto;
    }


    .question_card .checkCard {
      position: relative;
      height: 25px;
      width: 25px;
      margin-right: 10px;
  }

  .question_card .checkCard input {
    opacity:0;
    width:100%;
    height: 100%;
    top:0;
    position: absolute;
    z-index: 1;
 }


  .question_card .checkCard span {
    width: 100%;
    height: 100%;
    postion:absolute;
    top:0;
    z-index:0;
  }


`)

const CheckCard = ({ isManyResponse, question, resp, setAnswer }) => {
  const [isChecked, setIsChecked] = useState(false)
  let inter = null
  let input = useRef(null)

  useEffect(() => {
    if (!isManyResponse) {
      inter = setInterval(() => {
        setIsChecked(input.current.checked)
      })
    }
    return () => {
      clearInterval(inter)
    }
  }, [isManyResponse])

  return (
    <Div class="checkCard">
      <input
        ref={input}
        type={isManyResponse ? 'checkbox' : 'radio'}
        name={'input-' + question.slice(0, 5)}
        value={resp}
        onChange={(e) => {
          setIsChecked(e.target.checked)
          setAnswer(question, resp, isManyResponse)
        }}
      />
      <Check val={isChecked ? 'X' : ' '} />
    </Div>
  )
}

export const QuestionCard = ({ question, responses, ...rest }) => {
  let isManyResponse = Object.entries(responses).filter((r) => r[1]).length > 1
  return (
    <Div class="question_card">
      <h3>💡 {question} ? </h3>
      <Div class="responses">
        {Object.keys(responses).map((resp) => {
          return (
            <P
              onClick={(e) => {
                if (!e.target.type) {
                  e.target.children.length
                    ? e.target.children[0].click()
                    : e.target.parentElement.click()
                }
              }}
            >
              <CheckCard
                isManyResponse={isManyResponse}
                resp={resp}
                question={question}
                {...rest}
              />
              <Span>{resp}</Span>
            </P>
          )
        })}
      </Div>
    </Div>
  )
}
