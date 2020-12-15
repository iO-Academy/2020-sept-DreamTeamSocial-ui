import React, { Component } from 'react';

export class Input extends Component {

    render() {
        return (
            <input type={this.props.type} name={this.props.name} onChange={this.props.handleChange}/>
        )
    }
}

export default Input