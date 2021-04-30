import { Layout,Title,Image,Link} from '../component/elements.jsx'
import evaluationJson from '../data/evaluations.json';

export const Evaluation = ({evaluationId}) => {
 const currentEvaluation = evaluationJson.find(ev => ev.id === +evaluationId);
  return <Layout path="/evaluations">
  <Title>Quizz n°1</Title>
  <div class="quiz-desc">
      <Image image={"illustrations/"+currentEvaluation.image} class="img-quiz-illustration" alt="illustration" />
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
