import React, { Component } from 'react';

export class Label extends Component {

    render() {
        return (
                <label>{this.props.title}</label>
        )
    }
}

export default Label