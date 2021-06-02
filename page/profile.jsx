import { useState, useEffect } from 'preact/hooks'
import { Div, divider, P } from '../component/elements.jsx'
import { Img } from '../component/image.jsx'
import { Layout } from '../component/Layout.jsx'
import { TimelineTable } from '../component/timeline-table.jsx'
import { timeline } from '../data/timeline.js'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'

css(`
.user-info{
  display: flex;
  flex-flow: column wrap;
  align-items: center
}
._info{
  margin: 5px 0px;
  font-size: 1.2rem;
}
.user-img{
  border-radius: 50%;
  margin: 10px 0px;
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
      bgcolor: 'var(--orange-dark)'
    },
    solution: { size: '25%', type: '', bgcolor: 'var(--pink-dark)', color: '' },
    date: { size: '25%', type: '', bgcolor: 'var(--purple-lighter)' }
  })

  return (
    <Layout>
      <Div class="user-info">
        <Img
          uri="https://randomuser.me/api/portraits/women/13.jpg"
          size={150}
          className="user-img"
        />
        <h1 style={{ fontSize: '1.5rem' }}>{user.name}</h1>
        <span class="_info">
          <i class="fa fa-envelope"></i> {user.email}
        </span>
        <span class="_info">
          <i class="fa fa-map-marker"></i> {user.location}
        </span>
        <P class="_info">{user.biography}</P>
        <span class="_info">
          <i class="fa fa-calendar"></i> Joined {new Date().toGMTString()}
        </span>
      </Div>
      {divider}
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Timeline</h2>
      <TimelineTable data={data.map(getTimeline)} columns={columns} />
    </Layout>
  )
}
