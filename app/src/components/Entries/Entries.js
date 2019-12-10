import React from "react";

export default class Entries extends React.Component {
  render() {
    const { handleEntries } = this.props;
    console.log();
    return (
      <select
        className="custom-select"
        style={{ width: "220px", height: "42px" }}
        onChange={e => handleEntries(e.target.value)}
      >
        <option value="10">Show entries</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    );
  }
}
