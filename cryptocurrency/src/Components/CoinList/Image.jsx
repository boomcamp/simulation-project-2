import React from 'react'

function Image(props) {
  return (
    <img src={props.url} alt={props.alt} style={{width: 30, borderRadius: '50%'}} />
  )
}

export default Image
