import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom'
import { Pagination } from 'semantic-ui-react'

import axios from 'axios';
export class home extends Component {
    constructor() {
        super();
        this.state = {
            url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100",
            activePage: 1,
            ListofCoin: [],
        }
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate() {
        this.getData();
    }
    getData() {
        axios.get(this.state.url)
            .then(result => {
                this.setState({ ListofCoin: result.data })
                // console.log(result.data)
            })
    }
    handleOnChange = (e, pageInfo) => {
        this.setState({
            activePage: pageInfo.activePage,
            url:
                `${this.state.url}` +
                `&per_page=100&page=${pageInfo.activePage.toString()}`
        });
    }
    render() {
        return (
            <MDBContainer ><br /><br /><br /><br />
                <MDBRow>
                    <MDBCol sm="12">
                        <Pagination
                            activePage={this.state.activePage}
                            onPageChange={this.handleOnChange}
                            totalPages={62}
                            ellipsisItem={null}
                            className="pagination"
                        />
                    </MDBCol>
                </MDBRow>
                <br />
                <MDBTable className="z-depth-1">
                    <MDBTableHead color="special-color" textWhite>
                        <tr>

                            <th>Logo</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Current Price</th>
                            <th>24h</th>
                            <th>Circulating supply</th>
                            <th>Market Cap</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>  
                        {this.state.ListofCoin.map(list => (
                            <tr key={list.id} className="hover">
                                <td><img src={list.image} width="30" alt={list.image}></img></td>
                                <td><b><Link color="elegant" to={`/details/${list.id}`}>{list.name}</Link></b></td>
                                <td>{list.symbol.toUpperCase()}</td>
                                <td className="blue-text"><b>{list.current_price}</b></td>
                                <td className="green-text"><b>{list.price_change_percentage_24h+'%'}</b></td>
                                <td>{list.circulating_supply}</td>
                                <td>{list.market_cap}</td>

                            </tr>
                        ))}

                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>

        )
    }
}

export default home
