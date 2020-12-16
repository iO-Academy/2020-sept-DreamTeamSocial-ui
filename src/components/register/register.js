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
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

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
            loggedInUser: false,
            databaseError: false,
            databaseMessage: '',
            errors: {
                username: '',
                email: '',
                password: '',
                bio: '',
            }
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
            this.setState({databaseError: true, databaseMessage: "Couldn't connect to database"})
        })
    }

    async componentDidMount() {
        const response = await this.checkLoginStatus()
        if (response.success) {
            this.setState({loggedInUser: response.info.username});
        } else {
            this.setState({loggedInUser: false});
        }
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
                        : 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lower case, 1 special character & 1 number.';
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
                    if (!response.data.success) {
                        //Handle if registration fails
                        this.setState({databaseError: true, databaseMessage: response.data.message})
                    } else {
                        axios({
                            method: "POST",
                            data: {
                                username: username,
                                password: password,
                            },
                            withCredentials: true,
                            url: "http://localhost:3001/user/login",
                        }).then(response => {
                                if(response.data.success) {
                                    this.props.history.push('/profile/' + username);
                                } else {
                                    this.props.history.push('/');
                                }
                            })
                    }
                })
                .catch((error) => {
                    this.setState({databaseError: true, databaseMessage: response.data.message})
                })
        } else{
            console.error('Invalid Form')
        }
    }

    databaseErrorMessage() {
        if(this.state.databaseError) {
            return <p className='error'>{this.state.databaseMessage}</p>
        }
    }

    render() {
        const {errors} = this.state;

        if(this.state.loggedInUser) {
            return <Redirect to={'/profile/' + this.state.loggedInUser}/>
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
                            <div>{this.databaseErrorMessage()}</div>
                        </form>
                    </div>
                </div>
            )
        }
    }

}
export default Register;

