import { render } from 'preact'

import { logo } from './data/ascii.js'
import { user } from './lib/auth.js'
import { RegistrationForm } from './component/registration_form.jsx'
import { Header } from './component/header.jsx'
import { Main, Footer, P } from './component/elements.jsx'

render(
  <>
    <Header user={user} title="Akwaba NaN" />
    <Main>
     <P fg="comment">{logo}</P>
      <RegistrationForm />
    </Main>
    <Footer>
      <P fg="comment">
# Work in progress - NaN - Abidjan
      </P>
    </Footer>
  </>,
  document.getElementById('root'),
)
