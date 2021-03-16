const path = require('path');
const express = require('express');
const products = require('./apiHelpers/productAPI.js');
const reviews = require('./apiHelpers/reviewAPI.js');
const questions = require('./apiHelpers/qandaAPI.js');
const cart = require('./apiHelpers/cartAPI.js');
const outfit = require('./apiHelpers/outfitAPI.js');
const reviewCache = require('./apiHelpers/reviewCache.js');
const storeCache = require('./apiHelpers/reviewCache.js');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Product API handler w/ optional q strings product_id and flag
// flag = "styles" or "related"
app.get('/products', (req, res) => {
  products.getProducts(req.query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/reviews', (req, res) => {
  if (req.query.count === 1000) {
    reviews.getReviews(req.query, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    reviews.getReviews(req.query, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.post('/reviews', (req, res) => {
  console.log('post body', req.body);
  reviews.postReviews(req.body, (err, data) => {
    if (err) {
      console.log('post err', err);
      res.status(404).send(err);
    } else {
      console.log('post data', data);
      res.status(200).send(data);
    }
  });
});

app.put('/reviews', (req, res) => {
  reviews.putReviews(req.body, (err, data) => {
    if (err) {
      console.log('put err', err);
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/qa/questions', (req, res) => {
  questions.getQuestions(req.query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/qa/questions', (req, res) => {
  questions.postQuestions(req.body, (err, data) => {
    if (err) {
      console.log(req.body);
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put('/qa/questions', (req, res) => {
  questions.putQuestions(req.body, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/cart', (req, res) => {
  cart.getItemsInCart((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/cart', (req, res) => {
  cart.addToCart(req.body, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/outfit', (req, res) => {
  outfit.getAllOutfits((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/outfit', (req, res) => {
  outfit.saveAnOutfit(req.body, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.delete('/outfit', (req, res) => {
  outfit.deleteAnOutfit(req.body.ID, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
