import React, { Component } from 'react';

export class TextareaInput extends Component {

    constructor(props) {
        super(props);
        // this.state = {title: props.title}
        // this will need to give the task its internal value and should probably be on a higher level
    }

    render() {
        return (
            <textarea rows={this.props.rows} cols={this.props.cols} name={this.props.name} onChange={this.props.handleChange} ></textarea>
        )
    }
}

export default TextareaInput