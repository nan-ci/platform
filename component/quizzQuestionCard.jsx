import {css} from '../lib/dom.js';

css (`
.question {
  background-color: #121219;
  padding: 5rem 2rem 2rem;
  border-radius: 5px;
  position: relative; }
  .question-number {
    position: absolute;
    width: 5rem;
    height: 5rem;
    border-radius: 5px;
    background-color: #121219;
    border: 4px solid #171721;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -2rem;
    left: 2rem; }
    .question-number.--answered {
      background-color: #5c9e95; }

.enonce {
  color: #2c82c5; }

/* --------------------
    checkbox
-------------------- */
.checkbox-group {
  padding: .5rem 0;
  display: flex; }

.question-response {
  margin-top: 2rem; }

.checkbox {
  padding-left: 30px;
  position: relative;
  cursor: pointer;
  color: #b0b0bd; }

.checkbox input[type="checkbox"] {
  display: none; }

.checkbox span {
  display: block;
  height: 20px;
  width: 20px;
  position: absolute;
  left: 0;
  top: 7px;
  border-radius: 10%;
  border: 1px solid #b0b0bd93; }

.checkbox span::after {
  content: '';
  height: 8px;
  width: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  border-radius: 10%;
  background-color: #f2f5ff;
  -webkit-transition: .3s ease-in-out 0s;
  transition: .3s ease-in-out 0s; }

.checkbox input[type="checkbox"]:checked ~ span {
  border: 3px solid #74a5e9; }

.checkbox input[type="checkbox"]:checked ~ span::after {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
  border: 3px solid #74a5e9;
  background-color: #74a5e9; }
`)


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

