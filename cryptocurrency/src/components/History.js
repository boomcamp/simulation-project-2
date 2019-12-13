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
                { title: 'Total Value', field: 'total_value'},
                { title: 'Profit', field: 'profit',
                  render: rowProfit => <span style={{color:'green'}}>{ rowProfit.profit }</span>},
                { title: 'Loss', field: 'loss',
                  render: rowLoss => <span style={{color:'red'}}>{ rowLoss.loss }</span>},

                { title: 'Account Balance', field: 'balance',
                  render: rowBal => <span style={{color:'blue'}}>{rowBal.balance}</span>
                }
          ],
          data: [],
        }
    }

    componentDidMount(){
    //     axios.get("http://localhost:4000/transactions").then(res => {
    //      console.log(res.data);
    //     let result = res.data.reduce((c, v) => {
            
    //     c[v.name] = (c[v.name] || 0) + num;
    //     return c;
    //   }, {});
    //   let newData = [];
    //   let init = 0;
    //   console.log(result);
    //   for (var key in result) {
    //     newData.push({ id: init++, name: key, current_price: result[key] });
    //   }
    //   console.log(newData)
    //   this.setState({
    //     data: newData
    //   });
    // });
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
        
            title = "Investment Tracking"
            columns = {this.state.columns}
            data = {this.state.data}
            />
            </div>

            </React.Fragment>

        )
    }
}

// componentDidMount() {
//     axios.get("http://localhost:4000/transactions").then(res => {
//       // console.log(res.data);
//       let result = res.data.reduce((c, v) => {
//         const num = parseFloat(v.coinBalance);
//         c[v.name] = (c[v.name] || 0) + num;
//         return c;
//       }, {});
//       let newData = [];
//       let init = 0;
//       // console.log(result);
//       for (var key in result) {
//         newData.push({ id: init++, name: key, amount: result[key] });
//       }
//       this.setState({
//         coins: newData
//       });
//     });
//   }