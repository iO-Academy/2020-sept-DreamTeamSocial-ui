import React, {Component} from 'react';
import {HeadingThree} from "../headingThree";
import {Paragraph} from "../paragraph";
import axios from "axios";
import './index.css';

export class UserInfo extends Component {


    render() {
        return (
            <div className="userInfo">
                <HeadingThree name={this.props.username} />
                <Paragraph name={this.props.bio} />
            </div>
        )
    }
}