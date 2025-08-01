import React from 'react'
import { matchTableHeader, matchData } from './matchData'
import AppText from '~/components/general/AppText/AppText'
import "./styles.css"

export interface Props {
  headerData: typeof matchTableHeader;
  bodyData: typeof matchData[0]["data"];
  tableTitle: string;
}

function Match(props: Props) {
  const { headerData, bodyData, tableTitle } = props;
  return (
    matchTable(headerData, bodyData, tableTitle)
  )
}

function matchTable(headData: Props["headerData"], bodyData: Props["bodyData"], tableTitle: string) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl" key={tableTitle}>
      <AppText weight="semibold" size="lg">{tableTitle}</AppText>
      <table className='w-full mt-3'>
        <thead>
          <tr>
            {headData.map((head, idx) => (
              <th key={`table-header-${idx}`} className="text-left">{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((data, idx) => (
            <tr key={idx + "-" + data.division} className="body-row">
              {
                headData.map((head, idx) => (
                  <td key={`table-row-${idx}`}>
                    <AppText size="xs" weight="normal" >{ data[head.dataKey as keyof typeof data] }</AppText>
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Match