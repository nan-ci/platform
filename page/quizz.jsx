import {QuestionCard} from '../component/quizzQuestionCard.jsx'
import {evaluations} from '../data/evaluations.js';
import {Main} from '../component/elements.jsx';
import {LogoNaN} from '../component/icons.jsx';

export const Quizz = () => {

  return <Main>
       <div class="top-bar --quiz-page">
           {h(LogoNaN)}
          <div class="badge-time">
              temps restant &bull; <span>13:12:01</span>
          </div>
       </div>

      <div class="quiz-desc">
          <h1>{evaluations[0].name}</h1>
          <h2>Quiz n° 12345</h2>
          <ul class="questions-list">
            {evaluations[0].questions.map((question,index) => <li key={index}>
                 <QuestionCard questionNumber={index+1} question={question} />
              </li>)}
          </ul>
          <button class="btn-green">Soumettre le quiz</button>
      </div>
  </Main>
}
