import React,{useState, useEffect} from 'react'
import { height, textAlign, fontSize } from '@material-ui/system'
import InvestmentTracker from './InvestmentTracker'
import SearchForBuy from './SearchForBuy'
import axios from 'axios'
import { tsConstructSignatureDeclaration } from '@babel/types'
import {GetDetail} from '../API/API'

export default function CryptoList() {

    const [state, setState] = useState();

    const selected = (data) =>{
        alert(data);
    }

    useEffect(()=>{
        axios.get(`http://localhost:4000/transactions`)
        .then(data=>{
            ExpandUserTransactionsData(data.data) 
        })
        .catch(e=>{
            console.log(e)
        })


    },[])



    const ExpandUserTransactionsData = (data) => {
        
        data.map(coin=>{
                GetDetail(coin.coinRef.id)
                .then(data=>{
                    // setState((prevState)=>{ ...prevState,
                    //     {symbol: data.data[0].symbol,
                    //     priceChangePercentage: data.data[0].price_change_percentage_24h}
                    // })

                    let x = {
                                symbol: data.data[0].symbol,
                                priceChangePercentage: data.data[0].price_change_percentage_24h
                            }

                    setState((prev)=>{
                        return {...prev,x}
                    })

                    // console.log(x)
                    console.log(state)

                })
                .catch(e=>{
                    console.log(e)
                })
        })



        // setState(coin_details_topass)


        // state.map(data=>{
        //     return console.log(data)
        // })
    }   
    


    return (
        <div className='list-container-container' style={investment_container}>
            <div className='list-container-title-actions' style={mainText}>
                <div className='component-container-title'>Investment Tracker</div>
            </div>
            <div className='list-table-container' style={tableContainer}>
                {
                    // coin_details_topass.map(data=>{
                    //     return data
                    // })

                }
                <InvestmentTracker TrackedCoinData={state}/>
            
                <SearchForBuy selectedpass={selected}/>
            </div>
        </div>
    )
}

const investment_container = {
    width: '360px',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgb(20, 57, 89)',
    color: 'white',
    height: '520px'
}

const mainText = {
    // padding: '20px 0 ',
    margin: '10px 10px',
    border: '1px #032440 solid',
    width: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const tableContainer = {
    border: '1px #032440 solid',
    width:  '340px',
    height: '100%',
    marginBottom: '10px'
}

