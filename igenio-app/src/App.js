import React, { Component } from 'react';
import logo from './logo.svg';
import IdeaButton from './components/IdeaButton.js';
import Footer from '.components/Footer.jsx';
import SingleTweet from './components/SingleTweet';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SingleTweet />
        <IdeaButton />
        <Footer />
      </div>
    );
  }
}

export default App;
