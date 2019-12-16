import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';

export default class InvestmentTracking extends Component {

  
  
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
                  { title: 'Quantity', field: 'quantity'},
                { title: 'Total Price', field: 'total_value'},
                 { title: 'Profit/Loss(%  )', field: 'profit_loss',
                 render: (rowProfit) => (
                  <React.Fragment>
                    {
                      this.getProfitLoss(rowProfit.current_price, rowProfit.id)
                    }
                  </React.Fragment>
                )},
  
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
    getProfitLoss = (profit, i) => {
      let index = i === 1 ? 1 : i - 1;

      if(i === 1 ){

        return (
          <span 
          style={{color:'green'}}> 0
          </span>
        )
      }
      else{

        let prevProfit = this.state.data[0].current_price
        if( prevProfit > profit ){
          return (
          <span style={{color:'green'}}>{ ((prevProfit-profit) / profit * 100 ).toFixed(2)}</span>
          ) 
        }else{
        return (
          <span style= {{color:'red'}}>
            { ((prevProfit-profit) / profit * 100).toFixed(2) }
          </span>
        )
        }
      }
    };

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