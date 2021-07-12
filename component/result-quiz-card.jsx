import { useState, useEffect } from 'preact/hooks'
import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { equals } from '../lib/quiz.js'
import { Quiz } from './icons.jsx'

css(`
.result-quiz-card {
  width: 100%;
  margin: 6px;
  padding:1.2rem;
  position:relative;
  border-radius: 0.5rem;
  cursor:pointer;
}

.result-quiz-card h1,.result-quiz-card h1 strong{
  font-size: 1.3em;
}
.result-quiz-card .percent {
  position: absolute;
  bottom: 20%;
  right: 10%;
  font-size: 4em;
  color:grey;
  font-weight: bolder;
  text-align:center;
}
.result-quiz-card .percent figcaption {
   color: grey;
   font-weight: bolder;
}
`)

export const QuizCard = ({
  name,
  responses,
  quiz: { questions, percentOfValidation },
}) => {
  const [result, setResult] = useState({ percent: 0, foundQuestions: 0 })
  const calculResult = () => {
    let foundQuestions = 0
    for (let k in questions) {
      if (Object.values(questions[k]).filter((t) => t).length > 1) {
        const resps = Object.entries(questions[k])
          .flatMap((val) => (val[1] ? val[0] : null))
          .filter((f) => f)
        if (equals(resps, responses[k])) foundQuestions += 1
      } else if (questions[k][responses[k]]) {
        foundQuestions += 1
      }
    }
    setResult({
      percent: (foundQuestions * 100) / Object.keys(questions).length,
      foundQuestions,
    })
  }

  useEffect(() => {
    calculResult()
  }, [])

  return (
    <Div
      class="result-quiz-card"
      style={{
        background:
          result.percent >= percentOfValidation
            ? 'linear-gradient( 90deg,#5dd48e30 50%,#04b81978 100%)'
            : 'linear-gradient(90deg,#d45d5d30 50%,#b8040478 100%)',
      }}
    >
      <h1>
        <strong>Quiz : </strong> {name}
      </h1>
      <br />
      <P>
        <strong>Questions : </strong>{' '}
        <span>{Object.keys(questions).length} </span>
      </P>
      <P>
        <strong>Questions found : </strong>
        <span>{result.foundQuestions}</span>
      </P>
      <P>
        <strong>Percent for pass : </strong>
        <span>{percentOfValidation}%</span>
      </P>
      <P>
        <strong>Status : </strong>
        <span
          style={{
            fontWeight: 'bolder',
            color: result.percent >= percentOfValidation ? 'lime' : 'red',
          }}
        >
          {result.percent >= percentOfValidation ? 'pass' : 'fail'}
        </span>
      </P>
      <figure class="percent">
        {result.percent.toString().includes('.')
          ? result.percent.toFixed(2)
          : result.percent}
        %<figcaption> percent </figcaption>
      </figure>
    </Div>
  )
}
