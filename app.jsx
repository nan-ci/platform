import { render } from 'preact'

import { logo, center } from './data/ascii.js'
import { user } from './lib/auth.js'
import { Header } from './component/header.jsx'
import { Main, Footer, P, divider, Link } from './component/elements.jsx'
import { Router } from './lib/router.js'

render(
  <>
    <Header user={user} />
    <Router>
      <Main path="/profile">
        Profile :)
      </Main>
      <Main path="*">
        <P fg="comment">{logo}</P>
      </Main>
    </Router>
    <Footer>
      {divider}
      <P fg="comment">{center('Work in progress - NaN - Abidjan')}</P>
      {divider}
    </Footer>
  </>,
  document.getElementById('root'),
)
