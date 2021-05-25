import { Main } from './elements'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }) => (
  <Main>
    <Header />
    {children}
    <Footer />
  </Main>
)
