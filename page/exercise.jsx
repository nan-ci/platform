import { css } from '../lib/dom.js'
import { Main, Div, P } from '../component/elements.jsx'
import { name, description } from '../data/fakeExercise.json'

css(`
     .exercise{
       width:100%;
       height: auto;
     }

     .exercise>h1 {
       font-size: 2rem;
       font-weight:bolder;
     }



     .exercise>hr {
       width: 100%;
       height:2px;
       background: grey;
       margin-top: 5px;
     }

     .exercise p.description {
         white-space:normal !important;
         background: #090c12a8;
         color: grey;
         margin: 10px auto;
         padding:1rem;
         border-radius:0.3rem;
    }

    .exercise .instructions h3{
      font-size:2rem;
    }

    .exercise .instructions ul {
      margin-left:50px;
    }

    .exercise .instructions ul li {
      display:block;
      margin:7px auto;
      font-weight:bolder;
      font-size:1.2rem;
    }

    .exercise .instructions ul li:before {
       content:'👉';
       font-size: 1.5rem;
       margin-right:10px;

    }

    .exercise .notions {
      width:100%;
      height: auto;
      padding: 0.5rem;
      border-radius: 0.7rem;
      background:#110909;
      margin-top: 18px;
    }

    .exercise .notions h1 {
      font-size:1.7rem;
      margin-top: -18px;
    }

    .exercise .notions h1 span {
      color: yellow;
      font-weight:bolder;
      font-size: 3rem;
      margin-right: 10px;
    }

    .exercise .notions p{
      white-space:normal !important;
      font-size:1.2rem;
    }

    .exercise .notions ul {
       margin-top: 10px;
    }

    .exercise .notions ul li {
      display:block;
      width:0px;
      background: grey;
      font-size:1rem;
      margin: 7px 0;
      cursor:pointer;
      font-style:oblique;
    }

    .exercise .notions ul li:hover{
      color: skyblue;
      font-weight:bolder;
    }

    .exercise .notions ul li:before{
      content:'🔗';
      font-size: 1rem;
    }

`)
export const Exercise = () => (
  <Main>
    <Div class="exercise">
      <h1>&#x270D; {name}</h1>
      <hr />
      <P class="description">{description}</P>
      <Div class="instructions">
        <h3>&#x1F4CB; Instructions </h3>
        <ul>
          <li>do this</li>
          <li>do that</li>
          <li>do more</li>
        </ul>
      </Div>
      <Div class="notions">
        <h1>
          <span>⚠</span>Warning
        </h1>
        <P> to do this exercise you should know the following concepts : </P>
        <ul>
          <li> progession </li>
          <li> progession </li>
          <li> progession </li>
        </ul>
      </Div>
    </Div>
  </Main>
)
