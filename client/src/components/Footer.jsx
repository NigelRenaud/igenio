import React, { Component } from 'react';
// Import component from react.
class Footer extends Component {
  render() {
    return ( // Render footer container with credits and links.
    <footer className="footer">
  <div className="container">
    <div className="content has-text-centered">
      <p>
          <strong>Express + React App</strong> by <a href="http://www.knownesbitt.com">Darren Nesbitt 2018</a>.
          <br/>
          <strong>See more Projects on </strong><a href="http://www.github.com/NigelRenaud">GitHub</a>.
        </p>
    </div>
  </div>
</footer>
    );
  };
}

export default Footer;
