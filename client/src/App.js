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
      quoted_tweet: false,
      quoted_tweet_pic: false,
      tweet: '',
      tweet_pic: null,
      screen_name: '',
      profile_pic: null,
    };

    this.click = this.click.bind(this);
  }

  componentWillMount() {
    console.log("App will mount");
  }

// Attempting to have the media box bounce into frame each time the component is reloaded. Not working as of 7/6/18.
  /* componentDidMount() {
    let tweetMedia = document.getElementById('tweet-box');
      tweetMedia.classList.add('animated', 'bounceInUp');
  } */

  componentDidUpdate(){
    let tweetMedia = document.getElementById('tweet-box');
          tweetMedia.classList.remove('animated', 'bounceInUp');
    console.log("The tweet updated");
  }
// Below click function makes the call to Twitter and randomly selects one status from the data.
  click() {
      let tweetMedia = document.getElementById('tweet-box');
          tweetMedia.classList.add('animated', 'bounceInUp');
    axios.get('api/twitter')
      .then((res) => {
        const tweetArr = res.data.data.statuses;
        const item = tweetArr[Math.floor(Math.random() * tweetArr.length)];
        console.log(item);
        this.setState({
          // quoted_tweet is checking to see if the main tweet is quoting someone else
          quoted_tweet: (item.is_quote_status) ? item.quoted_status.full_text : false,
          // below is checking to see if that quoted tweet had an image attached.
          quoted_tweet_pic: (item.is_quote_status) ? item.quoted_status.media_url : false,
          // below is full text of the main tweet.
          tweet: item.full_text,
          // below tweet_pic is checking if there are any pictures attached to the main tweet, if so put them in this prop.
          tweet_pic: (item.extended_entities) ? item.extended_entities.media[0].media_url : null,
          screen_name: item.user.screen_name,
          twitter_name: item.user.name,
          profile_pic: item.user.profile_image_url_https,
          tweet_url: `https://twitter.com/${item.user.screen_name}/status/${item.id_str}`,
        });
        console.log(`Quote? ${this.state.quoted_tweet}`)
        console.log(`Is there a quote pic? ${this.state.quoted_tweet_pic}`)
      })
      .catch(error => {
    console.log(error.message)
});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.twitter_name !==this.twitter_name;
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
      <h6 className="subtitle is-6">
        This is a simple project created using <strong>Node, Express, React JS, Twit and Twitter API </strong>. When the button below is clicked a function is called that tells <strong>Axios</strong> to fetch a group of tweets that meet a defined criteria. From there a random tweet is selected and displayed in the section below.
      </h6>

          </section>
        </div>
        <article className="media" id="tweet-box">
  <figure className="media-left">
    <p className="image is-96x96">
      <img src={this.state.profile_pic} alt="" />
    </p>
  </figure>
  <div className="media-content">
    <div className="content">
      <p>
        <strong><a href={this.state.tweet_url} target="_blank">{this.state.twitter_name}</a>  </strong>
        <small>{this.state.screen_name}</small>
        <br/>
        {this.state.tweet}
        <img src={this.state.tweet_pic} />
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
