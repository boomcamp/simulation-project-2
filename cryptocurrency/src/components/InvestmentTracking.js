import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import { Grid,Button,ButtonGroup } from '@material-ui/core';
 
export class InvestmentTracking extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            
            columns: [
      
                { title: 'Rank', field: 'market_cap_rank' },
                {
                  field: 'image',
                  title: 'Logo',
                  render: rowData => <img src={rowData.image} style={{width: 40, borderRadius: '50%'}} alt=""/>
                },
                { title: 'Name', field: 'name' },
                { title: 'Change', field: 'price_change_percentage_24h', 
                  render: rowData => <span style = {{color:rowData.price_change_percentage_24h > 0? 'green' : 'red' }}>{rowData.price_change_percentage_24h}  </span> // condition
                },

                { title: 'Current Price', field: 'current_price',
                  render: rowPrice => <span style= {{color:'blue'}}>{rowPrice.current_price}</span>},
                
                { title: 'Actions', field: '', 
                  render: rowData => 

                  <Grid item> {console.log(rowData)}
                  <ButtonGroup variant="contained" color="primary" aria-label="full-width contained primary button group">
                  <Button onClick = {()=>this.handleClick(rowData)}>Buy</Button>
                  </ButtonGroup>
                  </Grid>
                },
          ],
          data: [],
        }
    }
    componentDidMount(){
        axios
        .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, { 
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

export default InvestmentTracking