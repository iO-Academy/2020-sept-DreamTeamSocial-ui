import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    //This function makes requests runs after the component loads which will be usefull to load profile info.
    // componentDidMount() {
    // }

    render() {
        return (
            <h1>Profile</h1>
        )
    }
}

export default Profile