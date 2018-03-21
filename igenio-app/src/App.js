import React, { Component } from 'react';
import logo from './logo.svg';
// import IdeaButton from './components/IdeaButton.js';
import Footer from './components/Footer.jsx';
// import SingleTweet from './components/SingleTweet';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweet: '',
      screen_name: '',
    };
  }

  componentWillMount() {
    console.log("App will mount");
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/twitter')
      .then((res) => {
        const tweetArr = res.data.data.statuses;
        const item = tweetArr[Math.floor(Math.random() * tweetArr.length)];
        console.log(item);
        this.setState({
          tweet: item.text,
          screen_name: item.user.screen_name,
        });
      // console.log(JSON.stringify(res.data.data.statuses[0].text))
      });
  }


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
         <section>
            <blockquote>
              {this.state.tweet}

                <p> - {this.state.screen_name}</p>

            </blockquote>
          </section>
        <button>Random Idea</button>
        <Footer />
      </div>
    );
  }
}

export default App;
