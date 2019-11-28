import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";
export default class TitleSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }
  handleChange(e) {
    this.setState({
      searchValue: e
    });
    axios.get("https://api.coingecko.com/api/v3/coins/list").then(response => {
      var searchData = response.data.filter(item => {
        console.log(item.name);
        return item.name.toLowerCase().match(e.toLowerCase());
      });
      this.props.search(searchData);
    });
  }
  render() {
    return (
      <div>
        <Input
          label="Search coin"
          icon="search"
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    );
  }
}
