import React, { Component } from 'react';
import 'bulma/css/bulma.css'
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
      profile_pic: '',
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



  render() {
    return (
      <div className="container is-clearfix">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Igenio</h1>
        </header>

        <article className="media">
  <figure className="media-left">
    <p className="image is-96x96">
      <img src={this.state.profile_pic} alt="User Profile pic" />
    </p>
  </figure>
  <div className="media-content">
    <div className="content">
      <p>
        <strong>{this.state.twitter_name}</strong> <small>{this.state.screen_name}</small> <small>31m</small>
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
