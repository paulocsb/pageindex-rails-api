import React from 'react';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/App.css';

const App = React.createClass({
  
  getInitialState: function() {
    return {
      activeFirstTab: true,
      activeSecondTab: false
    }
  },

  _ActiveFirstTab: function() {
    if (!this.state.activeFirstTab) this.setState(this.getInitialState());
  },

  _ActiveSecondTab: function() {
    if (!this.state.activeSecondTab) {
      this.setState({
        activeFirstTab: false,
        activeSecondTab: true
      });
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <h2>LIM</h2>
        </div>
        <ul id="menuTabs" className="nav nav-tabs nav-justified" role="tablist">
          <li role="presentation" className={this.state.activeFirstTab && "active"}>
            <Link to="/request-url" onClick={this._ActiveFirstTab}>Request Url</Link>
          </li>
          <li role="presentation" className={this.state.activeSecondTab && "active"}>
            <Link to="/list-urls" onClick={this._ActiveSecondTab}>List Urls</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

export default App;
