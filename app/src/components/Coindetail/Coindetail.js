import React from "react";
import axios from "axios";
import "../../App.css";

export default class Coindetail extends React.Component {
  componentDidMount = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.props.match.params.id}`
      )
      .then(result => {
        console.log(result);
        this.setState({ data: result.data });
      });
  };

  render() {
    return (
      <div>
        <div className="detail-cont">
          <div className="logo-box">
            {/* <img src={data.image} alt="" /> */}
          </div>
        </div>
      </div>
    );
  }
}
