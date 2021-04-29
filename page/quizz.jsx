import {QuestionCard} from '../component/quizzQuestionCard.jsx'
import evaluationJson from '../data/evaluations.json';

export const Quizz = () => {

  return <div class="main-content">
       <div class="top-bar --quiz-page">
          <svg xmlns='http://www.w3.org/2000/svg'  class="img-logoNaN" viewBox='0 0 50 50'><defs><radialGradient id='g' fy='0'><stop stop-color='#F7AEF8'/><stop offset='100%' stop-color='#777FFF'/></radialGradient></defs><path fill='url(#g)' d='M25 0L0 25l5 5 20-20 20 20 5-5M25 40l-5 5 5 5 5-5M25 20L10 35l5 5 10-10 10 10 5-5'/></svg>
          <div class="badge-time">
              temps restant &bull; <span>13:12:01</span>
          </div>
       </div>

      <div class="quiz-desc">
          <h1>{evaluationJson[0].name}</h1>
          <h2>Quiz n° 12345</h2>
          <ul class="questions-list">
            {evaluationJson[0].questions.map((question,index) => <li key={index}>
                 <QuestionCard questionNumber={index+1} question={question} />
              </li>)}
          </ul>
          <button class="btn-green">Soumettre le quiz</button>
      </div>
  </div>
}
