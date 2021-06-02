import { logo } from '../data/ascii.js'
import { P } from '../component/elements.jsx'
import { Layout } from '../component/Layout.jsx'

export const Home = () => (
  <Layout>
    <P fg="comment">{logo}</P>
    <span>Akwaba Emmanuel</span>
  </Layout>
)
