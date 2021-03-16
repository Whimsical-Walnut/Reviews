const axios = require('axios');
const config = require('../../config.js');

const handleQStrings = (input, flag = '') => {
  if (input === undefined) {
    return '';
  }
  if (flag) {
    return `${flag}=${input}`;
  }
  return `/${input}`;
};

const getProducts = (q, callback) => {
  const query = {};
  query.product_id = handleQStrings(q.product_id);
  query.flag = handleQStrings(q.flag);
  query.page = handleQStrings(q.page, 'page');
  query.count = handleQStrings(q.count, 'count');

  if (query.page) {
    query.page = `/?${query.page}`;
    if (query.count) {
      query.count = `&${query.count}`;
    }
  } else if (query.count) {
    query.count = `/?${query.count}`;
  }

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products${query.product_id + query.flag + query.page + query.count}`, {
    headers: {
      'User-Agent': 'request',
      Authorization: config.API_KEY,
    },
  })
    .then((results) => {
      callback(null, results.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports.getProducts = getProducts;
