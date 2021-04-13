import * as Icons from './icons.jsx'

/*
  This file contains all basic components
*/

const iconStyle = { style: { marignLeft: '2em' } }
export const FatLink = ({ icon, children, color, ...props }) => (
  <a {...props}>
    <b {...(color && { style: { background: color } })}>
      {Icons[icon] ? h(Icons[icon], iconStyle) : null}
      {children}
    </b>
  </a>
)
