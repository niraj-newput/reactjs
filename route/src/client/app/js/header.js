import React from "react";
import { Switch, Route,Link } from 'react-router-dom';
import Home from "./home.js";
import About from "./about.js";
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">WebSiteName</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}