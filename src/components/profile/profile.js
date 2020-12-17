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
import { GrClose }  from "react-icons/gr";
import {HeadingThree} from "../headingThree";
import FollowingList from "../followingList";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {url: props.match.params.user,
                    loggedInUser: false,
                    loggedInUserFollowing: [],
                    buttonName: 'Follow',
                    tilPost: '',
                    userTils: [],
                    UserProfile: {
                        username: '',
                        bio: '',
                        following: []
                    },
                    loggedInUserProfile: false,
                    responsedata: false,
                    databaseError: '',
                    show: false
                };
        this.getUserProfile(this.state.url);
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
                if (username === this.state.url) {
                    this.setState({UserProfile: response.data.info})
                } else {
                    this.setState({loggedInUserFollowing: response.data.info.following});
                }
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
            this.getUserProfile(this.state.loggedInUser);
            await this.getTilPosts();
            if (this.state.loggedInUser === this.state.url) {
                this.setState({loggedInUserProfile: true})
            } else {
                this.setState({loggedInUserProfile: false})
            }
            if (this.state.loggedInUserFollowing.includes(this.state.url)) {
                this.setState({buttonName: 'Following'});
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
                return (
                    <div className="followButton">
                        <Button click={this.toggleFollow} name={this.state.buttonName} />
                        <HeadingThree name={this.state.UserProfile.username} />
                    </div>
                )
            }
    }

    toggleFollow = async () => {
        let requestUrl = "http://localhost:3001/user/" + this.state.loggedInUser + "?user2=" + this.state.url;
        axios({
            method: "PUT",
            withCredentials: true,
            url: requestUrl
        }).then (response => {
            if (response.data.success) {
                this.getUserProfile(this.state.loggedInUser);
                if (this.state.buttonName === 'Follow') {
                    this.setState({buttonName: 'Following'});
                } else {
                    this.setState({buttonName: 'Follow'});
                }
            } else {
                this.setState({databaseError: 'Unexpected error occurred. Please try again.'})
            }
        }).catch( err => {
            this.setState({databaseError: 'Sorry could not follow at this time.'})
        })
    }

    getTilPosts = async () => {
        return axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/til/" + this.state.url
        }).then (response => {
            if (response.data.success){
                this.setState({userTils: response.data.info})
            } else {
                this.setState({userTils: 'Nothing to see here'})
            }
        }).catch (err => {
            this.setState({databaseError: 'Sorry your TILs were not retrieved.'})
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
                    <div key={i} className="til_form">
                      <div className="flex_til_titles"><p>Posted by: {post.username} </p>
                          <p>Posted at: {this.formatDate(post.createdAt)}</p>
                      </div>
                        <p className="til_post_content">{post.tilPost}</p>
                    </div>)
                )}
            </>
       )
    }

    handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({tilPost: value})
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
                this.setState({databaseError: 'Sorry your TIL wasn\'t submitted, try again later.'})
            }
        }).catch( err => {
            this.setState({databaseError: 'Sorry your TIL wasn\'t submitted, try again later.'})
        })
    }

    followingModal = () => {
        if (this.state.show) {
            this.setState({show: false});
        } else {
            this.setState({show: true});
        }
    }

    displayFollowingModal() {
        let showModalClass = (this.state.show ? '' : 'hidden');
        return (
            <div className={"backgroundModal " + showModalClass}>
                <div className="followingModal">
                    <Button name={<GrClose />} click={this.followingModal} />
                    <FollowingList type="modal" followingList={this.state.UserProfile.following} />
                </div>
            </div>
        )
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
                                    <NavBar currentUser={this.state.loggedInUser} />
                                    <UserInfo bio={this.state.UserProfile.bio} username={this.state.UserProfile.username}/>
                                    <div className="followingSection">
                                        <FollowingList type="onProfile" followingList={this.state.UserProfile.following} />
                                        <Button name="View All" click={this.followingModal}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-9 til_container">
                                    {this.addTILForm()}
                                    <Header className="timeline_header" title="My Past TILs" />
                                    {this.displayTILs()}
                                </div>
                                <div>{this.databaseErrorMessage()}</div>
                            </div>
                            {this.displayFollowingModal()}
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