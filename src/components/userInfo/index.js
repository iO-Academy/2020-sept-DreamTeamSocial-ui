import React, {Component} from 'react';
import {HeadingThree} from "../headingThree";
import {Paragraph} from "../paragraph";
import './index.css';

export class UserInfo extends Component {

    render() {
        return (
            <div>
                <HeadingThree name={this.props.username} />
                <h2>A bit about me:</h2>
                <Paragraph className="bio" name={this.props.bio} />
            </div>
        )
    }
}