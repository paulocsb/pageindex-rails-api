import AppDispatcher from './../dispatcher/AppDispatcher';
import { RECIEVE_URLS, POST_URL, RECIEVE_ERROR } from './../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _urls = [];
let _url = {};
let _error = '';

function setUrls(urls) {
  _urls = urls;
}

function setUrl(url) {
  _url = url;
}

function setError(error) {
  return _error;
}

class UrlStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getUrls() {
    return _urls;
  }

  getUrl() {
    return _url;
  }

  getError() {
    return _error;
  }
}

const UrlStore = new UrlStoreClass();

UrlStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case POST_URL:
      setUrl(action.url);
      UrlStore.emitChange();
      break

    case RECIEVE_URLS:
      setUrls(action.urls);
      UrlStore.emitChange();
      break

    case RECIEVE_ERROR:
      setError(action.message);
      UrlStore.emitChange();
      break

    default:
  }

});

export default UrlStore;