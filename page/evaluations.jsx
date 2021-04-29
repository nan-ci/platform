import { Layout,Title,Image} from '../component/elements.jsx'
import {EvaluationCard} from '../component/evaluationCard.jsx';
import evaluationJson from '../data/evaluations.json';


export const Evaluations = () => {
  return <Layout>
      <Title>Evaluations</Title>
      <div class="grid-container u-pad-default u-mb-3">
          <div class="dashed-card">
              <Image image="icons/riddle.svg" alt="icons" />
              <div>
                  <span>123</span>
                  <small>quiz passés sur 1234</small>
              </div>
          </div>
          <div class="dashed-card">
              <Image image="icons/success.svg" alt="icons" />
              <div>
                  <span>13</span>
                  <small>quiz validés</small>
              </div>
          </div>
          <div class="dashed-card">
              <Image image="icons/failure.svg" alt="icons" />
              <div>
                  <span>13</span>
                  <small>quiz échoués</small>
              </div>
          </div>
      </div>

    <Title>Travail à faire</Title>

      <div class="grid-container u-pad-default">
          {evaluationJson.map((data,index)=><EvaluationCard key={index} data={data}/>)}
      </div>
</Layout>

}
