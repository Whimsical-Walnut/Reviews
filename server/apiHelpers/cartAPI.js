/* eslint-disable */
const axios = require('axios');
const config = require('../../config.js');


module.exports = {
  getItemsInCart: function(callback) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/cart`, {
      headers: {
        'User-Agent': 'request',
        Authorization: config.API_KEY,
      },
    })
      .then((response)=> {
        callback(null, response.data);
      })
      .catch((error)=> {
        console.log('Error', error)
        callback(error);
      })
  },
  addToCart: function(body, callback) {
    console.log(body);
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/cart`, body, {
      headers: {
        Authorization: config.API_KEY,
      }
    })
      .then((response) => {
        callback(null, response.data);
      })
  }
}