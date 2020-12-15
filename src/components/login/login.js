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
    }

    state = {
        username: '',
        password: '',
    }

    handleChange  = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit  = (event) => {
        event.preventDefault();
        const { username, password} = this.state
        axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:3001/user/login",
        })
            //This is probably not the best way to authenticate a user. A check on the status code would be better.
        .then(response => {
            console.log(response.data)
            if (!response.data.success) {
                console.log(response.data)
            } else {
                //Need to store the user data in local storage
                Object.keys(response.data.info).forEach((item) => {
                    localStorage.setItem(item, response.data.info[item])
                });
                //This pushes you to the profile page on successful login.
                const username = localStorage.getItem('username')
                this.props.history.push('/profile/' + username);
                //This is how you store an array
                // localStorage.setItem('array', JSON.stringify(['Hello', 'Super']))
                // //This is how to retrieve array
                // var storedNames = JSON.parse(localStorage.getItem('array'));
                // console.log(response.data);
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
