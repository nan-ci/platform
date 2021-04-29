import {Link,Image} from './elements.jsx';

export const ResultCard = ({data}) => {
  return  <div class={`result-card ${data.pass ? '--pass' : '--fail'}`}>
  <span class="rs-title">{data.quizz.name}</span>
  <p>&bull; soumis le {data.submitionDate}</p>
  <p>&bull; Pourcentage obtenu: {((data.foundQuestions*100)/data.quizz.questions.length).toFixed(2)}% ~ {data.foundQuestions} bonnes réponses sur {data.quizz.questions.length}</p>
  <p>&bull; taux de validation: {data.taux}%</p>
  <br/>
  <p><a href="#" class="sp-link">Relecture</a></p>
</div>
};

