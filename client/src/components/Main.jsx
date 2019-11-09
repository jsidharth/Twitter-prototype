import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/home" component = { Home } />
            </div>
        );
    }
}

export default Main;