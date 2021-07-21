import { center } from '../data/ascii'
import { css } from '../lib/dom'
import { divider, P } from './elements'

css(`
footer{
  position: fixed;
  bottom: 0;
  background: var(--white-dark);
}
`)

export const Footer = () => (
  <footer>
    {divider}
    <P fg="comment">{center(`NaN - Abidjan © ${new Date().getFullYear()}`)}</P>
    {divider}
  </footer>
)
