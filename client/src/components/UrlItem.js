import React from 'react';

function getUrlItem(key,value) {
  return (<div key={key}><code>{value}</code></div>);
}

const UrlItem = React.createClass({

  render: function() {

    const { page } = this.props;

    return (
    	<div className="well">
        <h3><i className="fa fa-globe"></i> URL</h3>
        <code>
          {page.url}
        </code>
        
        <br />
        
        <h3><i className="fa fa-hashtag"></i> H1</h3>
        {page.content.h1.map((v,k) => getUrlItem(k,v))}

        <h3><i className="fa fa-hashtag"></i> H2</h3>
        {page.content.h2.map((v,k) => getUrlItem(k,v))}
        
        <h3><i className="fa fa-hashtag"></i> H3</h3>
        {page.content.h3.map((v,k) => getUrlItem(k,v))}

        <h3><i className="fa fa-link"></i> LINKS</h3>
        {page.content.a.map((v,k) => getUrlItem(k,v))}
        
      </div>
    );
  }

});

export default UrlItem;
