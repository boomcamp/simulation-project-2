    import React, { Component } from 'react'
    import { MDBContainer, MDBRow, MDBCol, MDBView, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
    import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis } from "recharts";
    import axios from 'axios';
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
                Description: []
            }
        }
        componentDidMount() {
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
        toggle = tab => e => {
            if (this.state.activeItem !== tab) {
                this.setState({
                    activeItem: tab
                });
            }
        }
        render() {
            console.log(this.state.MarketData)
            const data = [
                {
                    time: '24 Hours', percentage: this.state.MarketData.price_change_percentage_24h,
                },
                {
                    time: '1 Week', percentage: this.state.MarketData.price_change_percentage_7d,
                },
                {
                    time: '1 Month', percentage: this.state.MarketData.price_change_percentage_30d,
                },
                {
                    time: '2 Months', percentage: this.state.MarketData.price_change_percentage_60d , 
                },
                {
                    time: '1 Year', percentage: this.state.MarketData.price_change_percentage_1y,
                }
            ];
            // console.log(this.state.MarketData)
            return (
                <MDBContainer><br /><br /><br /><br />
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
                                <MDBCol className="CoinInfo" sm="6"><label><b>Current Price</b></label><br /> {this.state.Price.usd}</MDBCol>
                                <MDBCol className="CoinInfo" sm="6"><label><b>24h Low / 24h High</b></label><br /> {"$" + this.state.low24.usd} / {"$" + this.state.high24.usd}</MDBCol>
                                <MDBCol className="CoinInfo" sm="6"><label><b>Circulating Supply</b></label><br /> {this.state.MarketData.circulating_supply}</MDBCol>
                                <MDBCol className="CoinInfo" sm="6"><label><b>Market Cap</b></label><br /> {"$" + this.state.MarketCap.usd}</MDBCol>
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
                                        Historical Data
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
                                        Description
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBNav>
                            <MDBTabContent activeItem={this.state.activeItem} >
                                <MDBTabPane tabId="1" role="tabpanel">
                                    <br/>
                                    <h5>Price changes</h5>
                                    <LineChart
                                        width={1100}
                                        height={400}
                                        data={data}
                                        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                                    >
                                        <YAxis dataKey="percentage" />
                                        <XAxis dataKey="time" />
                                        <Tooltip />
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <Line type="monotone" dataKey="percentage" stroke="#ff7300" yAxisId={0} />
                                    </LineChart>
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel" >
                                    <p className="mt-2">
                                        {this.state.Description.en}

                                    </p>
                                </MDBTabPane>
                                <MDBTabPane tabId="3" role="tabpanel">
                                    <p className="mt-2">
                                        Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                        voluptate odit minima. Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit. Nihil odit magnam minima,
                                        soluta doloribus reiciendis molestiae placeat unde eos
                                        molestias.
                                    </p>
                                </MDBTabPane>
                            </MDBTabContent>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )
        }
    }

    export default details
