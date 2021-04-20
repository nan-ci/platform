import { useState, useEffect } from 'preact/hooks'
import { Main } from '../component/elements.jsx'
import { Table } from '../component/table.jsx'
import { users } from '../data/users.js'

export const StudentList = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const extractMetaData = (item) => item.metadata

  const getColumn = () => {
    const arr = []
    for (const user of users) {
      for (const element of Object.keys(user.metadata)) {
        arr.push(element)
      }
    }
    setColumns([...new Set(arr)])
  }

  useEffect(() => setData(users), [])
  useEffect(() => getColumn(), [])

  return data.length > 0 ? (
    <Main>
      <span>Student list</span>
      <Table data={data.map(extractMetaData)} columns={columns} />
    </Main>
  ) : (
    <span> No student found!</span>
  )
}
