import React from 'react';
import _ from 'lodash';
import UrlRegex from 'url-regex';
import UrlActions from './../actions/UrlActions';

const UrlForm = React.createClass({

	getInitialState: function() {
    return {
      url: '',
      error: false
    };
  },

  _handleInputChange: function(ev) {
    var nextState = _.cloneDeep(this.state);
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
  },

  _closeAlert: function() {
    if (this.state.error) this.setState({ error: false });
  },

  _validateForm: function() {
    
    var error = false;

    if(this.state.url === '') {
      error = true;
    }

    if(!UrlRegex({exact: true}).test(this.state.url)) {
    	error = true;
    }

    this.setState({ error: error });
    return error;
  },

	_handleSubmit: function(e) {
    e.preventDefault();
    
    if (!this._validateForm()) {

    	const params = {
        task: { url: this.state.url }
      };

    	UrlActions.createUrl(params)
    	.then(response => {
    		this.props.handleUrl();
        this.setState(this.getInitialState());
    	})
    	.catch(error => {
        this.setState({ error: true });
      });
  	}
  },

	render: function() {
		return (
      <div className="panel-body">
				{this.state.error && (<div className="alert alert-danger alert-dismissible">
          <button type="button" className="close" onClick={this._closeAlert}>
            <span>&times;</span>
          </button><b>Invalid Url!</b>
        </div>)}
        <form className="form" onSubmit={this._handleSubmit}>
          <div className="input-group">
            <input 	type="text" 
            				name="url" 
            				className="form-control" 
            				placeholder="url"
            				value={this.state.url} 
            				onChange={this._handleInputChange} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Go!</button>
            </span>
          </div>
        </form>
      </div>
		);
	}
});

export default UrlForm;