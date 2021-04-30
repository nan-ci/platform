import { css } from '../lib/dom.js'

css(`
.table-container {
  overflow:auto;
}
.table-nan {
  border-collapse: collapse;
}
.table-nan td, .table-nan th {
  border: 2px solid var(--foreground-light);
  padding: 5px;
}
`)

export const Table = ({ data, columns }) => {
  return (
    <div class="table-container">
      <table class="table-nan" width="100%">
        <tr>
          {columns.map((name) => (
            <th
              key={name[0]}
              width={name[1].size}
              style={{ background: name[1].bgcolor }}
            >
              {name[0]}
            </th>
          ))}
        </tr>
        {data.map((row) => (
          <tr key={row.login}>
            {columns.map((name) => (
              <td key={name[0]} style={{ background: name[1].color }}>
                {row[name[0]]}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
