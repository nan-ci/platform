import { css } from '../lib/dom.js'

css(`
.table-container {
  overflow:auto;
}
.table-nan {
  border-collapse: collapse;
  width: 100%;
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

export const Table = ({ data, columns }) => {
  return (
    <div class="table-container">
      <table class="table-nan">
        <tr>
          {columns.map((name) => (
            <th key={name} class>{name}</th>
          ))}
        </tr>
        {data.map((row, key) => (
          <tr key={key}>
            {columns.map((name) => (
              <td key={name}>{row[name]}</td>
            ))}
          </tr>
        ))}
        </table>
    </div>
  )
}
