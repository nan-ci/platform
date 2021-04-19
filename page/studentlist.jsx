import { useState, useEffect } from 'preact/hooks'
import { Main } from '../component/elements.jsx'
import { Table } from '../component/table.jsx'
import { users } from '../data/users.js'

export const StudentList = () => {
  const [data, setData] = useState([])

  const columns = [
    'sid',
    'login',
    'name',
    'discordId',
    'email',
    'avatar',
    'speciality',
  ]

  const extractMetaData = (item) => item.metadata

  useEffect(() => setData(users), [])

  return data.length > 0 ? (
    <Main>
      <span>Student list</span>
      <Table data={data.map(extractMetaData)} columns={columns} />
    </Main>
  ) : (
    <span> No student found!</span>
  )
}

