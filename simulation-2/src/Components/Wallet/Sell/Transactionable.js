import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Axios from 'axios';
import { sha256 } from 'js-sha256';


export default function Transactionable(props) {

    const [state, setState] = useState()
    const [transactionState, setTransactionState] = useState()

    useEffect(()=>{
        // console.log(props.CoinData.coin_click_ontracker);
        (async()=>{
            const responce = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.CoinData.coin_click_ontracker}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C200d%2C1y`)

            const coin = await responce.json();

            setState({
                id: coin[0].id,
                name: coin[0].name,
                index: coin[0].symbol,
                image: coin[0].image,
                onehour: coin[0].price_change_percentage_1h_in_currency,
                oneday: coin[0].price_change_percentage_24h_in_currency,
                sevendays: coin[0].price_change_percentage_7d_in_currency,
                month: coin[0].price_change_percentage_30d_in_currency,
                smonth: coin[0].price_change_percentage_200d_in_currency,
                oneyear: coin[0].price_change_percentage_1y_in_currency,
                currentPrice: coin[0].current_price
            })
            
            console.log(coin);
            // console.log(props.CoinData.transaction_id)
            const transactiondata = await fetch(`http://localhost:4000/transactions/${props.CoinData.transaction_id}`)
            const data = await transactiondata.json();
            setTransactionState({
                id: data.id,
                coinRef: data.coinRef,
                BuyRef:{
                    ...data.BuyRef
                },
                timeRef: data.timeRef 
            });  
        })()

    },[props.CoinData.coin_click_ontracker,props.CoinData.transaction_id])

    const arrowcolor =(value)=>{
        // console.log(state)

        if(value < 0){
            return <div className='down' style={{borderBottomColor:'red'}}/>
        }
            return <div className='up' style={{borderBottomColor:'green'}}/>
    }

    const profit_loss_amount = (buyamunt, coinnum) => {
        return (state.currentPrice * coinnum) - (buyamunt * coinnum);
    }

    const profit_loss_percentage = (buyamunt, coinnum) => {
        return (buyamunt * coinnum) / (state.currentPrice * coinnum);
    }

    const net_amount_bought = (buyamunt, coinnum) => {
        return (buyamunt * coinnum);
    }

    const sell_coin = () => {

        // if coin possession - coin sold is 0 then delete

        // else
        Axios.post(`http://localhost:4000/selltransactions`,{
            id: sha256(new Date()+transactionState.BuyRef.amount_bought_usd+state.currentPrice+coin+transactionState.BuyRef.price_from_buying),
            transaction_ref_id: transactionState.id,
            number_of_ccoin_sold: coin,
            price_from_date_sold: state.currentPrice,
            net_amount_gain_loss: (transactionState.BuyRef.price_from_buying * coin) - (state.currentPrice * coin),
            current_coin_possesion: transactionState.BuyRef.Crypto_coin_bought - coin,
            coin_id:props.CoinData.coin_click_ontracker,
            timeRef: new Date()
        })
        .then(data=>{
            transactionState.BuyRef.Crypto_coin_bought = transactionState.BuyRef.Crypto_coin_bought - coin;
            transactionState.BuyRef.amount_bought_usd = transactionState.BuyRef.amount_bought_usd - amount

            Axios.put(`http://localhost:4000/transactions/${transactionState.id}`,{
                ...transactionState
            })
            .then(data=>{
                console.log(data)
            })
            .catch(e=>{
                console.log(e)
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const classes = useStyles();

    const [amount, setAmount] = React.useState();
    const [coin, setCoin] = React.useState();
    const [coinValue, setCoinValue] = React.useState();

    const changeValue = (value, type) => {
        setCoinValue(state.currentPrice)
        if(value < 0 ||type === 'amount'){
            let net_amount = state.currentPrice * transactionState.BuyRef.Crypto_coin_bought
            if(value > net_amount){
                setAmount(net_amount)
            }else{
                setCoin(value / coinValue)
            }
        }
        if(type === 'coin'){
            if(value < 0 || value > parseInt(transactionState.BuyRef.Crypto_coin_bought)){
                setCoin(transactionState.BuyRef.Crypto_coin_bought)
            }else{
                setAmount(value * coinValue)
            }
        }
      }

    return (
        // console.log(conso)
        <div className='transactionable-container'>
            {/* Display Coin Details */}    

                {state?<div className='coin-details-container' style={mainText}>

                {/* <div style={{position:'absolute',background:state?`url(${state.image}) no-repeat`:'', width: '200px', height:'200px',zIndex:'0', backgroundSize:'cover', opacity: '0.3'}}/> */}
                    <div className='coin-name'>{state.name}</div>
                    <div className='current-coin-status-containers' style={coin_stats_style}>
                        <div className='coin-status hour'>
                            <div className='coin-time-ref'>
                                1 Hour
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.onehour.toFixed(2))}
                                {state.onehour.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status day'>
                            <div className='coin-time-ref'>
                                24 Hour
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.oneday.toFixed(2))}
                                {state.oneday.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status week'>

                            <div className='coin-time-ref'>
                                1 Week
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.sevendays.toFixed(2))}
                                {state.sevendays.toFixed(2)}
                            </div>
                        </div>
                        <div className='coin-status month'>

                        <div className='coin-status week'>
                            <div className='coin-time-ref'>
                                1 Month
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.month.toFixed(2))}
                                {state.month.toFixed(2)}
                            </div>
                            </div>
                        </div>

                        <div className='coin-status smonth'>
                            <div className='coin-time-ref'>
                                6 Month
                            </div>
                            <div className='coin-context'>
                                {arrowcolor(state.smonth.toFixed(2))}
                                {state.smonth.toFixed(2)}
                            </div>
                        </div>
                        {state.oneyear?<div className='coin-status year'>
                            <div className='coin-time-ref'>
                                1 Year
                            </div>
                            <div className='coin-context'>
                                {state.oneyear?arrowcolor(state.oneyear.toFixed(2)):''}
                                {state.oneyear?state.oneyear.toFixed(2):''}
                            </div>
                        </div>:''}

                    </div>
                </div>:console.log('none')}
            {/* Display Current Coin and Investment History */}
                {
                    // console.log(transactionState?transactionState.buyref.Crypto_coin_bought:'')
                    transactionState?<div className="coin-current-investment-status-container">
                        <div className="coin-investment-summary" style={investmentStatsStlye}>
                            <div className="coin-status-container" style={{margin:'20px'}}>
                                <div className="title-main-coin" >COIN</div>
                                <div className="coin-number">{transactionState?transactionState.BuyRef.Crypto_coin_bought:''}</div>
                            </div>
                            <div>
                                <div className="title-main-buy">CURRENT VALUE(USD)</div>
                                <div className="coin-number">{state.currentPrice}</div>
                            </div>
                            <div>
                                <div className="title-main-buy">BOUGHT VALUE(USD)</div>
                                <div className="coin-number">{transactionState?transactionState.BuyRef.price_from_buying:''}</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">NET AMOUNT BOUGHT(USD)</div>
                                <div className="coin-number">{net_amount_bought(transactionState?transactionState.BuyRef.price_from_buying:'',transactionState?transactionState.BuyRef.Crypto_coin_bought:'')}</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">PROFIT/LOSS(%)</div>
                                <div className="coin-number">{profit_loss_percentage(transactionState?transactionState.BuyRef.price_from_buying:'',transactionState?transactionState.BuyRef.Crypto_coin_bought:'').toFixed(2) }</div>
                            </div>
                            <div style={{margin:'20px'}}>
                                <div className="title-main-buy">PROFIT/LOSS(USD)</div>
                                <div className="coin-number">{profit_loss_amount(transactionState?transactionState.BuyRef.price_from_buying:'',transactionState?transactionState.BuyRef.Crypto_coin_bought:'').toFixed(3) }</div>
                            </div>
                        </div>
                       
                    </div>:''
                }
            {/* Add Action Buttons for Sell */}

            <div className='buy-action-btn' onClick={()=>sell_coin()} style={sellbtn}>SELL COIN</div>

            <FormControl fullWidth className={classes.margin} variant="outlined" style={{margin:'10px', width: '318px'}}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                id="outlined-adornment-amount"
                value={amount}
                onChange={(e)=>{
                    setAmount(e.target.value)
                    changeValue(e.target.value,'amount')
                }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={60}
                type='number'
                defaultValue={0}
                onKeyUp={(e)=>{
                    setAmount(e.target.value)
                    changeValue(e.target.value,'amount')
                }}
                />
            </FormControl>

            <FormControl fullWidth className={classes.margin} variant="outlined" style={{margin:'10px', width: '318px'}}>
                <InputLabel htmlFor="outlined-adornment-amount">Coin</InputLabel>
                <OutlinedInput
                id="outlined-adornment-amount"
                value={coin}
                onChange={(e)=>{
                    setCoin(e.target.value)
                    changeValue(e.target.value,'coin')
                }}
                startAdornment={<InputAdornment position="start">C</InputAdornment>}
                labelWidth={60}
                type='number'
                defaultValue={0}
                onKeyUp={(e)=>{
                    setCoin(e.target.value)
                    changeValue(e.target.value,'coin')
                }}
                />
            </FormControl>
        </div>
    )
};

const useStyles = makeStyles(theme => ({
    root: {
      '& .PrivateNotchedOutline-root-110.MuiOutlinedInput-notchedOutline, .MuiFormLabel-root, .MuiInputLabel-root,.MuiInputLabel-formControl,.MuiInputLabel-animated,.MuiInputLabel-outlined': {
        borderColor: 'rgb(3, 36, 64)',
        color: 'white!important'
      },
      '& .MuiOutlinedInput-root.Mui-focused .PrivateNotchedOutline-root-110.MuiOutlinedInput-notchedOutline':{
        borderColor: 'white',
        color: 'white!important'
      }
    },
  }));


const sellbtn = {
    color: 'white',
    padding: '10px',
    background: 'rgb(22, 41, 66)',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer'
}


const coin_stats_style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:'9'
}

const mainText = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    // width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    color: 'white',
    flexDirection: 'column',
}

const investmentStatsStlye = {
    margin: '10px 10px',
    border: '1px #032440 solid',
    // width: '340px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '10px 0',
    color: 'white',
    // flexDirection: 'column',
}
