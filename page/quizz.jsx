import {QuestionCard} from '../component/quizzQuestionCard.jsx'
import {evaluations} from '../data/evaluations.js';
import {Main} from '../component/elements.jsx';
import {LogoNaN} from '../component/icons.jsx';
import { css } from '../lib/dom.js';

css(`
.--quiz-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #171721; }

  .badge-time {
    color: #b0b0bd;
    background-color: #14141c;
    padding: 10px 15px;
    font-size: 1.5rem;
    display: inline-block;
    border-radius: 4px; }
    .badge-time span {
      color: #b33128; }

  .questions-list {
    margin-top: 7rem;
    margin-bottom: 7rem; }

`);


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
