import { css } from '../lib/dom.js'

css(`
.result-card {
  background-color: #343644;
  padding: 2rem;
  border-radius: 3px;
  position: relative; }
   .result-card::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -5rem;
    height: 3px;
    width: 4.8rem;
    background-color: #343644; }
   .result-card.--pass {
    border: 2px solid #28837383; }
  .result-card.--fail {
    border: 2px solid #a54a4a83; }
   .result-card .rs-title {
    font-size: 1.8rem;
    font-weight: 500; }
   .result-card p {
    font-size: 1.4rem;
    font-weight: 300;
    color: #b0b0bd; }
    .sp-link {
      color: #545dd3; }
`)

export const ResultCard = ({ data }) => {
  return (
    <div class={`result-card ${data.pass ? '--pass' : '--fail'}`}>
      <span class="rs-title">{data.quizz.name}</span>
      <p>&bull; soumis le {data.submitionDate}</p>
      <p>
        &bull; Pourcentage obtenu:{' '}
        {((data.foundQuestions * 100) / data.quizz.questions.length).toFixed(2)}
        % ~ {data.foundQuestions} bonnes réponses sur{' '}
        {data.quizz.questions.length}
      </p>
      <p>&bull; taux de validation: {data.taux}%</p>
      <br />
      <p>
        <a href="#" class="sp-link">
          Relecture
        </a>
      </p>
    </div>
  )
}
