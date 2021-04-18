import { logo } from '../data/ascii.js'
import { Main, P } from '../component/elements.jsx'

export const Home = () =>
  <Main>
    <P fg="comment">{logo}</P>
    <span>Akwaba</span>
  </Main>
