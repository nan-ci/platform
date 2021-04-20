import { css } from '../lib/dom.js'

css(`
.container {
  overflow-x:auto;
}
.customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.customers td, .customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

.customers tr:nth-child(even){background-color: #e67e22;}

.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #27ae60;
  color: white;
}
`)

export const Table = ({ data, columns }) => {
  return (
    <div class="container">
      <table class="customers">
        <tr>
          {columns.map((name) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
        {data.map((row) => (
          <tr key={row.login}>
            {columns.map((name) => (
              <td key={name}>{row[name]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
