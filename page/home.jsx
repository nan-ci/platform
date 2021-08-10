import { Div, P } from '../component/elements.jsx'
import { API } from '../lib/env.js'
import { navigate } from '../lib/router.js'
import { Layout } from '../component/layout.jsx'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
import { courses } from '../data/courses.js'
import { Roadmap } from '../component/roadmap/index.jsx'
import { get } from '../api/db.js'
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
     text-decoration:none;
   }

   .t-block{
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-around;
      margin-bottom: 20px;
  }


  .t-block .left-block {
    background:black;
    width: 40%;
    border-radius:0.75rem;
    height:200px;
    position:relative;
  }

  .t-block .left-block p.title {
     position:absolute;
     top:10px;
     right:10px;
     font-weight:bolder;
  }

  .t-block .left-block .block-co {
    margin-top:30px;
    width:100%;
    text-align:left;
  }

  .t-block .left-block .block-co div {
   padding:0 1rem;
   margin: 7px;
  }

  .t-block .left-block button {
    background: var(--comment-darker);
    padding:0.4rem;
    margin:4px;
    margin-top: 10px;
    cursor:pointer;
  }


.t-block .right-block {
  background:#575151;
  width:58%;
  border-radius:0.75rem;
  height:200px;
}

`)
const getStudentStatus = async () => {
  localStorage.user = JSON.stringify({
    ...JSON.parse(localStorage.user),
    role: 'student',
    level: 'L1-S04',
  })
  location.href = '/'
}

export const Home = () => {
  const course = user && courses.find((c) => c.name === user.speciality)
  return (
    <Layout>
      <br />
      <P class="username-curriculum">Welcome back 👋, {user.name}</P>
      <br />
      {user && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          {user.role === 'visitor' ? (
            <Fragment>
              <h1>
                you are enregistred like a visitor , please get the student
                status
                {'\n'} if you want to have full access
              </h1>
              <button
                class="buyFormation"
                onClick={
                  () => getStudentStatus()
                  //   (location.href = `${API}/user/updateRoleToStudent`)
                }
              >
                Get student status
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <Div class="t-block">
                <Div class="left-block">
                  <P class="title">Next step</P>
                  <Div class="block-co">
                    <Div>
                      <h6>Quizz variables</h6>
                      <p style={{marginTop: 10}}>
                        <strong>Challenges</strong> check if a number is a test
                        value
                      </p>
                    </Div>
                    <Div>
                      <button> Go to quizz </button>
                      <button
                        style={{
                          background: 'transparent',
                          color: 'var(--comment-darker)',
                          border: '1px solid var(--comment-darker)',
                        }}
                      >
                        Go to challenge
                      </button>
                    </Div>
                  </Div>
                </Div>
                <Div class="right-block">
                  <Roadmap
                    modules={course.modules}
                    cours={course.cours}
                    userLevel={user.level}
                  />
                </Div>
              </Div>
            </Fragment>
          )}
        </div>
      )}
    </Layout>
  )
}
