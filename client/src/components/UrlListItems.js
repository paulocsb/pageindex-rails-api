import React, { Component } from 'react';
import UrlItem from './UrlItem';

function getUrlItem(page) {
  return (
    <UrlItem
      key={page.id}
      page={page}
    />
  );
}

class UrlListitems extends Component {

  render() {

    let urlsListItems;
    
    if (this.props.urls) {
      urlsListItems = this.props.urls.map(page => getUrlItem(page));
    }

    return (
      <div className="panel-body">
        {urlsListItems}
      </div>
    );
  }
}

export default UrlListitems;
