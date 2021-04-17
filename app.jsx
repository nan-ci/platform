import { render } from 'preact'

import { logo, center } from './data/ascii.js'
import { user } from './lib/auth.js'
import { RegistrationForm } from './component/registration_form.jsx'
import { Header } from './component/header.jsx'
import { Main, Footer, P, divider } from './component/elements.jsx'

render(
  <>
    <Header user={user} title="Akwaba NaN" />
    <Main>
      <P fg="comment">{logo}</P>
      {user && user.discordId && !user.profilData && (
        <RegistrationForm user={user} />
      )}
    </Main>
    <Footer>
      {divider}
      <P fg="comment">{center('Work in progress - NaN - Abidjan')}</P>
      {divider}
    </Footer>
  </>,
  document.getElementById('root'),
)
