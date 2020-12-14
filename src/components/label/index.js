import React, { Component } from 'react';

export class Label extends Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title}
        // this will need to give the task its internal value and should probably be on a higher level
    }

    render() {
        return (
                <label>{this.state.title}</label>
        )
    }
}

export default Label