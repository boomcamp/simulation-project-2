import React, { Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
export default class InvestmentTracking extends Component {
	getProfitLoss = (profit, i) => {
		return i;
	};
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ title: 'ID', field: 'id' },
				{
					title: 'Name',
					field: 'name'
				},
				{
					title: 'Price',
					field: 'current_price',
					render: (rowData) => <span style={{ color: 'navy' }}>{rowData.current_price}</span>
				},
				{ title: 'Total Value', field: 'total_value' },
				{
					title: 'Profit/Loss',
					field: 'profit_loss',
					render: (rowProfit, index) => (
						<span style={{ color: 'green' }}>{this.getProfitLoss(rowProfit.current_price, index)}</span>
					)
				},
				{
					title: 'Account Balance',
					field: 'balance',
					render: (rowBal) => <span style={{ color: 'blue' }}>{rowBal.balance}</span>
				},
				{ title: 'Transactions', field: 'transactions' }
			],
			data: []
		};
	}
	filteredData = (data) => {
		let newData = data;
		data.map((item, i) => {
			let currentItem = data[i];
			let prevItem = data[i == 0 ? 0 : i - 1];
			prevItem.current_price > currentItem.current_price ? (item.profit_loss = true) : (item.profit_loss = false);
		});
		console.log('Data filtering.. ', newData);
		return newData;
	};
	componentDidMount() {
		axios.get(`http://localhost:4000/transactions`, {}).then((response) => {
			this.setState({
				data: this.filteredData(response.data)
			});
			console.log('Filtered Data..', this.state.data);
		});
	}
	handleClick = (e) => {
		console.log(e);
		localStorage.setItem('id_test', e.id);
		this.props.history.push('/transactions/');
	};
	render() {
		return (
			<React.Fragment>
				<div className="list">
					<MaterialTable title="History" columns={this.state.columns} data={this.state.data} />
				</div>
			</React.Fragment>
		);
	}
}