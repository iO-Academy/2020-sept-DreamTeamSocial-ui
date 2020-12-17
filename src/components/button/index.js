import React, { Component } from 'react';
import './button.css';

export class Button extends Component {

    render() {
        return (
            <button className={this.props.className} onClick={this.props.click}>{this.props.name}</button>
        )
    }
}

export default Button