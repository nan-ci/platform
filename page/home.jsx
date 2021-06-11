import { Fragment } from 'preact'
import { Div, P } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
import { courses } from '../data/courses.js'
import { Roadmap } from '../component/roadmap/index.jsx'
import { Progress } from '../component/icons.jsx'
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

   .t-block{
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-around;
      margin-bottom: 20px;
  }

  .t-block div {
    width:49%;
    border-radius:0.75rem;
    height:200px;
  }

  .t-block .left-block {
    background:black;
    display: flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-around;
  }

.t-block .left-block p strong {
    font-size: 1.5rem;
    margin-left:20px;
  }
.t-block .left-block p span{
    font-size: 1.3rem;
  font-weight:bolder;
}

.t-block .right-block {
  background:#575151;
  text-align:left;
  padding: 1rem;
  display:flex;
  flex-direction:row;
  align-items:flex-start;
  justify-content:flex-start;
}

.t-block .right-block div {
  width:100%;
  margin-left: 10px;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:flex-start
}

.t-block .right-block div h1 {
  font-size:2rem;
}

.t-block .right-block div p {
  width: 100%;
  margin: 7px;
}

`)
const getStudentStatus = () => {
  localStorage.user = JSON.stringify({
    ...JSON.parse(localStorage.user),
    role: 'student',
    level: 'L1-S04',
  })
  location.href = '/'
}

export const Home = () => {
  const myCours = user && courses.find((c) => c.name === user.speciality)
  return (
    <Layout>
      <br />
      <br />
      {user && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          {user.role === 'visitor' ? (
            <>
              <h1>
                you are enregistred like a visitor , please get the student
                status
                {'\n'} if you want to have full access
              </h1>
              <button class="buyFormation" onClick={getStudentStatus}>
                Get student status
              </button>
            </>
          ) : (
            <>
              <Div class="t-block">
                <Div class="left-block">
                  <P>
                    <strong>Username : </strong>
                    <span style={{ color: 'var(--orange-dark)' }}>
                      {user.username || user.name}
                    </span>
                  </P>
                  <P>
                    <strong>Spéciality : </strong>
                    <span style={{ color: 'var(--green-dark)' }}>
                      {user.speciality}
                    </span>
                  </P>
                  <P>
                    <strong>Level : </strong>
                    <span style={{ color: 'var(--cyan-dark)' }}>
                      {user.level}
                    </span>
                  </P>
                </Div>
                <Div class="right-block">
                  <Progress size={60} color="darkred" />
                  <Div>
                    <h1> Progress </h1>
                    <br />
                    <P>
                      <strong> Challenges completed : </strong>
                      <span> 5 </span>
                    </P>
                    <P>
                      <strong> Quizzes completed : </strong>
                      <span> 10 </span>
                    </P>
                    <P>
                      <strong> Projects completed : </strong>
                      <span> 20 </span>
                    </P>
                  </Div>
                </Div>
              </Div>
              <Roadmap
                modules={myCours.modules}
                cours={myCours.cours}
                userLevel={user.level}
              />
            </>
          )}
        </div>
      )}
    </Layout>
  )
}
