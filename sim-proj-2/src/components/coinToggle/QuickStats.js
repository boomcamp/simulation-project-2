import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function QuickStats({market_cap_rank, circulating_supply, high_24h, low_24h, price_change_24h, ath}) {
    return (
        <Table aria-label="quick stats table" style={{margin:`75px 0 0 0`, width:`25%`}}>
            <TableHead style={{background:`#6a6d6b`}}>
                <TableRow>
                    <TableCell style={{color:`white`, fontWeight:`bold`}}>QUICK STATS</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow>
                    <TableCell align="left" style={{fontWeight:`bold`}}>Market Cap Rank</TableCell>
                    <TableCell align="left">{market_cap_rank}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" style={{fontWeight:`bold`}}>Circulating Supply</TableCell>
                    <TableCell align="left">{circulating_supply}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" style={{fontWeight:`bold`}}>24h Low / 24h High</TableCell>
                    <TableCell align="left">${low_24h} / ${high_24h}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" style={{fontWeight:`bold`}}>Price Change 24h</TableCell>
                    <TableCell align="left">{price_change_24h}</TableCell>                  
                </TableRow>
                <TableRow>
                    <TableCell align="left" style={{fontWeight:`bold`}}>All-Time High</TableCell>
                    <TableCell align="left">  
                        ${ath.ath} 
                        <i style={{color: (ath.ath_change_percentage<0) ? `red` : `green`}}> {Math.round(ath.ath_change_percentage * 100) / 100}%</i>
                        <p style={{margin:`0`}}>{new Date(ath.ath_date).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
