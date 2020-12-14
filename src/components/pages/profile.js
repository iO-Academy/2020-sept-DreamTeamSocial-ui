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
        // Use this code to redirect based on if user is logged in.
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if(isAuthenticated) {
            return (
                <div>
                    <h1>Profile</h1>
                </div>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default Profile