import React from 'react'
import '../../App.css'

export default function ChangesTable({percentage}) {
    return (
        <table className="price_change_percentage">
            <thead>
              <tr style={{background:`#6a6d6b`}}>
                <th className="day"> 1H </th>
                <th className="day"> 24H </th>
                <th className="day"> 7D </th>
                <th className="day"> 14D </th>
                <th className="day"> 30D </th>
                <th className="day"> 1Y </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="percent" style={{color: (percentage.oneH<0) ? `red` : `green` }}> { percentage.oneH } </td>
                  <td className="percent" style={{color: (percentage.oneD<0) ? `red` : `green` }}> { percentage.oneD } </td>
                  <td className="percent" style={{color: (percentage.oneW<0) ? `red` : `green` }}> { percentage.oneW } </td>
                  <td className="percent" style={{color: (percentage.twoW<0) ? `red` : `green` }}> { percentage.twoW } </td>
                  <td className="percent" style={{color: (percentage.oneM<0) ? `red` : `green` }}> { percentage.oneM } </td>
                  <td className="percent" style={{color: (percentage.oneY<0) ? `red` : `green` }}> { percentage.oneY } </td>
                </tr>   
            </tbody>
        </table>
    )
}
