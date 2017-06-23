import React from 'react';
import Header from "./header.js";
import Home from "./home.js";
class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    )
  }
}

export default App;