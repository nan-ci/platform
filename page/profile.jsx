import { useState, useEffect } from 'preact/hooks'
import { Div, divider, P } from '../component/elements.jsx'
import { Img } from '../component/image.jsx'
import { Layout } from '../component/layout.jsx'
import { TimelineTable } from '../component/timeline-table.jsx'
import { timeline } from '../data/timeline.js'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'
import { Progress } from '../component/icons.jsx'

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
  background:black;
  width: 500px;
  padding: 0.5rem
}
 .infos-section {
   display:flex;
   flex-direction: row;
   flex-wrap: wrap;
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

`)

export const Profile = () => {
  const [data, setData] = useState([])
  const getTimeline = (item) => item

  useEffect(() => setData(timeline), [])

  const columns = Object.entries({
    challenge: {
      size: '50%',
      type: '',
      bgcolor: 'var(--orange-dark)',
    },
    solution: { size: '25%', type: '', bgcolor: 'var(--pink-dark)', color: '' },
    date: { size: '25%', type: '', bgcolor: 'var(--purple-lighter)' },
  })

  const [activeTab, setActiveTab] = useState('stats')

  return (
    <Layout>
      <Div class="user-info">
        <Img
          uri="https://randomuser.me/api/portraits/women/13.jpg"
          size={120}
          className="user-img"
        />
        <Div class="infos">
          <header>informations</header>
          <Div class="infos-section">
            <P>
              <strong> Username : </strong>{' '}
              <span>{user.username ? user.username : user.name}</span>
            </P>
            <P>
              <strong> Name : </strong> <span>{user.name}</span>
            </P>
            <P>
              <strong> Email : </strong> <span>{user.email}</span>
            </P>
            <P>
              <strong> Speciality : </strong> <span>{user.speciality}</span>
            </P>
            <P>
              <strong> Level : </strong>{' '}
              <span>{user.level || 'aucun niveau'}</span>
            </P>
            <P>
              <strong> Member since : </strong>{' '}
              <span> {new Date().toGMTString()}</span>
            </P>
            <P>
              <strong> Role : </strong> <span>{user.role}</span>
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
                class={`tab-pane ${activeTab === 'challenges' && 'active'}`}
                id="challenges"
              >
                <h1>challenges - results </h1>
              </Div>
              <Div
                class={`tab-pane ${activeTab === 'quizzes' && 'active'}`}
                id="quizzes"
              >
                <h1>quizzes - results </h1>
              </Div>
            </Div>
          </Div>
          {divider}
          <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Timeline</h2>
          <TimelineTable data={data.map(getTimeline)} columns={columns} />
        </>
      )}
    </Layout>
  )
}
