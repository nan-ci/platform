import { css } from '../lib/dom.js';

import {Img} from './image.jsx';

css(`
.dashed-card {
  border: 2px dashed #313139;
  border-radius: 6px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex; }
  .dashed-card img {
    height: 5rem; }
  .dashed-card div {
    padding-left: 2rem; }
  .dashed-card span {
    font-size: 2rem;
    display: block; }
  .dashed-card small {
    font-size: 1.3rem;
    font-weight: 300; }
`)

export const DashedCard = ({data}) => {
  return   <div class="dashed-card">
  <Img source={data.imgSource} alt="icons" />
  <div>
      <span>{data.number}</span>
      <small>{data.libelle}</small>
  </div>
</div>
}
