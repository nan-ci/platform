import { divider, P } from './elements.jsx'
import { center } from '../data/ascii'

export const Footer = () => (
  <footer>
    {divider}
    <P fg="comment">{center('Work in progress - NaN - Abidjan')}</P>
    {divider}
  </footer>
)
