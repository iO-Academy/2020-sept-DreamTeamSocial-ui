import React, { Component } from 'react';
import '../../App.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

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
            url: "http://localhost:3001/register",
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
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Register</h1>
                        <input className='password-input' type="text" name="username" placeholder='username' onChange={this.handleChange}/>
                        <input className='password-input' style={{borderColor: this.state.color}} type="password" name="password" placeholder='password' onChange={this.strengthIndicator}/>
                        <input className='password-input' type="text" name="email" placeholder='email' onChange={this.handleChange}/>
                        <input className='password-input' type="text" name="bio" placeholder='bio' onChange={this.handleChange}/>
                        <button>Submit</button>
                    </form>
                    <Link to='/'>
                        <h1>Login</h1>
                    </Link>
                </div>
            )
        }
    }

}
export default Register