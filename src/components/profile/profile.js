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
import {TilPost} from "../tilPost/tilPost";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {url: props.match.params.user,
                    loggedInUser: false,
                    tilPost: '',
                    userTils: [],
                    UserProfile: {
                        username: '',
                        bio: ''
                    },
                    loggedInUserProfile: false,
                    responsedata: false,
                    databaseError: ''
                };
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

    logOut = async () => {
        return axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:3001/user/logout"
        }).then( response => {
            if(response.data.success) {
                this.props.history.push('/');
            } else {
                console.log('Try again')
            }
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
            await this.getTilPosts()
            if (this.state.loggedInUser === this.state.url) {
                this.setState({loggedInUserProfile: true})
            } else {
                this.setState({loggedInUserProfile: false})
            }
        } else {
            this.props.history.push('/');
        }
    }

    addTILForm() {
        if (this.state.loggedInUserProfile) {
            return <div className="til_form">
            <form className="til_form_enter" onSubmit={this.sendNewTIL} >
                <Header title="Add A New Thing I Learned:" className="til_header"/>
                <ul className="form_wrapper">
                    <li className="form_row">
                        <TextareaInput className="TIL_textarea" rows="3" name="New TIL"
                                       placeholder="What did you learn today?" handleChange={this.handleChange}/>
                    </li>
                </ul>
                {this.databaseErrorMessage()}
                <p>Max 255 characters</p>
                <Button name="Add TIL"/>
            </form>
            </div>
        } else {
            return <h1>Placeholder for follow</h1>
        }
    }

    getTilPosts = async () => {
        return axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/til/" + this.state.url
        }).then( response => {
            if(response.data.success){
                this.setState({userTils: response.data.info})
            } else {
                this.setState({userTils: 'Nothing to see here'})
            }
        }).catch( err => {
            //Need to error handle this later
        })
    }

    formatDate(date) {
       const splitTimestamp = date.split(/[T.]/);
       const dateOfTil = splitTimestamp[0];
       let timeOfTil = splitTimestamp[1];
       timeOfTil = timeOfTil.substring(0, timeOfTil.length-3)
       return dateOfTil + ' at ' + timeOfTil
    }

    displayTILs() {
        const userTils = this.state.userTils;
        userTils.reverse()
        return (
            <>
                {userTils.map((post,i) => (
                    <TilPost formatDate={this.formatDate} posterName={post.username} id={post._id} i={i} createdAt={post.createdAt} tilPost={post.tilPost}/>
                    )
                )}
            </>
       )
    }

    handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({tilPost: value})
        console.log(this.state.tilPost)
    }

    databaseErrorMessage() {
        if(this.state.databaseError) {
            return <p className='error'>{this.state.databaseError}</p>
        }
    }

    sendNewTIL = async (event) => {
        event.preventDefault();
            axios({
            method: "POST",
            data: {username: this.state.loggedInUser, tilPost: this.state.tilPost},
            withCredentials: true,
            url: "http://localhost:3001/til"
        }).then( response => {
            if(response.data.success){
                this.setState({tilPost: '', databaseError: ''})
                event.target.reset()
                this.getTilPosts()
            } else {
                this.setState({databaseError: 'Sorry your TIL was too long, please shorten and try again.'})
            }
        }).catch( err => {
            this.setState({databaseError: 'Sorry your TIL was too long, please shorten and try again.'})
        })
    }

    render() {

        if (this.state.responsedata)
            if (this.state.loggedInUser) {
                    return (
                        <div className="container-fluid px-0">
                            <div className="row top_bar">
                                <div className="col-sm-12 col-md-12 col-xl-12 branding">
                                 <Branding className="img"/>
                                </div>
                            </div>
                            <div className="row page_content">
                                <div className="col-sm-12 col-md-3 user_info">
                                    <NavBar logout={this.logOut} currentUser={this.state.loggedInUser} />
                                    <UserInfo bio={this.state.UserProfile.bio} username={this.state.UserProfile.username}/>
                                </div>
                                <div className="col-sm-12 col-md-9 til_container">
                                    {this.addTILForm()}
                                    <Header className="timeline_header" title="My Past TILs" />
                                    {this.displayTILs()}
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