import { css } from '../lib/dom'
import { Main } from './elements'
import { Footer } from './footer'
import { Header } from './header'

css(`
.children {
  height: calc(100vh - 14vh);
  overflow: scroll;
  y-overflow: scroll;
  x-overflow: hidden;
  padding: 10px;
  padding-bottom: 30px;
}
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--green-light);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--foreground);
}
`)

export const Layout = ({ children }) => (
  <Main>
    <Header />
    <div className="children">{children}</div>
    <Footer />
  </Main>
)
