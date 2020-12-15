import React, { Component } from 'react';
import './login.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Button from "../button";
import Header from "../header";
import Label from "../label";
import Input from "../input";


export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
                console.log(response.data)
            } else {
                // this is where the local storage was
            }
        })
    };
    render() {
        // Use this code to redirect based on if user is logged in.
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        console.log(isAuthenticated)

        if(isAuthenticated) {
            const username = localStorage.getItem('username')
            return <Redirect to={'/profile/' + username}/>
        } else {
            return (
                <div className="main_container">
                    <div className="logo_box">
                        <img src="TILTime-logo.png" alt="Logo" />
                    </div>
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
                            <div className="error_msg">
                                <p>Your username or password was not recognised, please try again.</p>
                            </div>
                    </div>
                </div>
            )
        }
    }
}
