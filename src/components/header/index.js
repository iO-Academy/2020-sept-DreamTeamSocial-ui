import React, { Component } from 'react';

export class Header extends Component {

    render() {
        return (
            <header>
                <h1 className={this.props.className}>{this.props.title}</h1>
            </header>
        )
    }
}

export default Header