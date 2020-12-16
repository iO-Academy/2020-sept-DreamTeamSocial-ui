import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {NavBar} from "../navbar";
import {Branding} from "../branding";
import {UserInfo} from "../userInfo";
import axios from "axios";
import './profile.css';
import Header from "../header";
import TextareaInput from "../textareaInput";
import Button from "../button";
import {Link} from "react-router-dom";
import Label from "../label";
import Input from "../input";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {url: props.match.params.user, loggedInUser: false, UserProfile: {username: '', bio: "I'm a happy little vegemite"}, loggedInUserProfile: false, responsedata: false};
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
                this.setState({UserProfile: {username: 'error could not find user', bio: "I'm a happy little vegemite"}})
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

    addTILForm() {
        return <form className="add_til_form">
                <Header title="Add New Thing I learnt" />
                    <ul className="form_wrapper">
                        <li className="form_row">
                            <TextareaInput className="TIL_textarea" rows="3" name="New TIL"
                                           placeholder="What did you learn today?"/>
                        </li>
                    </ul>
                    <p>Max 255 characters</p>
                    <Button name="Add TIL"/>
            </form>
    }

    render() {

        if (this.state.responsedata)
            if (this.state.loggedInUser) {
                    return (
                        <div className="container-fluid px-0">
                            <div className="row top_bar">
                                <div className="col-sm-12 col-md-12 col-xl-12 branding">
                                    <img className="brand_logo" src="/images/TILTime-logo-transparent.png" alt="tiltime logo" />
                                </div>
                                <nav className="col-sm-12 col-md-3 col-xl-3 navigation">
                                    <p><a href={'/profile/' + this.state.loggedInUser}>Profile</a></p>
                                </nav>
                            </div>
                            <div className="row page_content">
                                <div className="col-sm-12 col-md-3 user_info">
                                    <UserInfo bio={this.state.UserProfile.bio} username={this.state.UserProfile.username}/>
                                </div>
                                <div className="col-sm-12 col-md-9 til_container">
                                    <h1>Start</h1>
                                    {this.addTILForm()}
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                    <form className="add_til_form">
                                        <label htmlFor="fname">First name:</label>
                                        <input type="text" id="fname" name="fname" value="John"></input>
                                        <label htmlFor="lname">Last name:</label>
                                        <input type="text" id="lname" name="lname" value="Doe"></input>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                </div>
                            </div>
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