import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StarRating from '../../shared/starRating';

const Div = styled.div`
  border: 1px solid grey;
  padding: 28px 32px 16px 32px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  margin: 32px 12px 24px 12px;
  max-width: 500px;
  background: linear-gradient(0deg, hsl(190,70%,99%), hsl(240,60%,100%));
`;

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewAmount: 0,
      averageRating: 0,
    };
    this.averageRating = this.averageRating.bind(this);
  }

  componentDidMount() {
    this.averageRating();
  }

  averageRating() {
    const { ratings } = this.props;
    let sum = 0;
    let amount = 0;
    Object.keys(ratings).forEach((key) => {
      sum += parseInt(ratings[key], 10) * parseInt(key, 10);
      amount += parseInt(ratings[key], 10);
    });
    this.setState({
      reviewAmount: amount,
      averageRating: sum / amount,
    });
  }

  render() {
    const { reviewAmount, averageRating } = this.state;
    const { category, name } = this.props;
    const { price, sale } = this.props;
    return (
      <Div>
        {
          reviewAmount > 0
          && (
            <>
              <h5 style={{ float: 'right', marginTop: '4px' }}>
                <a href="#addReview" style={{ fontSize: '12px', color: 'rgb(32,64,96)' }}>
                  {`Read All ${reviewAmount} Reviews`}
                </a>
              </h5>
              <StarRating
                averageRating={averageRating}
                height={21}
                width={18}
              />
            </>
          )
        }
        <h3>{category}</h3>
        <h1>{name}</h1>
        {
          !!sale
          && (
            <h4>
              <b style={{ textDecoration: 'line-through' }}>{`$${price}`}</b>
              <b style={{ color: 'red' }}>{` $${sale}`}</b>
            </h4>
          )
        }
        {
          !sale
          && (
            <h4>{`$${price}`}</h4>
          )
        }
      </Div>
    );
  }
}

ProductInfo.defaultProps = {
  sale: null,
  category: '',
  name: '',
};

ProductInfo.propTypes = {
  price: PropTypes.string.isRequired,
  category: PropTypes.string,
  name: PropTypes.string,
  sale: PropTypes.string,
  ratings: PropTypes.shape({}).isRequired,
};

export default ProductInfo;
