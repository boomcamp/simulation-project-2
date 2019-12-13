import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtnGroup, MDBBtn } from 'mdbreact';
import axios from 'axios';
import Description from '../Coin Details/description';
import Converter from '../Coin Details/converter';
import InvestmentModal from '../Coin Details/InvestModal';
import { ToastContainer } from 'react-toastify';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
export class details extends Component {
    constructor() {
        super();
        this.state = {
            CoinData: [],
            CoinImage: [],
            Links: [],
            MarketData: [],
            Price: [],
            activeItem: "1",
            low24: [],
            high24: [],
            MarketCap: [],
            Description: [],
            price: [],
            days: 1,
            crosshairValues: []
        }
    }

    componentDidMount() {
        this.onFetch();
        this.getData();
    }
    getData() {
        axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    ...this.state,
                    CoinData: res.data,
                    CoinImage: res.data.image,
                    Links: res.data.links,
                    MarketData: res.data.market_data,
                    Price: res.data.market_data.current_price,
                    low24: res.data.market_data.low_24h,
                    high24: res.data.market_data.high_24h,
                    MarketCap: res.data.market_data.market_cap,
                    Description: res.data.description
                })
            })
    }
    componentDidUpdate() {
        this.onFetch();
    }
    onFetch() {
        axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}/market_chart?vs_currency=usd&days=${this.state.days}`)
            .then(res => {
                const data = []
                res.data.prices.map(priceData => {
                    if(priceData !== null){
                        const date = new Date(priceData['0'])
                        data.push({ x: date, y: priceData['1'] })
                    }
                    return data;   
                })
                this.setState({ price: data })
            })
    }

    HandleCHangeDays = (Days) => {
        this.setState({ days: Days })
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    }


    render() {
        // console.log(this.props.match.params.id})
        return (
            <MDBContainer className="container-height"><br /><br /><br /><br />
            <ToastContainer />
                <MDBRow className="z-depth-1">
                    <MDBCol sm="4" className="grey lighten-2">
                        <MDBView>
                            <img
                                src={this.state.CoinImage.large}
                                width={`100%`}
                                alt={this.state.CoinImage.large}
                            />
                        </MDBView>
                    </MDBCol>
                    <MDBCol sm="8" className="grey lighten-3">
                        <MDBRow>
                            <MDBCol className="CoinInfo" sm="6"><label><b>Market Cap Rank</b></label><br /> {this.state.CoinData.market_cap_rank}</MDBCol>
                            <MDBCol className="CoinInfo" sm="6"><label><b>Current Price</b></label><br /> {"$" + this.state.Price.usd}</MDBCol>
                            <MDBCol className="CoinInfo" sm="6"><label><b>24h Low / 24h High</b></label><br /> {"$" + this.state.low24.usd} / {"$" + this.state.high24.usd}</MDBCol>
                            <MDBCol className="CoinInfo" sm="6"><label><b>Circulating Supply</b></label><br /> {this.state.MarketData.circulating_supply}</MDBCol>
                            <MDBCol className="CoinInfo" sm="6"><label><b>Market Cap</b></label><br /> {"$" + this.state.MarketCap.usd}</MDBCol>
                        </MDBRow><hr />
                        <MDBRow>
                            <MDBCol className="" sm="12"><InvestmentModal id={this.state.CoinData.id} price={this.state.Price.usd}  symbol={this.state.CoinData.symbol}/></MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol sm="12">
                        <MDBNav className="nav-tabs mt-5">
                            <MDBNavItem>
                                <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                                    Overview
                                    </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                                    Description
                                    </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={this.state.activeItem} >


                            <MDBTabPane tabId="1" role="tabpanel">
                                <br />
                                <Converter price={this.state.Price.usd} symbol={this.state.CoinData.symbol} />
                                <br />
                                <MDBBtnGroup size="sm">
                                    <MDBBtn color="default" size="lg" value="1" onClick={(e) => this.HandleCHangeDays(e.target.value)}>24h</MDBBtn>
                                    <MDBBtn color="default" size="lg" value="7" onClick={(e) => this.HandleCHangeDays(e.target.value)}>7d</MDBBtn>
                                    <MDBBtn color="default" size="lg" value="30" onClick={(e) => this.HandleCHangeDays(e.target.value)}>30d</MDBBtn>
                                    <MDBBtn color="default" size="lg" value="180" onClick={(e) => this.HandleCHangeDays(e.target.value)}>180d</MDBBtn>
                                    <MDBBtn color="default" size="lg" value="365" onClick={(e) => this.HandleCHangeDays(e.target.value)}>365d</MDBBtn>
                                    <MDBBtn color="default" size="lg" value="max" onClick={(e) => this.HandleCHangeDays(e.target.value)}>Max</MDBBtn>
                                </MDBBtnGroup>
                                <FlexibleWidthXYPlot height={450} onMouseLeave={() => this.setState({ crosshairValues: [] })}>
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis xType="time" />
                                    <YAxis />
                                    <LineSeries animation={true} data={this.state.price}
                                        onNearestX={(d) => {
                                            const Data = []
                                            Data.push(d)
                                            this.setState({
                                                ...this.state,
                                                crosshairValues: Data
                                            })
                                        }} />
                                    <Crosshair
                                        titleFormat={(d) => ({ title: 'Date', value: new Date(d[0].x).toLocaleDateString() })}
                                        itemsFormat={(d) => [{ title: 'Price', value: d[0].y }]}
                                        values={this.state.crosshairValues} />
                                </FlexibleWidthXYPlot>
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel" >
                                <br />
                                <Description className="height" description={this.state.Description.en} />
                                <br />
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default details
