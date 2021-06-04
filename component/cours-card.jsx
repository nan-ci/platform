import { css } from '../lib/dom'
import { Div } from './elements'
import { NavLink } from './header'

css(`
.card {
  position:relative;
  min-width:300px;
  min-height:400px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
  inset -5px -5px 15px rgba(255, 255, 255, 0.1),
  5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius:15px;
  margin: 30px;
  transition: 0.5s;
}

.card .box {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: #2a2b2f;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.card .box.unlock:hover{
  transform:translatey(-50px)
}
.card .box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
}
.card .box .content {
  padding: 20px;
  text-align: center;
}

.card .box .content h2 {
  position: absolute;
  top: -10px;
  right: 30px;
  font-size: 7rem;
  font-weight:bolder;
  color: rgba(255, 255, 255, 0.1);
}

 .card .box .content .h3 {
  font-size: 1.8rem;
  color: #fff;
  z-index: 1;
  transition: 0.5s;
  margin-bottom: 15px;
 }
 .card .box .content p {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  text-align:left;
  transition: 0.5s;
 }

 .card .box .content a {
  position: relative;
  display: inline-block;
  padding: 8px 20px;
  background: black;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  cursor:pointer;
 }
 .card .box .content a.locked {
  background:grey;
  cursor:not-allowed;
 }

 .card .box .content a.unlocked {
  background:var(--comment-darker);
 }

 .tooltip {
     background:black;
     padding:0.5rem;
     border-radius:0.5rem;
     position:absolute;
     top:-70px;
     left:-100%;
     width: 300px;
     display:none;
 }

 a.locked:hover .tooltip {
     display:block;
 }
`)

export const CoursCard = ({
  data: { id, title, description },
  index,
  moduleName,
}) => (
  <Div class="card">
    <Div class={`box ${index <= 0 && 'unlock'}`}>
      <Div class="content">
        <h2>#0{index + 1}</h2>
        <h3 class="h3">{title}</h3>
        <p>{description}</p>
        <a
          href={
            index <= 0 && `/cours?moduleName=${moduleName}&coursName=${title}`
          }
          class={index > 0 ? 'locked' : 'unlocked'}
        >
          {index > 0 && (
            <div class="tooltip">
              you must pass the previous cours to unlocked this cours
            </div>
          )}
          {index > 0 ? 'locked' : 'Go to cours'}
        </a>
      </Div>
    </Div>
  </Div>
)
