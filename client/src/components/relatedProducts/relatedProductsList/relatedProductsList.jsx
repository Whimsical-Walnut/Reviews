import React from 'react';
import axios from 'axios';
import RelatedProductCard from './relatedProductCard';
import ListContainer from '../sharedStyledComponents/listContainer';
import RightButtonWrapper from '../sharedStyledComponents/rightButtonWrapper';
import LeftButtonWrapper from '../sharedStyledComponents/leftButtonWrapper';
import LeftButton from '../sharedStyledComponents/leftButton';
import RightButton from '../sharedStyledComponents/rightButton';

class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIDInfo: '',
      imagesToTheLeft: false,
      imagesToTheRight: true,
      cardOverflow: false,
    };
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.isOverflowing = this.isOverflowing.bind(this);
  }

  componentDidMount() {
    const { productID } = this.props;
    axios.get(`/products/?product_id=${productID}`)
      .then(({ data }) => {
        this.setState({
          parentProductIDInfo: data,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductsList', error);
      });
  }

  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('productCarousel');
    carousel.scrollLeft -= 316;
    if (carousel.scrollLeft <= 316) {
      this.setState({
        imagesToTheLeft: false,
      });
    }
  }

  scrollRight() {
    this.setState({
      imagesToTheLeft: true,
    });
    const carousel = document.getElementById('productCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 316;
    if (carousel.scrollLeft >= amountLeftToScroll - 316) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    const carousel = document.getElementById('productCarousel');
    const bool = carousel.scrollWidth > carousel.clientWidth;
    this.setState({
      cardOverflow: bool,
      imagesToTheRight: bool,
    });
  }

  render() {
    const { parentProductIDInfo, imagesToTheRight, imagesToTheLeft } = this.state;
    const { relatedProducts, productID } = this.props;
    if (parentProductIDInfo.length === 0) {
      return (
        null
      );
    }
    return (
      <div>
        {imagesToTheRight
          ? (
            <RightButtonWrapper>
              <RightButton onClick={this.scrollRight}>
                &#8250;
              </RightButton>
            </RightButtonWrapper>
          ) : null}
        <ListContainer id="productCarousel" onLoad={this.isOverflowing}>
          {relatedProducts.map((product) => (
            <RelatedProductCard
              parentProductID={productID}
              updateProduct={this.props.updateProduct}
              productID={product}
              parentProductIDInfo={parentProductIDInfo}
              key={product}
            />
          ))}
        </ListContainer>
        {imagesToTheLeft ? (
          <LeftButtonWrapper>
            <LeftButton onClick={this.scrollLeft}>
              &#8249;
            </LeftButton>
          </LeftButtonWrapper>
        ) : null}
      </div>

    );
  }
}

export default RelatedProductList;
