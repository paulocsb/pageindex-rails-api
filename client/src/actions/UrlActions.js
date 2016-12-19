import { API_URL, RECIEVE_URLS, POST_URL, RECIEVE_ERROR } from './../constants/AppConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';
import AppAPI from './../utils/AppAPI';

export default {

  getUrls: () => {

    return new Promise((resolve, reject) => {
      
      AppAPI.get(API_URL + 'tasks/')
      .then(response => {
        AppDispatcher.dispatch({
          actionType: RECIEVE_URLS,
          urls: response
        });
        resolve(response);
      })
      .catch(error => {
        AppDispatcher.dispatch({
          actionType: RECIEVE_ERROR,
          message: error.responseText
        });
        reject('error');
      });

    });
  },

  createUrl: (params) => {

    return new Promise((resolve, reject) => {
      
      AppAPI.post(API_URL + 'tasks/', params)
      .then(response => {
        AppDispatcher.dispatch({
          actionType: POST_URL,
          url: response
        });
        resolve(response);
      })
      .catch(error => {
        AppDispatcher.dispatch({
          actionType: RECIEVE_ERROR,
          message: error.responseText
        });
        reject('error');
      });

    });
  },

}