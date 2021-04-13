import { render } from 'preact'

import { user } from './lib/auth.js'
import { Header } from './component/header.jsx'

render(<Header user={user} page="index" />, document.getElementById('root'))
