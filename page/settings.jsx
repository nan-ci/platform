import { useState } from 'preact/hooks'
import { Title } from '../component/elements.jsx'
import { Layout } from '../component/layout.jsx'
import { user } from '../lib/auth.js'
import { css } from '../lib/dom.js'

css(`
.input-settings{
  outline: none;
  color: var(--yellow-dark);
  border: 1px solid var(--white);
  padding: 0.6em;
  width: 100%;
  margin: 10px 0px;
}
.hr-settings{
  border: 2px dashed var(--grey-lighter);
  margin: 15px 0px;
}
.btn-settings{
  background: var(--purple-darker);
  padding:7px;
  width: 25%;
  cursor: pointer;
  margin: 10px 0px;
}
`)

export const Settings = () => {
  const [account, setAccount] = useState(
    user || {
      name: '',
      username: '',
      avatar: '',
      biography: '',
      location: '',
      github: ''
    },
  )

  const handleAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const submitAccount = (e) => {
    e.preventDefault()
    localStorage.user = JSON.stringify(account)
  }
  return (
    <Layout>
      <center>Account settings for {user.name}</center>
      <form onSubmit={submitAccount}>
        <Title>Username</Title>
        <input
          class="input-settings"
          name="username"
          value={account.username || user.username}
          onChange={handleAccount}
        />
        <br />
        <Title>Name</Title>
        <input
          class="input-settings"
          name="name"
          value={account.name || user.name}
          onChange={handleAccount}
        />
        <br />
        <Title>Location</Title>
        <input
          class="input-settings"
          name="location"
          value={account.location || user.location}
          onChange={handleAccount}
        />
        <br />
        <Title>Picture</Title>
        <input
          class="input-settings"
          name="avatar"
          value={account.avatar || user.avatar}
          onChange={handleAccount}
        />
        <br />
        <Title>Github</Title>
        <input
          class="input-settings"
          name="github"
          disabled
          value={user.github}
        />
        <br />
        <Title>Biography</Title>
        <textarea
          class="input-settings"
          rows={2}
          name="biography"
          value={account.biography || user.biography}
          onChange={handleAccount}
        />
        <br />
        <button type="submit" class="btn-settings">
          Save
        </button>
      </form>
    </Layout>
  )
}
