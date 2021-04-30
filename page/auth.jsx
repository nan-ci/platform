import { logo } from '../data/ascii.js'
import {useEffect} from 'preact/hooks';
import {user} from '../lib/auth.js';
import {Link} from '../component/elements.jsx'
import { HASH, API } from '../lib/env.js'
import {Github,Discord} from '../component/icons.jsx';

export const Auth = () => {

  useEffect(() => {
      document.body.setAttribute('class','simple-theme');
      document.body.firstChild.setAttribute('class','login-page');
  }, []);

  return  <><div className="lg-illustration">
    <img src="img/logo-nan.png" alt="logo" />
  </div>
    <div className="login-box">
      <div>
        <h1 className="lg-title">Not A Number</h1>
        <form className="form-login">
          <div className="input-group">
            <input type="text" placeholder="adresse mail" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="••••••••" />
          </div>
          <button>Connexion</button>

          <a href="#">Mot de passe oublié ?</a>
        </form>
        <div className="lg-separator">
          <hr className="lg-divider" />
          <span>ou</span>
        </div>
        <ul>
          <li>
            <Link  href={`${API}/link/github`}>
              <div className="social-connexion">
                {h(Github)}
                <span>Connexion via Github</span>
              </div>
            </Link>
          </li>
          {user && user.discordId && <li>
            <Link href={`${API}/link/discord`}>
              <div className="social-connexion">
                {h(Discord)}
                <span>Connexion via Discord</span>
              </div>
            </Link>
          </li>}
        </ul>
      </div>
    </div> </>
}
