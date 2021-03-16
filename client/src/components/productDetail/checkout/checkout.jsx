import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

const Button = styled.button`
  border: 1px solid grey;
  background: white;
  padding: 8px;
  margin: 5px 12px 24px 12px;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  &:hover {
    color: teal;
  }
`;
const Selector = styled.select`
  border: 1px solid grey;
  background: white;
  padding: 8px;
  margin: 12px;
  cursor: pointer;
  width: 40%;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;
const FlexDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
`;

function handleFav(e) {
  const addButton = document.getElementById('addOutfit');
  e.preventDefault();
  if (addButton) {
    addButton.click();
  }
}

function range(amount, max) {
  return [...Array(Math.min(amount, max)).keys()];
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    const { skus } = props;
    this.state = {
      skus,
      selectedSKU: ['', { quantity: -1 }],
      quantity: 0,
      cartError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUniqueSizes = this.getUniqueSizes.bind(this);
  }

  handleChange(e) {
    const { skus } = this.state;
    if (e.target.value === 'Select Size' || e.target.value === 'OUT OF STOCK') {
      this.setState({
        selectedSKU: ['', { quantity: -1 }],
      });
    } else {
      this.setState({
        cartError: false,
        selectedSKU: Object.entries(skus).find((element) => (
          element[1].size === e.target.value
        )),
      });
    }
  }

  handleQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  handleSubmit(e) {
    const { selectedSKU, quantity } = this.state;
    e.preventDefault();
    if (!selectedSKU[0]) {
      this.setState({
        cartError: true,
      });
    } else {
      axios({
        url: '/cart',
        method: 'POST',
        data: {
          sku_id: parseInt(selectedSKU[0], 10),
          count: quantity,
        },
      })
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('Cart Updated!');
        });
    }
  }

  getUniqueSizes() {
    const { skus } = this.state;
    if (skus.null) return [];
    return Array.from(new Set(Object.values(skus).map((x) => x.size)));
  }

  render() {
    const { selectedSKU, cartError } = this.state;
    return (
      <form>
        <FlexDiv>
          <Selector name="size" onChange={this.handleChange}>
            {
              this.getUniqueSizes().length > 0
                ? (
                  <>
                    <option>Select Size</option>
                    { this.getUniqueSizes().map((size) => <option key={size}>{size}</option>) }
                  </>
                ) : <option>OUT OF STOCK</option>
            }
          </Selector>
          <Selector name="quantity" onChange={this.handleQuantity} disabled={selectedSKU[1].quantity === -1}>
            {
              selectedSKU[1].quantity === -1
              && (
                <>
                  <option>-</option>
                </>
              )
            }
            {
              selectedSKU[1].quantity === 0
              && <option>OUT OF STOCK</option>
            }
            {
              selectedSKU[1].quantity > 0
              && (
                range(selectedSKU[1].quantity, 15).map((qty) => (
                  <option key={qty + 1}>{qty + 1}</option>
                ))
              )
            }
          </Selector>
        </FlexDiv>
        <FlexDiv>
          {
            this.getUniqueSizes().length > 0
            && (
            <Button onClick={this.handleSubmit} style={{ width: '69%' }} aria-label="checkout">
              Add to Cart
            </Button>
            )
          }
          <Button onClick={handleFav} style={{ width: '11%' }} aria-label="addToOutfit">
            <img src="star2.png" style={{ height: '20px', width: '21px' }} alt="" />
          </Button>
        </FlexDiv>
        {
          cartError
          && (
            <div style={{
              color: 'red',
              textAlign: 'center',
              padding: '8px',
            }}
            >
              Please enter a valid configuration
            </div>
          )
        }
      </form>
    );
  }
}

Checkout.defaultProps = {
  skus: {},
};

Checkout.propTypes = {
  skus: PropTypes.shape({}),
};

export default Checkout;
