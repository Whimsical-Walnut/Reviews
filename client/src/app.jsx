import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RatingsApp from './components/ratingsAndReviews/ratingsApp';
import ProductMainView from './components/productDetail/productMainView';
import RelatedProductsMainView from './components/relatedProducts/relatedProductsMainView';
import QuestionMaster from './components/questionsAndAnswers/QuestionMaster';

const Title = styled.div`
  width: 100%;
  height: 72px;
  margin-left: -8px;
  margin-top: -96px;
  z-index: 250;
  position: fixed;
  background: linear-gradient(120deg, hsla(175,75%,45%,0.5), hsla(235,75%,45%,0.5));
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 24px;
  font-weight: bold;
  backdrop-filter: blur(16px);
  cursor: pointer;
  &:hover {
    background: linear-gradient(120deg, hsla(175,55%,55%,0.7), hsla(235,55%,55%,0.7));
  }
`;
const Button = styled.button`
  margin: -79px 12px;
  z-index: 270;
  position: fixed;
  background: linear-gradient(-60deg, hsla(175,55%,75%,0.7), hsla(235,55%,75%,0.7));
  padding: 10px 16px;
  border: 0px solid grey;
  color: white;
  text-shadow: 1px 1px 1px black;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  &:hover {
    background: linear-gradient(120deg, hsla(175,55%,75%,0.7), hsla(235,55%,75%,0.7));
  }
`;

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '',
      productIDs: [],
      loadedID: 0,
      metaData: {},
      productIndex: 0,
      reviewCacheState: 0,
    };
    this.nextProduct = this.nextProduct.bind(this);
    this.fetchProductID = this.fetchProductID.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.fetchMeta = this.fetchMeta.bind(this);
  }

  componentDidMount() {
    this.fetchProductID();
  }

  fetchProductID() {
    const { productIndex, loadedID } = this.state;
    axios.get('/products/?count=13&page=2')
      .then(({ data }) => {
        this.setState({
          productID: data[productIndex].id,
          productIDs: data.map((item) => item.id),
          loadedID: loadedID + 1,
        });
      })
      .then(() => {
        this.fetchMeta();
      })
      .catch((error) => {
        console.log('Error setting productID in App', error);
      });
  }

  fetchMeta() {
    const { productID, loadedID } = this.state;
    axios.get(`/reviews/?product_id=${productID}&meta=meta`)
      .then((results) => {
        this.setState({
          metaData: results.data,
          loadedID: loadedID + 1,
        });
      })
      .catch((err) => {
        console.log('error on meta GET request', err);
      });
  }

  nextProduct(e) {
    const { productIndex, productIDs, reviewCacheState } = this.state;
    e.preventDefault();
    this.setState({
      productIndex: (productIndex + 1) % 7,
      productID: productIDs[(productIndex + 1) % 7],
      loadedID: 1,
      reviewCacheState: reviewCacheState + 1,
    }, this.fetchMeta);
  }

  updateProduct(productID) {
    this.setState({
      loadedID: 0,
    });
    axios.get(`/reviews/?product_id=${productID}&meta=meta`)
      .then((results) => {
        this.setState({
          metaData: results.data,
          productID,
          loadedID: 2,
        });
      })
      .catch((err) => {
        console.log('error on meta GET request', err);
      });
  }

  render() {
    const {
      productID, metaData, loadedID, reviewCacheState,
    } = this.state;
    return (
      <div>
        <Title onClick={scrollToTop}>
          <h1 style={{ marginTop: '0px' }}>Observant Ostritches</h1>
        </Title>
        <Button type="submit" id="next" onClick={this.nextProduct} aria-label="next">Next Product</Button>
        {
          loadedID === 2
          && (
          <div>
            <ProductMainView productID={productID} ratings={metaData.ratings} />
            <RelatedProductsMainView
              updateProduct={this.updateProduct}
              productID={productID}
              ratings={metaData.ratings}
            />
            <QuestionMaster productID={productID} />
            <RatingsApp
              productID={productID}
              metaData={metaData}
              reviewCacheState={reviewCacheState}
            />
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
