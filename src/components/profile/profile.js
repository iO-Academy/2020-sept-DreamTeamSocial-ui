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
        this.state = {url: props.match.params.user, loggedInUser: false, UserProfile: {username: '', bio: ''}, loggedInUserProfile: false, responsedata: false};
    }

    checkLoginStatus = async () => {
        return axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/user/loggedIn"
        }).then( response => {
            return response.data
        }).catch( err => {
            this.props.history.push('/');
        })
    }

    getUserProfile = (username) => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/user/" + username
        }).then( response => {
            if (response.data.success) {
                this.setState({UserProfile: response.data.info})
            } else {
                this.setState({UserProfile: {username: 'error could not find user', bio: ''}})
            }
        }).catch( err => {
            this.props.history.push('/profile/' + this.state.loggedInUser);
        })
    }


    async componentDidMount() {
        const response =  await this.checkLoginStatus();
        if (response.success) {
            this.setState({loggedInUser: response.info.username, responsedata: true});
            this.getUserProfile(this.state.url)
            if (this.state.loggedInUser === this.state.url) {
                this.setState({loggedInUserProfile: true})
            } else {
                this.setState({loggedInUserProfile: false})
            }
        } else {
            this.props.history.push('/');
        }
    }

    followButton() {
        // if(!this.state.loggedInUserProfile) {
        //     return <p>Follow</p>
        // } button not needed yet
    }

    render() {
        if (this.state.responsedata)
            if (this.state.loggedInUser) {
                    return (
                        <div>
                            <NavBar currentUser={this.state.loggedInUser}/>
                            <Branding/>
                            <UserInfo bio={this.state.UserProfile.bio} username={this.state.UserProfile.username}/>
                            {this.followButton()}
                        </div>
                    )
            } else {
                return (<Redirect to='/'/>)
            }
        else {
            return ( <div>Loading</div>) // add loading gif if we get to it but this is barely noticable anyway
        }
    }
}

export default Profile;