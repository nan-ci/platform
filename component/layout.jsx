   import {Main,Link} from './elements.jsx';
   import {LogoNaN,Menu} from './icons.jsx';
   import {Header} from './header.jsx';

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
