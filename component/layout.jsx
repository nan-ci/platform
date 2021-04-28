import { Header } from './header.jsx'
import { Footer } from './footer.jsx'
import { Main } from './elements.jsx'

export const Layout = ({ children }) => (
  <Main>
    <Header />
    <div>{children}</div>
    <Footer />
  </Main>
)
