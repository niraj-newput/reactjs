import React from 'react';
import { Link } from 'react-router-dom';
export default class Contact extends React.Component {
  render(){
    return (
      <div>
        <Link to="/about">About</Link>
        <h1>contact</h1>
      </div>
    );
  }
}