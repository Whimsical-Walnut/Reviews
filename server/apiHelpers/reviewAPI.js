/* eslint-disable */
const axios = require('axios');
const config = require('../../config.js');

const handleQStrings = (input, flag = '') => {
  if (input === undefined) {
    return '';
  } else {
    if (flag) {
      return `&${flag}=${input}`
    }
    return '/' + input;
  }
};

// TODO GET + POST + PUT
const getReviews = (q, callback) => {

  q.meta = handleQStrings(q.meta);    // if exists => /meta or undefined => ''
  q.product_id = '/?product_id=' + q.product_id ; // if exists => /product_id or undefined => ''
  q.page = handleQStrings(q.page, 'page'); // if exists => page=q.page else ''
  q.count = handleQStrings(q.count, 'count');
  q.sort = handleQStrings(q.sort, 'sort');

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews${q.meta + q.product_id + q.page + q.count + q.sort}`, {
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
  })
};

const postReviews = (body, callback) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews`, body, {
    headers: {
      Authorization: config.API_KEY,
    }
  })
    .then((results) => {
      console.log('api results', results.data)
      callback(null, results.data);
    })
    .catch((err) => {
      console.log('api err', err)
      callback(err, null);
    })
};

const putReviews = (body ,callback) => {
  //${body.review_id}/${body.type}
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/${body.review_id}/${body.type}`, {}, {
    headers: {
      Authorization: config.API_KEY,
    }
  })
   .then((results) => {
     callback(null, results.data)
   })
   .catch((err) => {
     console.log('put err', err)
     callback(err, null)
   })

}

module.exports = {
  getReviews: getReviews,
  postReviews: postReviews,
  putReviews: putReviews
};