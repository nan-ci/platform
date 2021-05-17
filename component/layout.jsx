import { Main, Link, Icon } from './elements.jsx'
import { Header } from './header.jsx'
import { css } from '../lib/dom.js'

css(`
   .top-bar {
    padding: 1.5rem 2rem; }
   `)

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <div class="top-bar">
          <Icon icon="Menu" />
          <Link href="/">
            <Icon icon="LogoNaN" />
          </Link>
        </div>
        {children}
      </Main>
    </>
  )
}
