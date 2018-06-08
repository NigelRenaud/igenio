import React, { Component } from 'react';
// import Twit from 'twit';
// import Config from '../config';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleTweet extends Component {
  constructor() {
    super();
    this.state = {
      tweet: '',
      screen_name: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/twitter')
      .then((res) => {
        const tweetArr = res.data.data.statuses;
        const item = tweetArr[Math.floor(Math.random() * tweetArr.length)];
        console.log(item);
        this.setState({
          tweet: item.full_text,
          screen_name: item.user.screen_name,
        });
      // console.log(JSON.stringify(res.data.data.statuses[0].text))
      });
  }

//   shouldComponentUpdate(nextTweet, nextState) {
//   return nextTweet.tweet !==this.state.tweet;
// }

  render() {
    return (
      <section>

        <blockquote>
          {this.state.tweet}
        <p>test</p>
        <p> - {this.state.screen_name}</p>

        </blockquote>
      </section>
    );
  }
}

export default SingleTweet;
