import { Link } from '../component/elements.jsx'
import { Img } from '../component/image.jsx'
import { css } from '../lib/dom.js'
import { API } from '../lib/env.js'
import { Icon } from '../component/elements.jsx'
import { user } from '../lib/auth.js'

css(`
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex; }
  @media only screen and (max-width: 62em) {
    .login-page {
      display: block; } }
.lg-illustration {
  flex: 1;
  background: linear-gradient(#15151d61, #15151d), url(/assets/img/christina.jpg);
  background-position: center;
  background-size: cover; }
  @media only screen and (max-width: 62em) {
    .lg-illustration {
      height: 30rem;
      background: url(/assets/img/christina.jpg);
      background-position-y: -335px;
      background-size: cover; } }
  @media only screen and (max-width: 48em) {
    .lg-illustration {
      background-position-y: -189px; } }
  @media only screen and (max-width: 36em) {
    .lg-illustration {
      height: 25rem;
      background-position-y: -62px; } }
  .lg-illustration img {
    object-fit: cover;
    opacity: .1; }

.login-box {
  text-align: center;
  flex: 2;
  display: flex;
  background: var(--background-light);
  align-items: center;
  justify-content: center; }
  @media only screen and (max-width: 62em) {
    .login-box {
      display: block;
      padding: 5rem 2rem; } }

.lg-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 4.5rem;
  color: #f4f2f2;
  margin-bottom: 4rem; }
  @media only screen and (max-width: 36em) {
    .lg-title {
      font-size: 3.5rem; } }

.social-connexion {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  padding: 1rem;
  border-radius: 25px;
  background-color: var(--background-dark);
  width: 25rem;
  margin: 0 auto 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all .1s;
  box-shadow: -1px 0px 9px 1px #19171778;

  background-size: 40%; }
  @media only screen and (max-width: 36em) {
    .social-connexion {
      width: 100%; text-align: center;} }

.social-connexion:hover {
  border: 1px solid #545dd3; }

.social-connexion svg {
  height: 3rem;
  width: 3rem;
  margin-right: 2rem;
  fill: #fff; }

.social-connexion span {
  font-size: 1.5rem;
  color: var(--foreground-lighter);
}
.span-title {
  color: white;
  font-size: 2em;
  margin: 10px;
}
`)

export const Auth = () => {
  return (
    <>
      <div className="lg-illustration">
        <Icon
          icon="LogoNaN"
          style={{ width: '500px', height: '500px', opacity: '0.10' }}
        />
      </div>
      <div className="login-box">
        <div>
          <h1 className="lg-title">Not A Number</h1>
          <ul>
            {user ? (
              <li>
                <Link href={`${API}/link/discord`}>
                  <div className="social-connexion">
                    <Icon icon="Discord" />
                    <span>Login with Discord</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li>
                <Link href={`${API}/link/github`}>
                  <div className="social-connexion">
                    <Icon icon="Github" />
                    <span>Login with Github</span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
