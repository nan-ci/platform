import { render } from 'preact'

import { Router } from './lib/router.js'
import { Profile } from './page/profile.jsx'
import { Home } from './page/home.jsx'
import {Auth} from './page/auth.jsx';
import {Evaluations} from './page/evaluations.jsx';
import {Results} from './page/results.jsx';
import {Evaluation} from './page/evaluation.jsx';
import {Quizz} from './page/quizz.jsx';

const App = () => (
      <Router>
          <Auth path="/auth" />
          <Profile path="/profil" />
          <Evaluations path="/evaluations" />
          <Quizz path="/evaluation/quizz"/>
          <Evaluation path="/evaluation/:evaluationId"/>
          <Results path="/results" />
          <Home path="*" />
      </Router>
)

render(h(App, {}), document.getElementById('root'))
