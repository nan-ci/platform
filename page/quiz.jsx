import { Div, P, Span } from '../component/elements.jsx'
import { MTitle } from '../component/markdown.jsx'
import { css } from '../lib/dom.js'
import { Form } from '../component/form.jsx'
import quiz from '../data/fakeQuiz.json'
import { QuestionCard } from '../component/quizQuestionCard.jsx'

css(`
  .quiz {
    width: 100%;
    height: auto;
  }
  .quiz .questions-container {
    width: 100%;
    height:700px;
    overflow-x:hidden;
  }

  .quiz .options {
    display:flex;
    width: 100%;
    align-items:center;
     justify-content: space-between;
  }

`)

export const Quiz = () => {
  return (
    <Div class="quiz">
      <MTitle.h2>{quiz.name}</MTitle.h2>
      {'\n'}
      <Div class="options">
        <P>
          {' '}
          > Time Remaining : <Span bg="selection">[05:25]</Span>
        </P>
        <P>
          Answered :{' '}
          <Span bg="selection" fg="comment-lighter">
            [14/20]
          </Span>
        </P>
      </Div>
      {'\n'}
      <Div class="questions-container">
        <Form submit="submit" title="Answer questions and submit">
          {Object.keys(quiz.questions).map((question) => {
            return (
              <QuestionCard
                key={question}
                question={question}
                responses={quiz.questions[question]}
              />
            )
          })}
        </Form>
      </Div>
      {'\n'}
    </Div>
  )
}
