import { useState, useEffect } from 'preact/hooks'
import { Div, divider, P } from '../../component/elements.jsx'
import { Img } from '../../component/image.jsx'
import { Layout } from '../../component/layout.jsx'
import { API } from '../../lib/env.js'
import { TimelineTable } from '../../component/timeline-table.jsx'
import { timeline } from '../../data/timeline.js'
import { user } from '../../lib/auth.js'
import { css } from '../../lib/dom.js'
import { Progress } from '../../component/icons.jsx'
import { courses } from '../../data/courses.js'
import { QuizCard } from '../../component/student/result-quiz-card.jsx'

import moment from 'moment'

css(`
.user-info{
  display: flex;
  flex-flow: row wrap;
  align-items: center
  width: 100%;
}

.infos {
   display:flex;
   flex-flow: column wrap;
   align-items:flex-start;
   margin-left:20px;
   width: 70%;
}
.infos header {
  background:var(--red-dark);
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 10px;
}
 .infos-section {
   display:flex;
   flex-flow:row wrap;
   align-items:center;
   justify-content: space-between;
}
.infos-section p{
  margin-top: 10px;
  width:50%;
}
._info{
  margin: 5px 0px;
  font-size: 1.2rem;
}
.user-img{
  border-radius: 50%;d
  margin: 10px 0px;
  width: 18%;
}

. group {
  width: 100%;
}

.group nav {
  background: #3c3d3f;
}

.group nav button {
  background: transparent;
  padding: 0.7rem;
  cursor:pointer;
 outline:none;
 color:white;
border-radius:0px;
}

.group nav button.active {
  background: #272729;
  border-top: 1px solid red;
}



.content {
  width: 100%;
  height:400px;
  background: #272729;
}

.content .tab-pane {
  width: 100%;
  height: :100%;
  display:none;
  padding: 1rem;
  transition:all 1s ease-in-out;
}

.content .tab-pane.active{
  display:block;
}

.tab-pane .p-block {
  display:flex;
  flex-direction:row;
  align-items:flex-start;
}

.tab-pane .p-block .contain {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:flex-start;
}

.tab-pane .p-block .contain header{
   font-size: 1.5rem;
   font-weight:bolder;
  }

  .tab-pane .p-block .contain header{
    font-size: 1.5rem;
    font-weight:bolder;
   }

   .tab-pane .p-block .contain div{
     margin-top: 10px;
     margin-left: 10px;
   }


   .tab-pane.projects .pcard {
     position:relative;
     width: 100%;
     padding: 0.6rem;
     padding-bottom: 2rem;
     height: auto;
     cursor:pointer;
     border-radius: 0.5rem;
     background:linear-gradient( 90deg,#5dd48e30 50%,#04b81978 100%);
   }


   .tab-pane.projects .pcard  h1{
    font-size: 2rem;
    color:white;
}

   .tab-pane.projects .pcard p{
     margin-top: 10px;
   }

   .tab-pane.projects .pcard p strong{
     font-weight:bold;
     color:grey;
  }

  .tab-pane.projects .pcard p span{
    color:white;
  }


  .tab-pane.projects .pcard .note{
    position:absolute;
    top: 20%;
    right:7%;
    font-size: 5rem;
    color:grey;
    font-weight:bolder;
  }





`)

