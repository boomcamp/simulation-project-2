# Simulation Project 2

  

### CryptoWatcher

  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  

### API

 
This project utilize the [CoinGecko API V3](https://www.coingecko.com/api/documentations/v3#/).

  

### Overview

  

Main interfaces involves a tabular list of known cryptocurrency with its current market value and other related data, a Graphical representation of its market related history and a trading options where you can buy and sell your preferred coin.

  

### Home(index page)

  

In here market related data will be observed of a given coin that is initially arranged according to its rank.

You can explore more detailed visual representation of its market value flow by clicking the sparkline.

  

### Coin Details View

  

A toggle element is provided to explore a coins market flow or to what its value at a given time frame. Access will only be provided when you click a certain coin, through its sparkline, within the index page.

  

### Investment Tracking

  

This component provides necessary functionality for tracking and dealing with cryptocurrency trading.

  

Investing

  

1. Interact with the `CLICK TO INVEST` button.

2. Select your preferred coin to invest to.

3. Input value or number of coins.

4. Click the `BUY` button to confirm investment.

5. Click `CANCEL` to terminate process and hide the buy component.

  

Tracking

A list of coin where the user invested in will be observe given with its index and current market movement in its value (in percentage).

- Interact and click a given coin on the list to view an expanded details regarding its market standing, all the transactions data and modes of selling the coin will be available also.

Selling

1. Click the call-to-action button for selling coins.
2. Declare a given amount or number of coins to sell.
3. Click `Cancel` to close selling component.

Transaction History

All of the transactions, with the mode of selling a particular coin, will be observe within this component.