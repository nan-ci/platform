import { Div, P } from '../elements.jsx'
import { css } from '../../lib/dom.js'
import { Module } from '../icons'

css(`
   .prof-quizzes-moduleCard {
      width: 100%;
      height: auto;
      padding: 0.5rem;
      border: 1px solid #444;
      background:#7675530d;
      margin: 20px 0px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
      border-radius: 0.5rem;
      cursor:pointer;
      transition: all .2s ease-in-out;
   }


   .prof-quizzes-moduleCard svg {
     width:20%;
   }

   .prof-quizzes-moduleCard .left_block{
     position: relative;
     width: 80%;
     padding: 0 0.6rem;
   }

   .prof-quizzes-moduleCard .left_block h1{
      font-size: 2rem;
      font-weight:bolder;
  }

  .prof-quizzes-moduleCard .left_block p{
    margin-top: 6px;
    white-space:normal
  }

  .prof-quizzes-moduleCard .left_block .buttons_group{
    float: right;
    margin-top: 20px;
    bottom: 5px;
    font-weight:bolder;
  }

  .prof-quizzes-moduleCard .left_block .buttons_group button{
    padding: 0.5rem;
    margin: 5px;
    cursor:pointer;
    border-radius:0.4rem;
    outline:none;
  }

`)

export const QuizCard = ({
  data: { id, name, questions, beginDate, endDate, time },
  setQuizToUpdate,
}) => {
  return (
    <Div class="prof-quizzes-moduleCard">
      <Module size={90} color="white" />
      <Div class="left_block">
        <h1>{name}</h1>
        <P>
          <span style={{ color: 'grey' }}> Time : </span>
          {time}
        </P>
        <Div class="buttons_group">
          <button
            style={{ background: 'dodgerblue' }}
            onClick={(e) => {
              e.stopPropagation()
              setQuizToUpdate(id)
            }}
          >
            {' '}
            Modify{' '}
          </button>
          <button
            style={{ background: 'var(--red-darker)' }}
            onClick={(e) => {
              e.stopPropagation()
              setQuizToUpdate(id, 'delete')
            }}
          >
            {' '}
            Delete{' '}
          </button>
        </Div>
      </Div>
    </Div>
  )
}
