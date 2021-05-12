   import {Main,Link} from './elements.jsx';
   import {LogoNaN,Menu} from './icons.jsx';
   import {Header} from './header.jsx';
   import {css} from '../lib/dom.js';

   css(`
   .top-bar {
    padding: 1.5rem 2rem; }
   `);

   export const Layout = ({children}) => {
    return <>
    <Header />
    <Main>
      <div class="top-bar">
        {h(Menu)}
        <Link href="/">
          {h(LogoNaN)}
        </Link>
      </div>
      {children}
    </Main>
  </>
   }
