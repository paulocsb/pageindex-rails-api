import React, { Component } from 'react';
import UrlStore from './../stores/UrlStore';
import UrlForm from './UrlForm';
import UrlListItems from './UrlListItems';

class UrlRequest extends Component {

	constructor(props) {
    super(props);
    this.state = { 
      url: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    UrlStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    UrlStore.getUrl()
  }

  componentWillUnmount() {
    UrlStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      url: [UrlStore.getUrl()]
    });
  }

  _handleUrl() {
  	UrlStore.getUrl();
  }

	render() {
		return (
			<div className="panel panel-default">
				<UrlForm handleUrl={this._handleUrl} />
				<hr />
				<UrlListItems urls={this.state.url} />
			</div>
		);
	}
}

export default UrlRequest;