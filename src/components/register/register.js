import React, { Component } from 'react';
import './register.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Button from "../button";
import Header from "../header";
import Label from "../label";
import Input from "../input";
import TextareaInput from "../textareaInput";

const validUsernameRegex = RegExp(/^[a-zA-Z0-9-_]{8,20}$/);
const validEmailRegex =
    RegExp(/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}



class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            bio: null,
            errors: {
                username: '',
                email: '',
                password: '',
                bio: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username =
                    validUsernameRegex.test(value)
                        ? ''
                        : 'Username must be 8-20 characters long with no spaces! Letters, underscores and numbers allowed.';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                   validPasswordRegex.test(value)
                        ? ''
                        : 'Password must be at least 8 characters long, with at least one uppercase letter and one number.';
                break;
            case 'bio':
                errors.bio =
                    value.length > 500
                        ? 'Bio must be less than 500 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
            const { username, password, email, bio} = this.state;
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
                .then(response => {
                    console.log(response.data)
                    if (!response.data.success) {
                        console.log(response.data)
                    } else {
                        console.log('hello')
                        axios({
                            method: "POST",
                            data: {
                                username: username,
                                password: password,
                            },
                            withCredentials: true,
                            url: "http://localhost:3001/user/login",
                        }).then(response => {
                                this.props.history.push('/profile/' + username);
                            })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else{
            console.error('Invalid Form')
        }
    }

    render() {
        const {errors} = this.state;
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
                                    <Input type="text" name="username" handleChange={this.handleChange}/>
                                </li>
                                {errors.username.length > 0 &&
                                <p className='error requirement_username'>{errors.username}</p>}
                                <li className="form_row">
                                    <Label title="Email: " />
                                    <Input type="text" name="email" handleChange={this.handleChange}/>
                                </li>
                                {errors.email.length > 0 &&
                                <p className='error requirement_email'>{errors.email}</p>}
                                <li className="form_row">
                                    <Label title="Password: " />
                                    <input type="password" name="password" onChange={this.handleChange}/>
                                </li>
                                {errors.password.length > 0 &&
                                <p className='error requirement_password'>{errors.password}</p>}
                                <li className="form_row">
                                    <Label title="Bio: " />
                                    <TextareaInput rows="5" name="bio" placeholder="Tell us about you! Max length 500 characters." handleChange={this.handleChange}/>
                                </li>
                                {errors.bio.length > 0 &&
                                <p className='error requirement_bio'>{errors.bio}</p>}
                                <Button name="Submit"/>
                            </ul>
                        </form>
                    </div>
                </div>
            )
        }
    }

}
export default Register;

