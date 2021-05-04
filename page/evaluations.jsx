import {Title,GridContainer} from '../component/elements.jsx'
import {Img} from '../component/image.jsx';
import {Layout} from '../component/layout.jsx'
import {EvaluationCard} from '../component/evaluationCard.jsx';
// import {DashedCard} from '../component/dashedCard.jsx';
import {evaluations} from '../data/evaluations.js';


export const Evaluations = () => {
  return <Layout>
      <Title>Evaluations</Title>
      <GridContainer class="u-mb-3">
        {/* <DashedCard data={{imgSource:"icons/riddle.svg",number:123,libelle:"quizz passés en 1234"}}/>
        <DashedCard data={{imgSource:"icons/success.svg",number:13,libelle:"quizz validés"}}/>
        <DashedCard data={{imgSource:"icons/failure.svg",number:12,libelle:"quizz échoué"}}/> */}
      </GridContainer>

      <Title>Travail à faire</Title>
      <GridContainer>
          {evaluations.map((data,index)=><EvaluationCard key={index} data={data}/>)}
      </GridContainer>
</Layout>

}
