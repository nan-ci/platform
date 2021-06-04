import { logo } from '../data/ascii.js'
import { Div, P } from '../component/elements.jsx'
import { Layout } from '../component/Layout.jsx'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'

css(`
.container {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-evenly;
}
   .div {
     border:1px solid white;
     border-radius:25px;
     padding:0.4rem;
     width:300px;
     height: 200px;
   }
   .buyFormation {
     padding:0.8rem;
     outline: none;
     cursor:pointer;
     background:var(--comment-darker);
     margin:0 auto;
     margin-top:20px;
     border-radius:0.4rem;
   }
`)
const getStudentStatus = () => {
  localStorage.user = JSON.stringify({
    ...JSON.parse(localStorage.user),
    role: 'student',
  })
  location.href = '/'
}
export const Home = () => (
  <Layout>
    <br />
    <br />
    {user && (
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        {user.role === 'visitor' ? (
          <>
            <h1>
              you are enregistred like a visitor , please get the student status
              {'\n'} if you want to have full access
            </h1>
            <button class="buyFormation" onClick={getStudentStatus}>
              Get student status
            </button>
          </>
        ) : (
          <>
            <P class="username-curriculum" style={{ fontSize: '1.2rem' }}>
              Welcome back 👋, {user.name}
            </P>
          </>
        )}
      </div>
    )}
  </Layout>
)
