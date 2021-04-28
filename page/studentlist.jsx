import { useState, useEffect } from 'preact/hooks'
import { Table } from '../component/table.jsx'
import { users } from '../data/users.js'
import { Layout } from '../component/layout.jsx'

export const StudentList = () => {
  const [data, setData] = useState([])

  const extractMetaData = (item) => item.metadata

  const columns = Object.entries({
    login: {
      size: '20%',
      type: '',
      bgcolor: 'var(--orange-dark)',
      color: 'var(--red-dark)',
    },
    avatar: { size: '10%', type: '', bgcolor: 'var(--pink-dark)', color: '' },
    name: { size: '30%', type: '', bgcolor: 'var(--purple-lighter)' },
    phone: { size: '25%', type: '', bgcolor: 'var(--dark)', color: '' },
    email: {
      size: '20%',
      type: '',
      bgcolor: 'var(--cyan-darker)',
      color: 'pink',
    },
    discordId: {
      size: '40%',
      type: '',
      bgcolor: 'var(--red-light)',
      color: 'orange',
    },
    speciality: {
      size: '40%',
      type: '',
      bgcolor: 'var(--green-dark)',
      color: 'red',
    },
  })


  useEffect(() => setData(users), [])

  return data.length > 0 ? (
    <Layout>
      <span>Student list</span>
      <Table data={data.map(extractMetaData)} columns={columns} />
    </Layout>
  ) : (
    <span> No student found!</span>
  )
}
