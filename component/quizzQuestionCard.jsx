

export const QuestionCard = ({questionNumber,question}) => {
  return    <div class="question">
  <div class="question-number --answered">
      {questionNumber}
  </div>
  <p class="enonce">
     {question.enonce}
  </p>
  <div class="question-response">
    {Object.keys(question.responses).map((key,index) => <div key={index} class="checkbox-group">
          <label class="checkbox">
              <input type="checkbox" value="" /> {question.responses[key].libelle}
              <span></span>
          </label>
      </div> )}
  </div>
</div>
};

