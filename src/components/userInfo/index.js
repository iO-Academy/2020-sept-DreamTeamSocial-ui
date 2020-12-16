import React, {Component} from 'react';
import {HeadingThree} from "../headingThree";
import {Paragraph} from "../paragraph";
import axios from "axios";
import './index.css';

export class UserInfo extends Component {


    render() {
        return (
            <div>
                <HeadingThree name={this.props.username} />
                <Paragraph className="bio" name={this.props.bio} />
            </div>
        )
    }
}