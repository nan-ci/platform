import { render } from 'preact'
import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import {Auth} from './page/auth.jsx';
import {Evaluations} from './page/evaluations.jsx';
import {Timeline} from './page/timeline.jsx';
import {Evaluation} from './page/evaluation.jsx';
import {Quizz} from './page/quizz.jsx';

const App = () => (
      <Router>
          <Auth path="/auth" />
          <Profile path="/profil" />
          <Evaluations path="/evaluations" />
          <Quizz path="/evaluation/quizz"/>
          <Evaluation path="/evaluation/:evaluationId"/>
          <Timeline path="/timeline" />
          <Home path="*" />
      </Router>
);

render(h(App, {}), document.getElementById('root'))
