import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import { Auth } from './page/auth.jsx'
import { Challenges } from './page/challenges.jsx'
import { Quizz } from './page/quizz.jsx'
import { Timeline } from './page/Timeline.jsx'
import {navigate,useURL} from './lib/router.js';
import {user} from './lib/auth.js';

const App = () => {
  const {pathname} = useURL();
  if(!user && pathname !== '/auth'){
    navigate('/auth');
    return null;
  }
    return (<Router>
      <Auth path="/auth" />
      <Profile path="/profil" />
      <Challenges path="/challenges" />
      <Quizz path="/challenge/:challengeId" />
      <Timeline path="/timeline" />
      <Home path="*" />
    </Router>
  )
}
render(h(App, {}), document.getElementById('root'))
