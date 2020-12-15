import React, { Component } from 'react';
import './login.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Button from "../button";
import Header from "../header";
import Label from "../label";
import Input from "../input";
import {Branding} from "../branding";


export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedInUser: false,
            databaseError: false,
            databaseMessage: ''
        }
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

    async componentDidMount() {
        const response = await this.checkLoginStatus()
        if (response.success) {
            this.setState({loggedInUser: response.info.username});
        } else {
            this.props.history.push('/');
        }
    }

    handleChange  = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit  = (event) => {
        event.preventDefault();
        const { username, password } = this.state
        axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:3001/user/login",
        })
        .then(response => {
            if (!response.data.success) {
                this.setState({databaseError: true, databaseMessage: response.data.message})
            } else {
                this.props.history.push('/profile/' + this.state.username)
            }
        })
    };

    databaseErrorMessage() {
        if(this.state.databaseError) {
            return <p className='error'>{this.state.databaseMessage}</p>
        }
    }

    render() {
        // Use this code to redirect based on if user is logged in.

        if(this.state.loggedInUser) {
            return <Redirect to={'/profile/' + this.state.loggedInUser}/>
        } else {
            return (
                <div className="main_container">
                    <Branding className="loginLogo"/>
                    <div className='container'>
                        <div className="link_button">
                            <Link to='/register'>
                                 <Button name='Register'/>
                            </Link>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <Header title='Login'/>
                            <ul className="form_wrapper">
                               <li className="form_row">
                                   <Label title='Username:'/>
                                   <Input type="text" name="username" handleChange={this.handleChange}/>
                               </li>
                                <li className="form_row">
                                    <Label title='Password:'/>
                                    <Input type="password" name="password" handleChange={this.handleChange}/>
                                </li>
                                <Button name='Enter'/>
                            </ul>
                        </form>
                        <div>{this.databaseErrorMessage()}</div>
                    </div>
                </div>
            )
        }
    }
}
