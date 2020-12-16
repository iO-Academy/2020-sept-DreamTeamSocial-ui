import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from "react-router-dom";

export default class Timeline extends Component{
    // constructor(props) {
    //     super(props);
    // }

    //This function makes requests runs after the component loads which will be usefull to load timelines info.
    // componentDidMount() {
    // }

    render() {
        // Use this code to redirect based on if user is logged in.
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if(isAuthenticated) {
            return (
                //Timeline page JSX
                <h1>Timeline</h1>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}
