import { css } from '../lib/dom.js'

css(`
.customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.customers td, .customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

.customers tr:nth-child(even){background-color: #f2f2f2;}

.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: rgba(82, 250, 124, 0.4);
  color: white;
}
`)

export const Table = ({ data, columns }) => {
  console.log('data :', data)
  return (
    <table class="customers">
      <tr>
        {columns.map((item, key) => (
          <th key={key}>{item}</th>
        ))}
      </tr>
      <tr>
        {/* faire correspondre les <td></td> au <th></th> */}
      </tr>
    </table>
  )
}
