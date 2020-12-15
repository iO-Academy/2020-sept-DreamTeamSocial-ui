import React, { Component } from 'react';
import './button.css';

export class Button extends Component {

    render() {
        return (
            <button onClick={this.props.click}>{this.props.name}</button>
        )
    }
}

export default Button

// work out how to put this in main page
