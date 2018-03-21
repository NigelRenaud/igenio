// set up dotenv to hide keys in .env folder
require('dotenv')config();
//import required modules the server will need to run.
const express = require('express');
const Twit = require('twit');
const bodyParser = require('bodyParser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');


const app = express();

// port number may need to change to 3001 to avoid conficts with the react server.
const PORT = process.env.PORT || 3000;

// logging the dependencies
// setting up logger
app.use(logger('dev'));

//below sets up the bodyParser to handle json data being received.
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

// setting up static files
app.use(express.static(path.join(__dirname, 'public')));

// Below the Twit module is used to pull tweets from the Twitter API.
app.get('/api/twitter', (req, res) => {
  const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    app_only_auth: true,
  });

  const params = { q: '"somebody should" OR "someone should" AND "make a" OR "build a" -"trump" -"liberals" -"snowflakes" -"blocklist" -"account" -"cash app" since:2018-03-01 exclude:replies exclude:retweets', count: 50 };

  const tweetData = (err, data, response) => {
    res.json({
      data,
    });
  };

  T.get('search/tweets', params, tweetData);
});

// Instead of page found, send down the react app to handle any pages.
app.get('*', (req, res) => {
  // Send index.html file which is the entire react app.
  res.sendFile(`${__dirname}/igenio-app/public/index.html`);
});

// Listening on PORT
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
