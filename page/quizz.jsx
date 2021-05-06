import { QuizzCard } from '../component/quizzcard.jsx'
import { challenges } from '../data/challenges.js'
import { Main } from '../component/elements.jsx'
import { LogoNaN } from '../component/icons.jsx'
import { css } from '../lib/dom.js'

css(`
.--quiz-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #171721;
}
  .quiz-desc {
    margin-left: 3rem;
  }
  .badge-time {
    color: #b0b0bd;
    background-color: #14141c;
    padding: 10px 15px;
    font-size: 1.5rem;
    display: inline-block;
    border-radius: 4px; }
    .badge-time span {
      color: #b33128;
    }
  .quizz-section {
    display: flex;
    flex-flow: row wrap;
    margin: 2rem;
   }
`)

export const Quizz = () => {
  return (
    <Main>
      <div class="top-bar --quiz-page">
        {h(LogoNaN)}
        <div class="badge-time">
          remaining time &bull; <span>13:12:01</span>
        </div>
      </div>
      <div class="quiz-desc">
        <section class="quizz-header">
          <h1>{challenges[0].name}</h1>
          <h2>Percentage of validation: 60%</h2>
        </section>
        <section class="quizz-section">
          {challenges[0].quizz.flatMap((quizz, index) => (
            <QuizzCard key={quizz.title} quizz={quizz} index={index} />
          ))}
        </section>
        <button class="btn-green">Submit</button>
      </div>
    </Main>
  )
}
