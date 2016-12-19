import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import UrlRequest from './components/UrlRequest';
import UrlList from './components/UrlList';
import NotFound from './components/Notfound';

module.exports = (
	<Route path="/" component={App}>
    <IndexRoute component={UrlRequest} />
    <Route path="/request-url" component={UrlRequest} />
    <Route path="/list-urls" component={UrlList} />
    <Route path="*" component={NotFound} />
  </Route>
);