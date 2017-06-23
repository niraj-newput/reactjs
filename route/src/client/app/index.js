import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Link } from 'react-router-dom'
import App from "./js/app.js"


// class Home extends React.Component {
//     render(){
//         return (<h1>Hi</h1>);
//     }
// }

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('container')
);