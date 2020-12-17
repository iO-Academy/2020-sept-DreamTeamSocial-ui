import React, { Component } from 'react';

export class ListOfFollowing extends Component {

    render() {
        return (
            <li>
                <a href={"/profile/" + this.props.username}>{this.props.username}</a>
            </li>
        )
    }
}

export default ListOfFollowing