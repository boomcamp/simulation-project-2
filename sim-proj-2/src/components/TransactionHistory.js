import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
// import NavBar from './tools/NavBar'
import axios from 'axios'

export default function TransactionHistory() {
    const [state, setState] = React.useState({
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
                // console.log(res.data)
                if(!isCancelled)
                    setState(prevData => { return {...prevData, data: res.data} })
            })

        return () => { isCancelled=true };
    }, [])
    // const headerStyle={ textAlign: `left`, 
    //                 color: `white`, 
    //                 backgroundColor: `#3f51b5`, 
    //                 padding: `30px`,
    //                 margin: `0`}
  return (
    //<div style={{display:`flex`}}>
    //     <NavBar />

        <MaterialTable
            style={{
                // width:`50%`,
                // margin:`180px auto`
            }}
            // components={{
            //     Toolbar: props => (<h2 className="tableHeader" style={headerStyle}>Transaction History</h2> ),
            // }}
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
        />
    // </div>
  );
}