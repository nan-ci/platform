import { center } from "../data/ascii";
import { divider, P } from "./elements";

export const Footer = () => (
  <footer>
    {divider}
    <P fg="comment">{center('Work in progress - NaN - Abidjan')}</P>
    {divider}
  </footer>
)
