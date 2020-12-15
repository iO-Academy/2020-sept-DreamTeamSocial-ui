import React, {Component} from 'react';


export class Paragraph extends Component {
    render() {
        return (
            <p>{this.props.name}</p>
        )
    }
}