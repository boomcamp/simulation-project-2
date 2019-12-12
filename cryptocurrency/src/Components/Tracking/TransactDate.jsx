import React from 'react';

function TransactDate(props) {
  const { date } = props;

  const convertTimestamp = (val) => {
    let newDate = new Date(val);
    return newDate.toLocaleString()
  }

  return (
    <p>{convertTimestamp(date)}</p>
  )
}

export default TransactDate