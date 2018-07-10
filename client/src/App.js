import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import logo from './genie_lamp.png';
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
      profile_pic: '',
    };
  }

  componentWillMount() {
    console.log("App will mount");
  }

// Attempting to have the media box bounce into frame each time the component is reloaded. Not working as of 7/6/18.
  componentDidMount() {
    let tweetMedia = document.getElementById('tweet-box');
      tweetMedia.classList.add('animated', 'bounceInUp');
  }

// Below click function makes the call to Twitter and randomly selects one status from the data.
  click() {
    axios.get('http://localhost:3000/api/twitter')
      .then((res) => {
        const tweetArr = res.data.data.statuses;
        const item = tweetArr[Math.floor(Math.random() * tweetArr.length)];
        console.log(item);
        this.setState({
          tweet: item.text,
          screen_name: item.user.screen_name,
          twitter_name: item.user.name,
          profile_pic: item.user.profile_image_url,
        });
        console.log('The Axios call has been made')
      //console.log(JSON.stringify(res.data.data.statuses[0].text))
      })
      .catch(error => {
    console.log(error.response)
});

  }


// Below is from Bulma
  render() {
    return (
      <div className="container is-clearfix">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Igenio</h1>
        </header>
        <div>
          <section className="box">
            <h1 className="title">The Idea Generator</h1>
      <h2 className="subtitle">
        This is a simple project created using <strong>Node, Express, React JS, Twit and Twitter API </strong>. When the button below is clicked a function is called that tells <strong>Axios</strong> to fetch a group of tweets that meet a defined criteria. From there a random tweet is selected and displayed in the section below.
      </h2>

          </section>
        </div>
        <article className="media" id="tweet-box">
  <figure className="media-left">
    <p className="image is-96x96">
      <img src={this.state.profile_pic} alt="User Profile pic" />
    </p>
  </figure>
  <div className="media-content">
    <div className="content">
      <p>
        <strong>{this.state.twitter_name}</strong> @<small>{this.state.screen_name}</small> <small>31m</small>
        <br/>
        {this.state.tweet}
      </p>
    </div>
    <nav className="level is-mobile">
      <div className="level-left">
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-reply"></i></span>
        </a>
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-retweet"></i></span>
        </a>
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>

</article>
         {/*} <section>
            <blockquote>
              {this.state.tweet}
              <img src={this.state.profile_pic} alt="User's profile" />
                <p> - {this.state.screen_name}
                </p>

            </blockquote>
          </section> */}
        <button className="button is-primary is-rounded" onClick={this.click.bind(this)}>Random Idea</button>
        <Footer />
      </div>
    );
  }
}

export default App;