export const Profile = () => {
  const [data, setData] = useState([])
  const getTimeline = (item) => item
  const [userQuizzes, setUserQuizzes] = useState(null)
  const [quizzes, setQuizzes] = useState(null)

  useEffect(() => setData(timeline), [])

  const columns = Object.entries({
    name: {
      size: '25%',
      type: '',
    },
    link: {
      size: '25%',
      type: '',
    },
    note: {
      size: '25%',
      type: '',
    },
    date: {
      size: '25%',
      type: '',
    },
  })

  const [activeTab, setActiveTab] = useState('stats')

  useEffect(async () => {
    if (!quizzes) {
      setQuizzes(courses.find((c) => c.name === user.speciality).quizzes)
    } else if (!userQuizzes) {
      const resp = await (await fetch(`${API}/user/quizzes`)).json()
      if (resp.data) {
        for (let k in resp.data) {
          if (
            moment().isBefore(
              (quizzes.find((q) => q.name === k) &&
                quizzes.find((q) => q.name === k).endDate) ||
                resp.data[k].end_date,
            ) &&
            !resp.data[k].submit
          )
            delete resp.data[k]
        }
        setUserQuizzes(resp.data)
      }
    }
  }, [quizzes, userQuizzes])

  return (
    <Layout>
      <Div class="user-info">
        <Img
          uri="https://randomuser.me/api/portraits/women/13.jpg"
          size={120}
          className="user-img"
        />
        <Div class="infos">
          <header>Profile</header>
          <Div class="infos-section">
            <P>
              <strong>Username: </strong>{' '}
              <span>{user.username ?? user.name}</span>
            </P>
            <P>
              <strong>Name: </strong>
              <span>{user.name}</span>
            </P>
            <P>
              <strong>Email: </strong>
              <span>{user.email}</span>
            </P>
            <P>
              <strong>Speciality: </strong>
              <span>{user.speciality}</span>
            </P>
            <P>
              <strong>Level: </strong> <span>{user.level ?? 'No level'}</span>
            </P>
            <P>
              <strong> Member since: </strong>{' '}
              <span>
                {' '}
                {new Date().toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </P>
            <P>
              <strong>Role: </strong> <span>{user.role}</span>
            </P>
          </Div>
        </Div>
      </Div>
      {user && user.role === 'student' && (
        <>
          {divider}
          <Div class="group">
            <nav>
              <button
                class={`${activeTab === 'stats' && 'active'}`}
                onClick={() => setActiveTab('stats')}
              >
                stats
              </button>
              <button
                class={`${activeTab === 'challenges' && 'active'}`}
                onClick={() => setActiveTab('challenges')}
              >
                challenges - results
              </button>
              <button
                class={`${activeTab === 'quizzes' && 'active'}`}
                onClick={() => setActiveTab('quizzes')}
              >
                quizzes - results
              </button>
              <button
                class={`${activeTab === 'projects' && 'active'}`}
                onClick={() => setActiveTab('projects')}
              >
                projects - results
              </button>
            </nav>
            <Div class="content">
              <Div
                class={`tab-pane ${activeTab === 'stats' && 'active'}`}
                id="stats"
              >
                <Div class="p-block">
                  <Progress size={60} color="darkred" />
                  <Div class="contain">
                    <header> Progress </header>
                    <Div>
                      <P>
                        <strong> challenges completed : </strong> 10
                      </P>
                      <P>
                        <strong> quizzes passed : </strong> 20
                      </P>
                    </Div>
                  </Div>
                </Div>
              </Div>
              <Div
                class={`tab-pane challenges ${
                  activeTab === 'challenges' && 'active'
                }`}
                id="challenges"
              >
                <h1>challenges - results </h1>
              </Div>
              <Div
                class={`tab-pane quizzes ${
                  activeTab === 'quizzes' && 'active'
                }`}
                id="quizzes"
              >
                {userQuizzes &&
                  Object.keys(userQuizzes).map((key) => {
                    return (
                      quizzes.find((q) => q.name === key) && (
                        <QuizCard
                          key={key}
                          name={key}
                          responses={userQuizzes[key].responses}
                          quiz={quizzes.find((q) => q.name === key)}
                        />
                      )
                    )
                  })}
              </Div>
              <Div
                class={`tab-pane projects ${
                  activeTab === 'projects' && 'active'
                }`}
                id="projects"
              >
                <Div class="pcard">
                  <h1> Project : commerce</h1>
                  <P>
                    <strong> your link : </strong>
                    <span>https://google.com</span>
                  </P>
                  <P>
                    <strong> status : </strong> <span> fail </span>
                  </P>
                  <P class="note"> 17/20 </P>
                </Div>
              </Div>
            </Div>
          </Div>
          {divider}
        </>
      )}
    </Layout>
  )
}
