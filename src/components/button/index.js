import React, { Component } from 'react';


export class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {name: props.name}
    }

    render() {
        return (
            <button onClick={this.props.click}>{this.state.name}</button>
        )
    }
}

export default Button