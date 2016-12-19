import React, { Component } from 'react';
import UrlStore from './../stores/UrlStore';
import UrlActions from './../actions/UrlActions';
import UrlListItems from './UrlListItems';

class UrlList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      urls: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    UrlStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    UrlActions.getUrls();
  }

  componentWillUnmount() {
    UrlStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      urls: UrlStore.getUrls()
    });
  }

  render() {

    return (
      <div className="panel panel-default">
        <UrlListItems urls={this.state.urls} />
      </div>
    );
  }
}

export default UrlList;
