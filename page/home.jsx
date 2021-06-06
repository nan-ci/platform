import { logo } from '../data/ascii.js'
import { P } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { user } from '../lib/auth.js'

export const Home = () => (
  <Layout>
    <P fg="comment">{logo}</P>
    <span>Akwaba {user.name}</span>
  </Layout>
)
