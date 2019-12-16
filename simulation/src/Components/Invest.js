import React, { useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import Nav from './Nav';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function MaterialTableDemo() {
  const [gained, setGained] = React.useState('')
  const [sell, setSell] = React.useState({})
  const [price, setPrice] = React.useState('')
  const [data, setData] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState({
    columns: [
      {
        title: '', field: 'image',
        render: row => <img src={row.image} alt={row.id} style={{ width: 40, borderRadius: '50%' }} />,
        cellStyle: {
          textAlign: 'right',
        },
        headerStyle: {
          textAlign: 'right',
        }
      },
      {title: 'Coin Name', field: 'coinName'},
      { title: 'Quantity', field: 'coinQuantity' },
      {
        title: 'Total Amount', field: 'totalAmount',
        render: row =>
          <NumberFormat
            value={row.totalAmount}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale='2'
          />
      },
      { title: 'Date Purchased', field: 'date' },
      // { title: 'Status', field: 'status' },
     
      { title: 'Action',
          
        render: row =>  (row.status === 'SOLD')
        ?<Button onClick={e => coinModal(row.id, row.coinId)} variant="contained" color="primary" disabled> Sold </Button>
        :<Button onClick={e => coinModal(row.id, row.coinId)} variant="contained" color="primary" > Sell </Button>
      },

      { title: 'Date Sold', field: 'newDate',
        cellStyle: {
        backgroundColor: '#a2e7eb',
        textAlign: 'center'
        }, 
        headerStyle: {
          textAlign: 'center'
        }
      },

      { title: 'Earned/Lost', render: row =>
      <NumberFormat 
        style={{
          color: row.mOT > 0 ? 'green' : 'red'
        }}
        value={row.mOT}
        allowNegative={false}
        displayType={'text'}
        thousandSeparator={true} 
        prefix={'$'}
        decimalScale='2'
      />,
      cellStyle: {
        backgroundColor: '#a2e7eb',
        textAlign: 'center'
      }, 
      headerStyle: {
        textAlign: 'center'
      } 
      },

    ],
    data: [],
  });

  useEffect(() => {
    const data = setInterval(() => {
      renderInvest()
     }, 1000);
     return () => { clearInterval(data) }     
  }, []);

  useEffect(()=>{
    const data = setInterval(() => {
      renderInvest()
     }, 800);
     return () => { clearInterval(data) }     
  },[data])

  const coinModal = (id, coin) => {
    setOpen(true);
    axios({
      method: 'get',
      url: `http://localhost:4000/transactions/${id}`
    })
      .then(response => {
        setData(response.data)
      
        let current = response.data.currentPrice
        let amount = response.data.totalAmount
        axios({
          method: 'get',
          url: `https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
        })
          .then(response => {
            setPrice(response.data.market_data.current_price.usd)
           
            let whenBought = response.data.market_data.current_price.usd;

            let computed = whenBought -current;
            computed = (computed/whenBought) * 100;  
            var result = (computed / 100) * amount;
            var totalAmount = amount + result;
            setGained(result)
            setSell({
              percentChange: computed,
              result: result,
              totalAmount: totalAmount
            })
            
          })
          .catch(err => {
            console.log('err');
          })
         
      })
      .catch(err => {
        console.log('err');
      })


  }

const doSell = (e) => {
  setOpen(false);
  renderInvest()

  let date = new Date();
  let newDate = date.toLocaleString()

  axios({
    method: 'patch',
    url: `http://localhost:4000/transactions/${e}`,
    data: {
      
        "rank": data.rank,
        "image": data.image,
        "coinName": data.coinName,
        "coinQuantity": data.coinQuantity,
        "totalAmount": data.totalAmount,
        "date": data.date,
        "currentPrice": data.currentPrice,
        "coinId": data.coinId,
        "status": "SOLD",
        "mOT": gained,
        "id": data.id,
        "newDate": newDate 
    }
  })
 
  .catch(err => {
    console.log('err');
  })
}

  const handleClose = () => {
    setOpen(false);
    setData({})

  };

const renderInvest = () => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/transactions',
    })
      .then(response => {
        setState({
          ...state,
          data: response.data

        })
      })
      .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      <Nav />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"><img src={data.image} alt={data.id} style={{ width: 40, borderRadius: '50%' }} />{data.coinName}</DialogTitle>
        <DialogContent>
   
            <table>
              <thead>
                <tr>
                </tr>
              </thead>

              <tbody>
              
              <tr style={{ textAlign: 'left' }}>

              </tr>

              <tr style={{ textAlign: 'left' }}>
                <td>Date when you purchased:</td>
                <td></td>
                <td>
                  {data.date}
                </td>
              </tr>

              <tr style={{ textAlign: 'left' }}>
                <td>Price during your purchase:</td>
                <td></td>
                <td>
                  <NumberFormat
                    value={data.currentPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale='2'
                  />
                </td>
              </tr>

              <tr style={{ textAlign: 'left' }}>
                <td>Coin Quantity Purchased:</td>
                <td></td>
                <td>{data.  coinQuantity}</td>
              </tr>

              <br />

              <tr style={{ textAlign: 'left' }}>
                <td>Current Price Today:</td>
                <td></td>
                <td>
                  <NumberFormat
                    value={price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale='2'
                  />
                </td>
              </tr>

              <tr style={{ textAlign: 'left' }}>
                <td>Change(%):</td>
                <td></td>
                <td>
                <NumberFormat
                    value={sell.percentChange}
                    displayType={'text'}
                    thousandSeparator={true}
                    allowNegative={true}
                    suffix={'%'}
                    decimalScale='2'
                    style = {{ color: sell.percentChange > 0 ? 'green' : 'red'}}
                  />
                </td>
              </tr>

              <tr style={{ textAlign: 'left' }}>
                <td style ={{ display: sell.result > 0 ? null : 'none'}}>You will earn:</td>
                <td style ={{ display: sell.result > 0 ? 'none' : null}}>You will lose:</td>
                <td></td>
                <td>
                <NumberFormat
                    value={sell.result}
                    allowNegative={false}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale='10'
                    style = {{ color: sell.result > 0 ? 'green' : 'red'}}
                  />
                </td>
                
              </tr>
              </tbody>
              <tfoot>
              </tfoot>
            </table>

            <br/>

            <span>Your {' '} 
             
               <NumberFormat
                    value={data.totalAmount} 
                    allowNegative={false}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale='2'
              
                  />
             {' '}  will become {' '} 
             
             <NumberFormat
                    value={sell.totalAmount}
                    allowNegative={false}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale='2'
                
                  />

             </span>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
            </Button>
          <Button id={data.id} onClick={e => doSell(data.id)} variant="contained" color="primary">
            Confirm
            </Button>
        </DialogActions>
      </Dialog>
      <br />
      <CssBaseline />
      <Container maxWidth="xl">
        <MaterialTable
          title="Coins"
          columns={state.columns}
          data={state.data}
        />
      </Container>
    </React.Fragment>
  );
}