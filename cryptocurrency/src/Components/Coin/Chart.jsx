/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {XYPlot, XAxis, YAxis, LineSeries, VerticalGridLines, HorizontalGridLines,Crosshair} from 'react-vis';

function Chart(props) {

  const [graphData, setGraphData] = useState({
    gData: []
  })

  useEffect(() => {
    fetchCoinDataGraphFn()
  }, [props.days])

  const fetchCoinDataGraphFn = () => {
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${props.days}`
    })
    .then(response => {
      //console.info(JSON.stringify(response.data.prices[0]))
      setGraphData({
        ...graphData,
        gData: response.data.prices
      })
    })
    .catch(error => console.log(error))
  }

  const dataArr = graphData.gData.map((d)=> {
    return {
      x: d[0],
      y: d[1]
    }
  });

  return (
    <XYPlot width={1250} height={500}>
      <LineSeries animation={true} data={dataArr}/>
      <Crosshair/>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Period of time" xType="time" />
      <YAxis title="Price"/>
    </XYPlot>
  )
}

export default Chart
