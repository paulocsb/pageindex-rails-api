import Axios from 'axios';

export default {

  get: (url) => {
    return new Promise((resolve, reject) => {
      var _axios = Axios.create();
      _axios.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  post: (url, params) => {
    return new Promise((resolve, reject) => {
      var _axios = Axios.create();
      _axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  delete: (url) => {
    return new Promise((resolve, reject) => {
      var _axios = Axios.create();
      _axios({method: 'delete', url: url})
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}