import React, { Component } from 'react';

export class Input extends Component {

    constructor(props) {
        super(props);
        // this.state = {title: props.title}
        // this will need to give the task its internal value and should probably be on a higher level
    }

    render() {
        return (
            <input type={this.props.type} name={this.props.name} onChange={this.props.handleChange}/>
        )
    }
}

export default Input