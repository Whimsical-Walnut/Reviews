import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedProductsList from './relatedProductsList/relatedProductsList';
import YourOutfitList from './yourOutfitList/yourOutfitList';

class RelatedProductsMainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
    };
  }

  componentDidMount() {
    const { productID } = this.props;
    axios.get(`/products/?product_id=${productID}&flag=related`)
      .then(({ data }) => {
        const related = new Set();
        data.forEach((element) => {
          related.add(element);
        });
        const cleanData = Array.from(related);
        this.setState({
          relatedProducts: cleanData,
        });
      })
      .catch((error) => {
        console.log('Error getting related data in relatedProductsMainView', error);
      });
  }

  // add condititonal rendering in case relatedProducts hasn't been defined yet
  render() {
    const { relatedProducts } = this.state;
    const { productID, updateProduct, ratings } = this.props;
    return (
      <AllEncompassing id="AllEncompassing">
        <div>
          <h3>YOU MAY ALSO LIKE</h3>
        </div>
        <ListWrapper>
          <RelatedProductsList
            updateProduct={updateProduct}
            productID={productID}
            relatedProducts={relatedProducts}
          />
        </ListWrapper>
        <div>
          <h3>YOUR OUTFIT</h3>
        </div>
        <ListWrapper>
          <YourOutfitList
            parentProductID={productID}
            parentProductRating={ratings}
            updateProduct={updateProduct}
          />
        </ListWrapper>
      </AllEncompassing>
    );
  }
}

export default RelatedProductsMainView;

const AllEncompassing = styled.div`
  padding: 5px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  max-width: 1200px;
`;

const ListWrapper = styled.div`
  margin: 10px 0px 0px;
  position: relative;
  width: 100%;
`;
