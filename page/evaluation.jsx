import {Title,Link} from '../component/elements.jsx'
import {Img} from '../component/image.jsx';
import {Layout} from '../component/layout.jsx'
import {evaluations} from '../data/evaluations.js';
import {css} from '../lib/dom.js';

css(`
.quiz-desc {
  padding: 0 2rem;
  margin-top: 2rem; }
  .quiz-desc h1 {
    font-size: 2.7rem;
    margin-top: 2rem;
    margin-bottom: 1.3rem; }
  .quiz-desc .img-quiz-illustration {
    height: 30rem;
    width: 100%;
    object-fit: cover;
    border-radius: 5px; }
    @media only screen and (max-width: 36em) {
      .quiz-desc .img-quiz-illustration {
        height: 23rem; } }
  .quiz-desc .para-desc {
    font-size: 1.4rem;
    color: #b0b0bd;
    line-height: 2.6rem; }
  .quiz-desc ol {
    margin-top: 2rem; }
  .quiz-desc li {
    font-size: 1.4rem;
    line-height: 2.7rem; }
    .quiz-desc li span {
      color: #545dd3; }
    .quiz-desc li:last-child {
      margin-top: 3rem; }
`);

export const Evaluation = ({evaluationId}) => {
 const currentEvaluation = evaluations.find(ev => ev.id === +evaluationId);
  return <Layout>
  <Title>Quizz n°1</Title>
  <div class="quiz-desc">
      <Img source={"illustrations/"+currentEvaluation.image} class="img-quiz-illustration" alt="illustration" />
      <h1>{currentEvaluation.name}</h1>
      <div class="badge-time">
          temps restant &bull; <span>{currentEvaluation.time}</span>
      </div>
      <p class="para-desc">
        {currentEvaluation.description}
      </p>

      <ol>
          <li><span>Nombre de question:</span> {currentEvaluation.questions.length}</li>
          <li><span>Nombre de tentative:</span> {currentEvaluation.nbreTentatives}</li>
          <li><span>Pourcentage de validation:</span> {currentEvaluation.percentToPass}%</li>
          <li>
              <Link href="/evaluation/quizz">
                  <button class="btn-green">Passer le quiz</button>
              </Link>
          </li>
      </ol>
  </div>
</Layout>

}
