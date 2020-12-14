import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {NavBar} from "../navbar";
import {Branding} from "../branding";
import {UserInfo} from "../userInfo";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {profileUser: props.match.params.user};
    }


    render() {
        //Use this code to redirect based on if user is logged in.
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (isAuthenticated) {
            if (this.state.profileUser === localStorage.getItem('username')) {
                return (
                    <div>
                        <NavBar/>
                        <Branding/>
                        <UserInfo user="ownProfile"/>
                        <p>Edit</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <NavBar/>
                        <Branding/>
                        <UserInfo user={this.state.profileUser}/>
                        <p>Follow</p>
                    </div>
                )
            }
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default Profile;