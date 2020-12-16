import React, {Component} from 'react';


export class Paragraph extends Component {
    render() {
        return (
            <p className={this.props.className}>{this.props.name}</p>
        )
    }
}