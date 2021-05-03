   import {useEffect} from 'preact/hooks';
   import {Main,Link} from './elements.jsx';
   import {LogoNaN,Menu} from './icons.jsx';
   import {Header} from './header.jsx';
   import {css} from '../lib/dom.js';
   import {useURL} from '../lib/router.js';

   css(`
   .top-bar {
    padding: 1.5rem 2rem; }
   `);

   export const Layout = ({children}) => {
    const {pathname:path} = useURL();
    // add and delete of some tag link in the head of the html structure (the login page needs some external fonts link);
    useEffect(() => {
      if(path !== "/auth"){
        document.querySelectorAll('.headLink').forEach(el => {
          document.head.removeChild(el);
        });
      }
      document.body.setAttribute('class',"dark-theme");
      document.body.firstChild.setAttribute('class','main-block');
    }, []);


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
