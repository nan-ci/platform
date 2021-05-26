import { Div, divider, P } from '../component/elements.jsx'
import { Layout } from '../component/Layout.jsx'
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
.user-timeline{

}
`)

export const Profile = () => (
  <Layout>
    <Div class="user-info">
      <h1 style={{ fontSize: '1.5rem', }}>{user.name}</h1>
      <span class="_info"><i class="fa fa-envelope"></i> {user.email}</span>
      <span class="_info"><i class="fa fa-map-marker"></i> Abidjan</span>
      <P class="_info">I love things about Javascript</P>
      <span class="_info">
      <i class="fa fa-calendar"></i> Joined {new Date().toGMTString()}
      </span>
    </Div>
    {divider}
    <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Timeline</h2>
    <Div class="user-timeline">

    </Div>
  </Layout>
)
