import React, {Component} from 'react';

export class Branding extends Component {
    render() {
        return (
            <img className={this.props.className} src="/images/TILTime-logo-transparent.png" alt="tiltime logo" />
        )
    }
}