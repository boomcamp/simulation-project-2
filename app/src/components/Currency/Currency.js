import React from "react";
import Select from "react-select";

export default class Currency extends React.Component {
  render() {
    const { currencies, handleChange, currency } = this.props;
    const options = Object.keys(currencies).map(x => {
      return {
        value: x,
        label: currencies[x].name,
        unit: currencies[x].unit
      };
    });
    return (
      <Select
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        value={currency}
        onChange={handleChange}
        options={options}
      />
    );
  }
}
