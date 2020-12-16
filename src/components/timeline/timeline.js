import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {NavBar} from "../navbar";
import {Branding} from "../branding";
import {UserInfo} from "../userInfo";
import axios from "axios";
import './timeline.css';
import Header from "../header";


export default class Timeline extends Component{

    constructor(props) {
        super(props);
        this.state = {url: props.match.params.user,
            loggedInUser: false,
            userTils: [],
            UserProfile: {
                username: '',
                bio: ''
            },
            loggedInUserProfile: false,
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

    getUserProfile = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/user/" + this.state.loggedInUser
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
            this.getUserProfile()
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

    getTilPosts = async () => {
        return axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/til/"
        }).then( response => {
            if(response.data.success){
                this.setState({userTils: response.data.info})
            } else {
                this.setState({userTils: 'Nothing to see here'})
            }
        }).catch( err => {
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

    databaseErrorMessage() {
        if(this.state.databaseError) {
            return <p className='error'>{this.state.databaseError}</p>
        }
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
                            </div>
                            <div className="col-sm-12 col-md-9 til_container">
                                <Header className="timeline_header" title="My TILTimeline" />
                                {this.displayTILs()}
                            </div>
                            <div>{this.databaseErrorMessage()}</div>
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
