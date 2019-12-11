import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import {Grid,Button,ButtonGroup} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
 
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

                { title: 'Current Price', field: 'current_price' },
                
                { title: 'Actions', field: '', 
                  render: rowData => 
                  
                  <Grid item>
                  <ButtonGroup variant="contained" color="primary" aria-label="full-width contained primary button group">
                  <Button onClick = {()=>this.handleClick(rowData)}>Buy</Button>
                  </ButtonGroup>
                  </Grid>
                },
          ],
          data: [],
          elems: [],
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
     axios
     .post(`http://localhost:4000/transactions`,
      {
       logo: e.logo,   
       name: e.name, 
       current_price: e.current_price
      }
     )
     .then(resp =>{
     console.log(resp)
       })
    } 

    render() {
        return (

            <React.Fragment>
            
                <Dialog >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
            {/* {emails.map(email => ( */}
            <ListItem >
                <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText  />
            </ListItem>
            {/* ))} */}

            <ListItem>
            <ListItemAvatar>
                <Avatar>
                <AddIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
            </ListItem>
        </List>
        </Dialog>


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