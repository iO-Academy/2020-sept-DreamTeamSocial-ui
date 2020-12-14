import React, {Component} from 'react';
import {Link} from "../link";
import './index.css';

export class NavBar extends Component {
    render() {
        return (
            <nav>
                <Link link="/profile" name="Profile" />
                <Link link="/timeline" name="Timeline" />
            </nav>
        )
    }
}