import { css } from '../lib/dom.js'

css(`
.table-container {
  overflow:auto;
}
.timeline-table {
  border-collapse: collapse;
}
.timeline-table td, .timeline-table th {
  border: 2px solid var(--foreground-light);
  padding: 5px;
}
`)

export const TimelineTable = ({ data, columns }) => {
  return (
    <div class="table-container">
      <table class="timeline-table" width="100%">
        <tr>
          {columns.map((name) => (
            <th
              key={name[0]}
              width={name[1].size}
              style={{ background: name[1].bgcolor }}
            >
              {name[0].charAt(0).toUpperCase() + name[0].slice(1)}
            </th>
          ))}
        </tr>
        {data.map((row) => (
          <tr key={row.id}>
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
