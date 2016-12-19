import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {	
	render() {
		return (
			<div className="container">
		  	<div className="text-center">
	        <h1>404</h1>
	        <h3>Sorry but we couldnt find this page</h3>
	        <div className="text-center">
		        <Link to="/">Home Page</Link>
	        </div>
				</div>
			</div>
		);
	}
};

export default NotFound;