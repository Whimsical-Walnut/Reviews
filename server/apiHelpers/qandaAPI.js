// TODO GET + POST + PUT
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

const getQuestions = (q, callback) => {
  q.product_id = handleQStrings(q.product_id, '?product_id'); // /q.product_id
  q.flag = handleQStrings(q.flag); // /q.flag
  q.page = handleQStrings(q.page, '&page'); // page=q.page
  q.count = handleQStrings(q.count, '&count=50'); // count=q.count

  let query = q.product_id + q.page + q.count;

  if (q.question_id) {
    if (q.page) {
      q.page = `/?${q.page}`;
      if (q.count) {
        q.count = `&${q.count}`;
      }
    } else if (q.count) {
      q.count = `/?${q.count}`;
    }
    query = `/${q.question_id}/answers/${q.page}${q.count}`;
  }

  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions${
      query
    }&count=50 `,
    {
      headers: {
        'User-Agent': 'request',
        Authorization: config.API_KEY,
      },
    },
  )
    .then((results) => {
      callback(null, results.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const putQuestions = (q, callback) => {
  if (q.answer_id) {
    axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/answers/${q.answer_id}/${q.type}`, {},
      {
        headers: {
          Authorization: config.API_KEY,
        },
      },
    )
      .then((results) => {
        callback(null, results.data);
      })
      .catch((err) => {
        callback(err, null);
      });
  } else {
    axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${q.question_id}/${q.type}`, {},
      {
        headers: {
          Authorization: config.API_KEY,
        },
      },
    )
      .then((results) => {
        callback(null, results.data);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
};

const postQuestions = (q, callback) => {
  if (!q.product_id) {
    axios.post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${q.question_id}/answers`, q,
      {
        headers: {
          Authorization: config.API_KEY,
        },
      },
    )
      .then((results) => {
        callback(null, results.data);
      })
      .catch((err) => {
        callback(err, null);
      });
  } else {
  // add a query string to specify whether it is an answer or question being posted.

    axios.post(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions', q,
      {
        headers: {
          Authorization: config.API_KEY,
        },
      },
    )
      .then((results) => {
        callback(null, results.data);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
};

module.exports.getQuestions = getQuestions;
module.exports.putQuestions = putQuestions;
module.exports.postQuestions = postQuestions;
