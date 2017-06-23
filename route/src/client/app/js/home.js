import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from "./about.js";
import Contact from "./contact.js";
export default class Home extends React.Component {
  render(){
    return (
    <div>
      <Switch>
        <Route exact path='/' component={Contact}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
      </Switch>
    </div>
    );
  }
}

