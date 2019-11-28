import React, { Component } from 'react'
import axios from 'axios';
import './Homepage.css';
import { Modal } from 'antd';
import { Table } from 'antd';
import { Collapse } from 'antd';
import EllipsisText from "react-ellipsis-text";
var commaNumber = require('comma-number')
const { Panel } = Collapse;
export default class Homepage extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      currency: [],
      dexcription: [],
      name:'',
      cPrice:[],
      img: [],
      visible: false,
      columns: [
        {
          title: 'Logo',
          dataIndex: '',
          key: 'id',

          render: (rowData) => (
            <img src={rowData.image} style={{ width: '30px' }} />

          ),

        },

        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Symbol',
          dataIndex: 'symbol'
        },
        {
          title: 'Circulating Supply',
          dataIndex: 'circulating_supply',
          render: circulating_supply => (
            commaNumber(circulating_supply)
          )
        },
        {
          title: 'Total  Supply',
          dataIndex: 'total_supply',
          render: supply => (
            supply ?
              '$' + commaNumber(supply) :
              commaNumber('NO DATA')
          )
        },
        {
          title: 'Current Price',
          dataIndex: 'current_price',
          type: 'numeric',
          render: current_price => (

            '$' + commaNumber(current_price)
          )
        },
        {
          title: 'Mkt Cap',
          dataIndex: 'market_cap',
          type: 'numeric',
          render: market_cap => (
            '$' + commaNumber(market_cap)
          )
        },


      ],

    }
  }
  componentDidMount() {

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1&sparkline=false`)

      .then(result => {
        let dataArr = result.data.map(elem => {
          return elem
        })
        let arrId = result.data.map(ids => {
          return ids.id

        })
        console.log(dataArr)
        this.setState({
          data: dataArr, id: arrId
        })

        // result.data.map(res=>{
        //   console.log(res.id)
        // })  

      })
    axios
      .get(`https://api.coingecko.com/api/v3/coins?per page=100${this.state.id}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ currency: res.data })
      })
  }


  handleClick = (e) => {
    // console.log(e)

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${e.id}`)
      .then(res => {
        // res.data.map(element=>{
        //   console.log(element.id)
        // })
        console.log(res.data)
        this.setState({ img: res.data.image,
                        visible: true, 
                        dexcription: res.data.description,
                        name:res.data.name,
                        cPrice:res.data.market_data.current_price

          })
      })

  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    
    console.log(this.state.cPrice)
   
    // console.log(this.state.dexcription)
    return (
      <div style={{}}>


        {console.log(this.state.img.small)}

        <Table
          
          onRowClick={(e) => this.handleClick(e)}
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey='id'

        />

        <Modal
          title='Currency'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width='800px'
        >
          <div >
            <div style={{display:'flex'}}> <img src={this.state.img.small} /><h1>{this.state.name}</h1></div>

            {/* <p style={{ whiteSpace: ' nowrap',textOverflow: 'ellipsis',overflow: 'hidden'}}>{this.state.dexcription.de}</p> */}
            {/* <EllipsisText text={this.state.dexcription.de} length={"500"} /> */}
            <Collapse accordion >
              <Panel header={'Description'+this.state.name} key="1">
                
                <div>{this.state.dexcription.de}</div>
              </Panel>

            </Collapse>,
            <Collapse accordion>
              <Panel header="Quick Stats" key="1">
                <p>{'Bitcoin Price  :   '+ '$' + commaNumber( this.state.cPrice.usd)}</p>
              </Panel>

            </Collapse>,
          </div>
        </Modal>
      </div >
    )
  }
}
