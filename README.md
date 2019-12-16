# Simulation Project 2

### CryptoWatcher

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### API

This project utilize the [CoinGecko API V3](https://www.coingecko.com/api/documentations/v3#/).

### Overview

Main interfaces involves a tabular list of known Cryptocurrenry with its current market value and other related data, a Graphical representation of its market related history and a trading options where you can buy and sell your prefered coin.

### Home(index page)

In here market related data will be observed of a given coin that is initially arranged according to its rank.
You can explore more detailed visual representaion of its market value flow by clicking the sparkline.

### Line Graph

A toggle element is provided to explore a coins market flow or to what its value at a given timeframe. Accesed will only be provided when you click a certain coin, through its sparkline, within the index page.

### Investment Tracking

This component provides necessary functionality for tracking and dealing with cryptocurrency trading.

Investing

- Interact with the 'CLICK TO INVEST' button
- Select your prefered coin to invest to.
- Input value or number of coins
- Click the 'BUY' button to confirm investment
- Click 'CANCEL' to terminate process and hide the buy component

Tracking





<!-- end -->

## Requirements

A quick overview of the features required for this application:

- A viewable list of cryptocurrency coins available from the API
- Detailed single coin view, showing historical price data.
- Investment tracker.

## 1. Coin List

The home page of your application should show a list of available coins. There
are a few different API endpoints that can return this information, feel free to
use one that you feel is most useful for your application.

The data available for each coin on this first page needs to be at least the
coin **name**, **symbol**, **current price**, **coin logo**, plus any other data
you find interesting. The price can be in the currency of your choosing.

Users should be able to click on a coin in this view and be directed to the coin
details view, the requirements of this view will be detailed below.

## 2. Coin Details View

This view is for viewing details about a single type of coin.

The main element of this view will be a historical price chart. This chart
should be able to display pricing data in the following increments.

- All time (since the coin price was tracked)
- 1 Year
- 6 Months
- 1 Month
- 1 Week
- 24 Hours

You'll need to create some mechanism to allow users to switch between displaying
these increments.

Here are some React.js charting libraries you may find useful:

- [Recharts](https://github.com/recharts/recharts)
- [Victory](https://github.com/FormidableLabs/victory)
- [Nivo](https://github.com/plouc/nivo)
- [Vis](https://github.com/uber/react-vis)
- [VX](https://github.com/hshoff/vx)

Feel free to add any other details to this page as you see fit.

## 3. Investment Tracking

Users want to be able to track their crypto investments through your
application. This means you'll need a way to keep track of the coins they've
invested in, along with their history of transactions. To keep things simple
we'll only allow two types of transactions, buy and sell.

We won't worry about user accounts or logins for this application, you can just
build it for one user.

To persist the data for this part of the application there is a server installed
in this repository that will allow you to save and query data. You can start the
server with the following command

```sh
npm run server
```

To keeps things simple the data-store and API only consist of a list of
transactions. Even with this simple data-model you should be able to implement
simple buy and sell transactions to track a users profit/loss for a particular
coin.

You can query all of the transactions at `localhost:4000/transactions`.

> Note:
>
> To avoid issues with CORS when accessing this API you'll probably want to
> setup a proxy configuration. This is specific to users of create-react-app.
>
> Documentation:
> https://create-react-app.dev/docs/proxying-api-requests-in-development/
>
> Video walkthrough: https://youtu.be/rYx3Phl9gEM

This endpoint supports the following operations:

- `GET /transactions` - get all transactions
- `GET /transactions/1` - get transactions by `id`
- `POST /transactions` - add a new transaction, an `id` will automatically be
  added
- `PUT /transactions/1` - put a transaction by id
- `PATCH /transactions/1` - update a transaction by id
- `DELETE /transactions/1` - delete transaction by id

There is not a specific methodology required to implement this feature (other
than the math needs to work out correctly) so feel free to calculate and collect
data as you see fit. As a hint there are a few key pieces of data a transaction
will likely require for proper tracking.

- Cryptocurrency invested in.
- Price of coin when purchased / sold. You can restrict this to a government
  issued currency if you'd like.
- Total profit / loss.

## Finished

Turn in your application source code using the method specified by your
instructor. Please include any instructions about how to run your application if
necessary.
