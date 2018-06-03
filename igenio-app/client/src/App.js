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
      tweet: 'Tweet goes here',
      screen_name: '',
    };
  }

  componentWillMount() {
    console.log("App will mount");
  }

  click() {
    axios.get('http://localhost:3000/api/twitter')
      .then((res) => {
        const tweetArr = res.data.data.statuses;
        const item = tweetArr[Math.floor(Math.random() * tweetArr.length)];
        console.log(item);
        this.setState({
          tweet: item.text,
          screen_name: item.user.screen_name,
          profile_pic: item.user.profile_image_url,
        });
        console.log('The Axios call has been made')
      //console.log(JSON.stringify(res.data.data.statuses[0].text))
      })
      .catch(error => {
    console.log(error.response)
});
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Igenio</h1>
        </header>
         <section>
            <blockquote>
              {this.state.tweet}
              <img src={this.state.profile_pic} alt="User's profile" />
                <p> - {this.state.screen_name}
                </p>

            </blockquote>
          </section>
        <button onClick={this.click.bind(this)}>Random Idea</button>
        <Footer />
      </div>
    );
  }
}

export default App;
