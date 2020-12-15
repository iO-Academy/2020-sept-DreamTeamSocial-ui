import React, { Component } from 'react';

export class TextareaInput extends Component {

    render() {
        return (
            <textarea className={this.props.className} rows={this.props.rows} name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.handleChange} />
        )
    }
}

export default TextareaInput