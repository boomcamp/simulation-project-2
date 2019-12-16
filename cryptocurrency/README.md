#######################################################
-------------------------------------------------------
Project : Simulation Project 2
-------------------------------------------------------
Title : Cryptocurrency
-------------------------------------------------------
Summary:
-------------------------------------------------------

Cryptocurrency is an internet-based medium of exchange which uses cryptographical functions to conduct
financial transactions. Cryptocurrencies leverage blockchain technology to gain decentralization, 
transparency, and immutability.

--------------------------------------------------------
Dependencies:
--------------------------------------------------------

* @material-ui/core": "^4.7.0",
* @material-ui/icons": "^4.5.1",
* axios": "^0.19.0",
* material-table": "^1.54.2",
* react": "^16.12.0",
* react-dom": "^16.12.0",
* react-router-dom": "^5.1.2",
* react-scripts": "3.2.0",
* recharts": "^2.0.0-beta.1"

--------------------------------------------------------
Components :
--------------------------------------------------------

1. Coins List
2. Coin Details
3. Investment Tracking
4. Transactions 
5. History
6. Charts

---------------------------------------------------------
Installations :

* run from the terminal ../simulation-project-2/cryptocurrency
  type: npm install, after installation
  run the program with this following coomand: 
  
  npm start

* run from the new tab in terminal ../simulation-project-2
  start the server with this following command: 
  
  npm run server

---------------------------------------------------------
Details / Instructions:
---------------------------------------------------------

1. Coins List -   Display all the list of the coins on the API (Application Programming Interface) with an 
                  icon of 'visibility' that needs to be clicked to move to another link( Coin Details ).

2. Coin Details - Display every details on a specific coin that has been clicked by the user on the Coins
                  List, it includes the ( Charts ) which determine the changes of the value in 24hrs, 1week,
                  1month, 6months, 1year, and max (all time).

3. Investment Tracking - Includes all the list of the coins which you can buy, by click the BUY button then
                  it will link you to the Transactions Page.

4. Transactions - Display the details on a specific coin that has been clicked which you can choose the quantity
                  that multiplies the value of the current coin. then, click the BUY button to store the data and
                  values of the coin on the database.

5. History -      Display every details of the Transactions that has been made. Includes the Name, Price, Total 
                  Value and the Balance ( default balance of 1000000 stored on the localStorage, subtracted to the
                  Total Value of the coin that has been bought ) of the coin.

                  --------------------------------------------------------------------------------
                   * Computations:
                
                   >>Profit loss in percentage<<

                   Get Profit / Loss Percentage
                   coinTotal = Coin Price today - Price when Bought
                   coinTotal = coinTotal / Price when Bought * 100 
                   if the value is + (color = green) value then profit if - (color = red) then loss
                  
                   Account Balance = Total value of Coin Price(in usd) * quantity of coin/s 
                   note: Account balance has a default value of 1,000,000

                   Transactions(columns) - determined if you BUY or SELL the coin.
                  ----------------------------------------------------------------------------------

6. Charts - Included in the Coin Details Page. Chart used: (Areachart).

----------------------------------------------------------- 
############################################################