/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import CardContainer from '../sharedStyledComponents/cardContainer';
import StarRating from '../../shared/starRating';

class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIDInfo: '',
      productIDStyles: '',
      productRating: '',
      featuredURL: '',
      loaded: 0,
      salePrice: '',
    };
    this.removeOutfit = this.removeOutfit.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  componentDidMount() {
    const { outfit } = this.props;
    const defaultProduct = outfit.styles.results.find((product) => product['default?'] === true);
    let url;
    if (!defaultProduct) {
      url = outfit.styles.results[0].photos[0].url;
      this.setState({
        salePrice: outfit.styles.results[0].sale_price,
      });
    } else {
      url = defaultProduct.photos[0].url;
      this.setState({
        salePrice: defaultProduct.sale_price,
      });
    }
    if (!url) {
      this.setState({
        productIDInfo: outfit.info,
        productIDStyles: outfit.styles,
        productRating: outfit.rating,
        loaded: this.state.loaded + 1,
        featuredURL: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg',
      });
    } else {
      this.setState({
        productIDInfo: outfit.info,
        productIDStyles: outfit.styles,
        productRating: outfit.rating,
        loaded: this.state.loaded + 1,
        featuredURL: url,
      });
    }
  }

  changeProduct() {
    const { outfit, updateProduct } = this.props;
    const productID = outfit.styles.product_id;
    updateProduct(productID);
  }

  removeOutfit() {
    const { deleteOutfit } = this.props;
    const { productIDStyles } = this.state;
    deleteOutfit(productIDStyles.product_id);
  }

  render() {
    const {
      salePrice, loaded, featuredURL, productIDInfo, productRating,
    } = this.state;
    const sale = {
      textDecoration: salePrice ? 'line-through' : 'none',
      color: salePrice ? 'red' : 'black',
      fontSize: '15px',
    };
    return (
      <>
        {
          loaded < 1 && (
          <img src="https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif" width="300" alt="loadingGif" />
          )
        }
        {
          loaded === 1 && (
            <CardContainer>
              <ButtonWrapper>
                <DeleteButton
                  onClick={this.removeOutfit}
                  className="fa fa-times"
                  aria-label="Delete product from outfit"
                />
              </ButtonWrapper>

              <ImageWrapper onClick={this.changeProduct}>
                <Image src={featuredURL} width="100%" height="auto" alt={productIDInfo.name} />
              </ImageWrapper>

              <ProductContentWrapper style={{ fontSize: '12px' }}>{productIDInfo.category}</ProductContentWrapper>
              <ProductContentWrapper style={{ fontSize: '17px', fontWeight: 'bold' }} onClick={this.changeProduct}>{productIDInfo.name}</ProductContentWrapper>
              <ProductContentWrapper
                style={sale}
              >
                $
                {productIDInfo.default_price}
              </ProductContentWrapper>
              {salePrice ? <ProductContentWrapper style={{ fontSize: '15px' }}>{salePrice}</ProductContentWrapper> : null}
              <ProductContentWrapper>
                <StarRating averageRating={productRating} height={18} width={15} />
              </ProductContentWrapper>
              {salePrice ? <LowerBorderDiv /> : <BorderDiv />}
            </CardContainer>
          )
        }
      </>
    );
  }
}

const BorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 72px;
margin-left: 5%;
margin-right: 5%;
position: relative;
bottom: 0px;
`;

const LowerBorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 47px;
margin-left: 5%;
margin-right: 5%;
position: relative;
bottom: 0px;
`;

const ImageWrapper = styled.div`
height: 200px;
width: auto;
margin-bottom: 30px;
`;

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
z-index: 0;
`;

const DeleteButton = styled.button`
  right: 20%;
  top: 2%;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 25px;
  color: black;
  &:hover {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  margin-top: 5px;
  z-index: 10;
  border-radius: 40%;
  &:hover {
    background: black;
  }
`;

const ProductContentWrapper = styled.div`
  margin: 5px 15px;
`;

export default YourOutfitCard;
