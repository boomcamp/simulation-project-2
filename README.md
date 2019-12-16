# Simulation-Project-2

A quick overview of the application features:

- A viewable list of cryptocurrency coins available from the API
- Detailed single coin view, showing historical price data.
- Investment tracker.


## Getting Started

### In the project directory, you can run:

`npm start` - Runs the app in the development mode.

 `npm run server` - To start the server run the following command in the root directory.

  
  ## Project Overview
1.  ***Coin List***
	- In the landing page it has a table that shows all of the available coins and it's details  (**name**,  **symbol**,  **current price**,  **coin logo**, **etc.**)

2.  ***Coin Details View***
	-  In here you can see the details of the specific coin and its view will be a historical price chart (`All time`, `1 Year`, `6 Months`, `1 Month`, `1 Week`, `24 Hours`).
		
		It also has a Quick Stats wherein it displays the coins:
		- Market Cap Rank
		- Circulating Supply
		- 24h Low / 24h High,
		- Price Change 24h
		- All-Time High
	
3.	***Invesment Tracking***
	- In the investment tracking it has the following component:
		- `Wallet` - the total amount of money the user have.
		
		- `Buy/Invest Coin` - here the user can pick the coin he/she want to invest.
		
		- `Investment Tracking Table` - it displays the details of the coins the users invested and also the profit/loss of each coin. The user can also sell coins in here.
		
		- `Transaction History Table` -  here is all the details of the transaction.
			



### API
[CoinGecko API](https://www.coingecko.com/api/documentations/v3)
