import React, { Component } from 'react';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title}
        // this will need to give the task its internal value and should probably be on a higher level
    }

    render() {
        return (
            <header>
                <h1>{this.state.title}</h1>
            </header>
        )
    }
}

export default Header