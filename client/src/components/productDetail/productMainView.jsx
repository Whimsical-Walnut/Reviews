import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import ProductInfo from './information/productInfo';
import ProductDescription from './information/productDescription';
import ProductShowcase from './gallery/productShowcase';
import StyleSelector from './customization/styleSelector';
import Checkout from './checkout/checkout';
import ExpandedView from './gallery/expandedView';

const Div = styled.div`
  border: 1px solid grey;
  margin: 12px;
  padding: 2px;
  min-width: 360px;
  font-family: Arial;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  background: linear-gradient(0deg, hsl(190,70%,99%), hsl(240,60%,100%));
`;
const InvisDiv = styled.div`
  padding: 0px;
  margin: 4px;
  min-width: 360px;
  font-family: Arial;
`;
const FlexDiv = styled.div`
  padding: 5px;
  margin: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: Arial;
`;

class ProductMainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      styles: [],
      selectedStyle: undefined,
      selectedPhoto: '',
      loaded: 0,
    };
    this.changeStyle = this.changeStyle.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.unselectPhoto = this.unselectPhoto.bind(this);
    this.cacheImages = this.cacheImages.bind(this);
  }

  componentDidMount() {
    const { productID } = this.props;
    const promises = [];
    promises.push(axios.get(`/products/?product_id=${productID}`)
      .then(({ data }) => {
        this.setState({
          currentProduct: data,
          // eslint-disable-next-line
          loaded: this.state.loaded + 1,
        });
      }));
    promises.push(axios.get(`/products/?product_id=${productID}&flag=styles`)
      .then(({ data }) => {
        this.setState({
          styles: data.results,
          // eslint-disable-next-line
          loaded: this.state.loaded + 1,
          selectedStyle: data.results.find((element) => element['default?'] === true) || data.results[0],
        });
      }));
    Promise.all(promises)
      .then(() => this.cacheImages());
  }

  cacheImages() {
    const { styles } = this.state;
    const promises = styles.map((style) => (
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = style.photos[0].url;
        img.onload = resolve();
        img.onerror = reject();
      })
    ));
    Promise.all(promises);
  }

  changeStyle(id) {
    const { styles } = this.state;
    this.setState({
      selectedStyle: styles.find((element) => element.style_id === id),
    });
  }

  selectPhoto(photo) {
    this.setState({
      selectedPhoto: photo,
    });
  }

  unselectPhoto() {
    this.setState({
      selectedPhoto: '',
    });
  }

  render() {
    const { ratings } = this.props;
    const { selectedPhoto, selectedStyle } = this.state;
    const { currentProduct, styles } = this.state;
    return (
      <div style={{ marginTop: '96px' }}>
        {
          selectedPhoto
          && (
          <ExpandedView
            key={selectedStyle.style_id}
            photo={selectedPhoto}
            unselectPhoto={this.unselectPhoto}
          />
          )
        }
        {
          selectedStyle
          && (
          <InvisDiv>
            <FlexDiv>
              <ProductShowcase
                key={selectedStyle.style_id}
                photos={selectedStyle.photos}
                selectPhoto={this.selectPhoto}
              />
              <InvisDiv>
                <ProductInfo
                  name={currentProduct.name}
                  category={currentProduct.category}
                  price={selectedStyle.original_price}
                  sale={selectedStyle.sale_price}
                  ratings={ratings}
                />
                <Div>
                  <StyleSelector
                    styles={styles}
                    changeStyle={this.changeStyle}
                    selectedStyle={selectedStyle}
                  />
                  <Checkout
                    key={selectedStyle.style_id}
                    skus={selectedStyle.skus}
                  />
                </Div>
              </InvisDiv>
            </FlexDiv>
            <ProductDescription
              slogan={currentProduct.slogan}
              description={currentProduct.description}
              features={currentProduct.features}
              key={currentProduct.slogan}
            />
          </InvisDiv>
          )
        }
      </div>
    );
  }
}

ProductMainView.propTypes = {
  productID: PropTypes.number.isRequired,
  ratings: PropTypes.shape({}).isRequired,
};

export default ProductMainView;
