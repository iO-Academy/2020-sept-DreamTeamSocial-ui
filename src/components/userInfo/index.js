import React, {Component} from 'react';
import {HeadingThree} from "../headingThree";
import {Paragraph} from "../paragraph";
import './index.css';

export class UserInfo extends Component {

    constructor(props) {
        super(props);
        if ( props.user === 'ownProfile') {
            this.state =  { username: localStorage.getItem('username'), bio: localStorage.getItem('bio')}
        } else {
            fetch('http://localhost:3001/user/' . props.user)
            this.state =  {username: 'no', bio: 'no'};
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="userInfo">
                <HeadingThree name={this.state.username} />
                <Paragraph name={this.state.bio} />
            </div>
        )
    }
}