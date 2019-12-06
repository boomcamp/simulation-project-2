import React from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  margin-right: 10%;
  margin-left: 10%;
  width: 100%;
  height: 280px;
`;
const ContainerTwo = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-right: 10%;
  margin-left: 10%;
  width: 100%;
  height: 550px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
`;
const Description = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-y: auto;
  width: 70%;
  height: 180px;
  margin-top: 50px;
`;
const Chart = styled.div`
  width: 70%;
`;
const Table = styled.div`
  width: 30%;
  padding: 40px;
`;

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: "japan",
          color: "hsl(25, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 156
            },
            {
              x: "helicopter",
              y: 265
            },
            {
              x: "boat",
              y: 10
            },
            {
              x: "train",
              y: 254
            },
            {
              x: "subway",
              y: 190
            },
            {
              x: "bus",
              y: 19
            },
            {
              x: "car",
              y: 132
            },
            {
              x: "moto",
              y: 87
            },
            {
              x: "bicycle",
              y: 191
            },
            {
              x: "horse",
              y: 274
            },
            {
              x: "skateboard",
              y: 36
            },
            {
              x: "others",
              y: 130
            }
          ]
        },
        {
          id: "france",
          color: "hsl(266, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 135
            },
            {
              x: "helicopter",
              y: 13
            },
            {
              x: "boat",
              y: 104
            },
            {
              x: "train",
              y: 60
            },
            {
              x: "subway",
              y: 5
            },
            {
              x: "bus",
              y: 95
            },
            {
              x: "car",
              y: 176
            },
            {
              x: "moto",
              y: 127
            },
            {
              x: "bicycle",
              y: 127
            },
            {
              x: "horse",
              y: 171
            },
            {
              x: "skateboard",
              y: 112
            },
            {
              x: "others",
              y: 116
            }
          ]
        },
        {
          id: "us",
          color: "hsl(206, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 227
            },
            {
              x: "helicopter",
              y: 254
            },
            {
              x: "boat",
              y: 216
            },
            {
              x: "train",
              y: 55
            },
            {
              x: "subway",
              y: 222
            },
            {
              x: "bus",
              y: 63
            },
            {
              x: "car",
              y: 53
            },
            {
              x: "moto",
              y: 28
            },
            {
              x: "bicycle",
              y: 99
            },
            {
              x: "horse",
              y: 235
            },
            {
              x: "skateboard",
              y: 119
            },
            {
              x: "others",
              y: 56
            }
          ]
        },
        {
          id: "germany",
          color: "hsl(322, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 128
            },
            {
              x: "helicopter",
              y: 157
            },
            {
              x: "boat",
              y: 56
            },
            {
              x: "train",
              y: 100
            },
            {
              x: "subway",
              y: 280
            },
            {
              x: "bus",
              y: 0
            },
            {
              x: "car",
              y: 52
            },
            {
              x: "moto",
              y: 227
            },
            {
              x: "bicycle",
              y: 57
            },
            {
              x: "horse",
              y: 253
            },
            {
              x: "skateboard",
              y: 63
            },
            {
              x: "others",
              y: 194
            }
          ]
        },
        {
          id: "norway",
          color: "hsl(35, 70%, 50%)",
          data: [
            {
              x: "plane",
              y: 150
            },
            {
              x: "helicopter",
              y: 93
            },
            {
              x: "boat",
              y: 104
            },
            {
              x: "train",
              y: 246
            },
            {
              x: "subway",
              y: 2
            },
            {
              x: "bus",
              y: 279
            },
            {
              x: "car",
              y: 23
            },
            {
              x: "moto",
              y: 146
            },
            {
              x: "bicycle",
              y: 225
            },
            {
              x: "horse",
              y: 40
            },
            {
              x: "skateboard",
              y: 161
            },
            {
              x: "others",
              y: 128
            }
          ]
        }
      ],
      details: [],
      logo: "",
      desc: ""
    };
  }
  componentDidMount = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(response => {
        this.setState({
          details: response.data,
          logo: response.data.image.large,
          desc: response.data.description.en
        });
      });
  };
  render() {
    return (
      <MainDiv>
        <Container>
          <Logo>
            <img
              src={this.state.logo}
              alt=""
              style={{ width: "210px", height: "200px", paddingRight: "15px" }}
            />
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold"
              }}
            >
              {this.state.details.name}({this.state.details.symbol})
            </p>
          </Logo>
          <Description>
            <p style={{ fontSize: "16px" }}>
              {ReactHtmlParser(this.state.desc)}
            </p>
          </Description>
        </Container>
        <ContainerTwo>
          <Chart>
            {" "}
            <ResponsiveLine
              data={this.state.data}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                stacked: true,
                min: "auto",
                max: "auto"
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "transportation",
                legendOffset: 36,
                legendPosition: "middle"
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "middle"
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </Chart>
          <Table>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Quick Stats</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>Bitcoin Price</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>Trading Volume </td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>Volume / Market Cap </td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>Market Cap Rank </td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>7d Low / 7d High </td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>All-Time High</td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>All-Time Low </td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <td>Bitcoin/Bitcoin Ratio</td>
                  <td>the Bird</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </Table>
        </ContainerTwo>
      </MainDiv>
    );
  }
}
