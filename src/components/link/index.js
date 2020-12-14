import React, {Component} from 'react';


export class Link extends Component {
    render() {
        return (
            <a href={this.props.link}>{this.props.name}</a>
        )
    }
}