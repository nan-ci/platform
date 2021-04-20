import { css } from '../lib/dom.js'

css(`
.table-container {
  overflow-x:auto;
}
.table-nan {
  border-collapse: collapse;
  width: 100%;
  display: table
}

.table-nan td, .table-nan th {
  border: 2px solid var(--foreground-light);
  padding: 8px;
}

.table-nan tr:nth-child(even){background-color: var(--orange-dark);}

.table-nan th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: var(--green-dark);
  color: var(--foreground-light);
}
`)

export const Table = ({ data, columns, overflow }) => {
  console.log(overflow)
  return (
    <div class="table-container">
      <table class="table-nan">
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
