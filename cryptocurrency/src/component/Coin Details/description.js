import React, { Component } from 'react'

export default class description extends Component {
    render() {
        return (
            <div className="description-box-height grey lighten-3">
                <br/>
                <p>{this.props.description}</p>        
            </div>
        )
    }
}
