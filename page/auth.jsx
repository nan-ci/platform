import { logo } from '../data/ascii.js'
import {useEffect} from 'preact/hooks';
import {user} from '../lib/auth.js';
import {Link} from '../component/elements.jsx'
import { HASH, API } from '../lib/env.js'

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
                <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"
                    fill="#fff"/>
                </svg>
                <span>Connexion via Github</span>
              </div>
            </Link>
          </li>
          {user && user.discordId && <li>
            <Link href={`${API}/link/discord`}>
              <div className="social-connexion">
                <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m3.58 21.196h14.259l-.681-2.205 1.629 1.398 1.493 1.338 2.72 2.273v-21.525c-.068-1.338-1.22-2.475-2.648-2.475l-16.767.003c-1.427 0-2.585 1.139-2.585 2.477v16.24c0 1.411 1.156 2.476 2.58 2.476zm10.548-15.513-.033.012.012-.012zm-7.631 1.269c1.833-1.334 3.532-1.27 3.532-1.27l.137.135c-2.243.535-3.26 1.537-3.26 1.537s.272-.133.747-.336c3.021-1.188 6.32-1.102 9.374.402 0 0-1.019-.937-3.124-1.537l.186-.183c.291.001 1.831.055 3.479 1.26 0 0 1.844 3.15 1.844 7.02-.061-.074-1.144 1.666-3.931 1.726 0 0-.472-.534-.808-1 1.63-.468 2.24-1.404 2.24-1.404-.535.337-1.023.537-1.419.737-.609.268-1.219.4-1.828.535-2.884.468-4.503-.315-6.033-.936l-.523-.266s.609.936 2.174 1.404c-.411.469-.818 1.002-.818 1.002-2.786-.066-3.802-1.806-3.802-1.806 0-3.876 1.833-7.02 1.833-7.02z"/>
                  <path
                    d="m14.308 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.576-1.335-1.29-1.335v.003c-.708 0-1.288.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z"/>
                  <path
                    d="m9.69 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.575-1.335-1.286-1.335l-.004.003c-.711 0-1.29.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z"/>
                </svg>
                <span>Connexion via Discord</span>
              </div>
            </Link>
          </li>}
        </ul>
      </div>
    </div> </>
}
