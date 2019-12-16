import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

export default function TransactionHistory() {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        columns: [
            {   title:"",
                render: rowData => (
                    <img src={rowData.img}alt="logo" width="50" />
                ),
                cellStyle:{padding:`3px 3px 3px 0`, textAlign:`right`},
                headerStyle:{padding:`0`},
                sorting:false
            },
                {title: 'Coin', field: 'coin.name', 
                render: rowData => (
                    <div>
                        <b>{rowData.coin.name}</b> 
                        <i> ({rowData.coin.sym.toUpperCase()})</i>
                    </div>
                )
            },
            {title: 'Date Sold', field: 'dateSold', 
                render: rowData => (
                    <div>
                        <p>{rowData.dateSold}</p>
                    </div>
                )
            },
            {title: 'Bought Value', field: 'current_price', headerStyle:{textAlign:`center`}, cellStyle: {color: `#428bca`, textAlign:`center`},
                render: rowData => (
                    <div>
                        <p>${rowData.current_price}</p>
                    </div>
                )
            },
            { title: 'Amount Sold (USD)', field: 'amountSold', headerStyle:{textAlign:`center`}, cellStyle:{textAlign:`center`},
                render: rowData => (
                    <div>
                        <p>${Math.round(rowData.amountSold * 100) / 100}</p>
                    </div>
                ) 
            },
            { title: 'Amount Sold (COIN)', headerStyle:{textAlign:`center`}, cellStyle:{textAlign:`center`},
                render: rowData => (
                    <div>{(rowData.amountSold/rowData.current_price).toFixed(2)} {rowData.coin.sym.toUpperCase()}</div>
                )
            },
        ],
        data: [],
    });

    useEffect(() => {
        let isCancelled=false

        axios
            .get(`http://localhost:4000/coinsold`)
            .then(res => {
                if(!isCancelled){
                    setState(prevData => { return {...prevData, data: res.data} })
                    setLoading(false)
                }
            })

        return () => { isCancelled=true };
    }, [])

  return (
        <MaterialTable
            options={{
                headerStyle: {
                    fontWeight: `bold`,
                    textTransform:'uppercase',
                },
                loadingType: "linear",
            }}
            title="Transaction History"
            columns={state.columns}
            data={state.data}
            isLoading={loading}
        />
  );
}