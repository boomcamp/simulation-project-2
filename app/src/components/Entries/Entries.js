import React from "react";

export default class Entries extends React.Component {
  render() {
    const { handleEntry } = this.props;
    return (
      <select
        className="custom-select"
        style={{ width: "220px", height: "42px" }}
      >
        <option>Show entries</option>
        <option onClick={() => handleEntry(10)}>10</option>
        <option onClick={() => handleEntry(50)}>50</option>
        <option onClick={() => handleEntry(100)}>100</option>
      </select>
    );
  }
}
