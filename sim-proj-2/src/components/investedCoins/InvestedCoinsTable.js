import React from 'react';
import MaterialTable from 'material-table';

export default function InvestedCoinsTable() {

    const [state, setState] = React.useState({
        columns: [
            { title: 'Coin', field: 'coin' },
            { title: 'Current Price', field: 'currentPrice' },
            { title: 'Amount Invested', field: 'amountInvested' },
            { title: 'Profit/Loss', field: 'profitOrLoss', type:'numeric' },
        ],
        data: [],
    });

    const headerStyle={ textAlign: `left`, 
                        color: `white`, 
                        backgroundColor: `#3f51b5`, 
                        padding: `30px`,
                        margin: `0`}

    return (
        <MaterialTable
            components={{
                Toolbar: props => <h2 className="tableHeader" style={headerStyle}>Invested Cryptocurrency Coins</h2>
            }}
            columns={state.columns}
            data={state.data}
        />
    );
}