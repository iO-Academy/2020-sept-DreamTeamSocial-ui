import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {NavBar} from "../navbar";
import {Branding} from "../branding";
import {UserInfo} from "../userInfo";
import axios from "axios";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {url: props.match.params.user, loggedInUser: '', UserProfile: '', loggedInUserProfile: false};
    }

    checkLoginStatus = () => {
       // new api path, return an object that has the current logged in users info
    }

    getUserProfile = (username) => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/user/" + username
        }).then( response => {
            if (response.data.success) {
                this.setState({userProfile: response.data.info})
            } else {
                this.setState({userProfile: {username: 'error could not find user', bio: ''}})
            }
        }).catch( err => {
            console.log(err);
        })
    }


    componentDidMount() {
        const response = this.checkLoginStatus();
        if (response.data.success) {
            this.setState({loggedInUser: response.data.info});
            this.getUserProfile(this.state.url)
            if (this.state.loggedInUser === this.state.url) {
                this.setState({loggedInUserProfile: true})
            } else {
                this.setState({loggedInUserProfile: false})
            }
        } else {
            // redirect here

        }

    }

    editOrFollowButton() {
        if(this.state.loggedInUserProfile) {
            return <p>Edit</p>
        } else {
            return <p>Follow</p>
        }
    }

    render() {
        if (this.state.loggedInUser) {
                return (
                    <div>
                        <NavBar/>
                        <Branding/>
                        <UserInfo bio={this.state.userProfile}/>
                        {this.editOrFollowButton()}
                    </div>
                )
        } else {
            return (<Redirect to='/'/>)
        }
    }
}

export default Profile;