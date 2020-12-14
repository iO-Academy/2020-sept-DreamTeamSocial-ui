import React, { Component } from 'react';
import './register.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Button from "../button";
import Header from "../header";
import Label from "../label";
import Input from "../input";
import TextareaInput from "../textareaInput";

class Register extends Component{
    state = {
        username: '',
        password: '',
        email: '',
        bio: '',
        color: '#ccc',
        strength: '',
    }

    hasNumber = (value) => {
        return new RegExp(/[0-9]/).test(value);
    }

    hasMixed = (value) => {
        return new RegExp(/[a-z]/).test(value) &&
            new RegExp(/[A-Z]/).test(value);
    }
    hasSpecial = (value) => {
        return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
    }
    strengthColor = (count) => {
        if (count === 0) {
            this.setState({
                color: "#ccc"
            })
        }
        if (count >= 2) {
            this.setState({
                color: "red"
            })
        }
        if (count >= 3) {
            this.setState({
                color: "yellow"
            })
        }
        if (count >= 4) {
            this.setState({color: "orange"})
        }
        if (count >= 5) {
            this.setState({color: "lightgreen"})
        }
        if (count >= 6) {
            this.setState({
                color: "green"
            })
        }
    }
    strengthIndicator = (event) => {
        let strengths = 0;
        if (event.target.value.length > 5)
            strengths++;
        if (event.target.value.length > 7)
            strengths++;
        if (this.hasNumber(event.target.value))
            strengths++;
        if (this.hasSpecial(event.target.value))
            strengths++;
            strengths++;
        if (this.hasMixed(event.target.value))
            strengths++
        this.setState({
            strength: strengths
        })
        this.strengthColor(strengths);
    }

    handleChange  = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };
    handleSubmit  = (event) => {
        event.preventDefault();
        const { username, password, email, bio} = this.state
        axios({
            method: "POST",
            data: {
                username: username,
                password: password,
                email: email,
                bio: bio
            },
            withCredentials: true,
            url: "http://localhost:3001/user",
        })
        .then((response) => {
            console.log(response)
            //Need to write code to check if user was successfully created and then log them in.
        })
        .catch((error) => {
            console.log(error)
        })
    };
    render() {
        // Use this code to redirect based on if user is logged in.
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if(isAuthenticated) {
            return <Redirect to='/profile'/>
        } else {
            return (
                <div className="main_container">
                    <div className="logo_box">
                        <img src="TILTime-logo.png" alt="Logo"/>
                    </div>
                        <div className='container'>
                            <div className="link_button">
                                <Link to='/'>
                                    <Button name='Login'/>
                                </Link>
                            </div>

                        <form onSubmit={this.handleSubmit}>
                            <Header title='Register'/>
                            <ul className="form_wrapper">
                                <li className="form_row">
                                    <Label title="Choose Username: " />
                                    <Input className='password-input' type="text" name="username" handleChange={this.handleChange}/>
                                </li>
                                <p className="requirement_username">Must not contain spaces or special characters.</p>
                                <li className="form_row">
                                    <Label title="Email: " />
                                    <Input className='password-input' type="text" name="email" handleChange={this.handleChange}/>
                                </li>
                                <p></p>
                                <li className="form_row">
                                    <Label title="Password: " />
                                    <Input className='password-input' style={{borderColor: this.state.color}} type="password" name="password" handleChange={this.strengthIndicator}/>
                                </li>
                                <p className="requirement_password">Password must be min 8 characters and include lowercase letters and at least one numerical digit.</p>
                                <li className="form_row">
                                    <Label title="Bio: " />
                                    <TextareaInput rows="5" cols="70.5" name="bio"  handleChange={this.handleChange}/>
                                </li>
                                <p className="requirement_bio">Tell us about you! Max length 500 characters.</p>
                            <Button name="Submit"/>
                            </ul>
                        </form>
                            <div className="error_msg">
                                <p>Your information does not meet requirements, please try again.</p>
                            </div>
                    </div>
                </div>
            )
        }
    }

}
export default Register;

