import * as Icons from './icons.jsx'

/*
  This file contains all basic components
*/

const iconStyle = { style: { marignLeft: '2em' } }
export const FatLink = ({ icon, children, ...props }) => (
  <a {...props}>
    <b>
      {Icons[icon] ? h(Icons[icon], iconStyle) : null}
      {children}
    </b>
  </a>
)
