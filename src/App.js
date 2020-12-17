import React, { Component } from 'react';
import './App.css';
//This is the stuff you need for routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/profile/profile";
import Timeline from "./components/timeline/timeline";

class App extends Component {


    render()
    {

        return (
            //This allows you to specify a route
            //The <Switch> means it will only match one url
            //The exact keyword means the url path has to match exactly
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" render={(routeProps) => (<Login {...routeProps} />)}/>
                        <Route path="/register" render={(routeProps) => (<Register {...routeProps} />)}/>
                        <Route path="/timeline" render={(routeProps) => (<Timeline {...routeProps} />)}/>
                        <Route exact path="/profile/:user" render={(routeProps) => (<Profile {...routeProps} />)}/>
                        <Route path="/profile/:user/:id" render={(routeProps) => (<Profile {...routeProps} />)}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
