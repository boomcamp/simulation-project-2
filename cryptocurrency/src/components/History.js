import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';

export default class InvestmentTracking extends Component {
    getProfitLoss = (profit, i) => {
      return i
      
    }
    constructor(props) {
        super(props)
    
        this.state = {
            
            columns: [
      
                { title: 'ID', field: 'id' },
                { title: 'Name', 
                  field: 'name',
                },
                { title: 'Price',
                 field: 'current_price',
                  render: rowData => <span style={{color:'navy'}}>{ rowData.current_price }</span> },
                { title: 'Total Value', field: 'total_value'},
                 { title: 'Profit/Loss', field: 'profit_loss',
                   render: (rowProfit, index) => <span style={{color:'green'}}>{ this.getProfitLoss(rowProfit.current_price, index) }</span>},
  
                { title: 'Account Balance', field: 'balance',
                  render: rowBal => <span style={{color:'blue'}}>{rowBal.balance}</span>
                },
                { title: 'Transactions', field: 'transactions'}
          ],
          data: [],
        }
        console.log(this.state.columns, "adata ")
    }

    componentDidMount(){
        axios
        .get(`http://localhost:4000/transactions`, { 
        })
        .then(response=>{
            this.setState ({
                data : response.data
            })
        })
    }

    handleClick=(e)=>{
        console.log(e)
        localStorage.setItem('id_test',e.id);
        
        this.props.history.push('/transactions/')
  
    } 
    render() {
        return (
           
            <React.Fragment>
            <div className='list'>
            <MaterialTable
        
            title = "History"
            columns = {this.state.columns}
            data = {this.state.data}
            />
            </div>
            
            </React.Fragment>

        )
    }
}