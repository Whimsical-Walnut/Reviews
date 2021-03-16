/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ListContainer from '../sharedStyledComponents/listContainer';
import CardContainer from '../sharedStyledComponents/cardContainer';
import RightButtonWrapper from '../sharedStyledComponents/rightButtonWrapper';
import LeftButtonWrapper from '../sharedStyledComponents/leftButtonWrapper';
import LeftButton from '../sharedStyledComponents/leftButton';
import RightButton from '../sharedStyledComponents/rightButton';
import YourOutfitCard from './yourOutfitCard';
import averageRating from '../../shared/averageRating';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProductStyles: '',
      parentProductInfo: '',
      parentProductAvgRating: '',
      outfits: [],
      outfitsLoaded: false,
      imagesToTheRight: false,
      imagesToTheLeft: false,
    };
    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.isOverflowing = this.isOverflowing.bind(this);
  }

  componentDidMount() {
    const { parentProductID, parentProductRating } = this.props;
    const rating = Number(averageRating(parentProductRating));
    if (parentProductID !== undefined) {
      axios.get(`/products/?product_id=${parentProductID}`)
        .then(({ data }) => {
          this.setState({
            parentProductInfo: data,
            parentProductAvgRating: rating,
          });
        })
        .catch((error) => {
          console.log('Error getting product details in yourOutfit list', error);
        });

      axios.get(`/products/?product_id=${parentProductID}&flag=styles`)
        .then(({ data }) => {
          this.setState({
            parentProductStyles: data,
          });
        })
        .catch((error) => {
          console.log('Error getting product styles in yourOutfit List', error);
        });

      axios.get('/outfit')
        .then(({ data }) => {
          this.setState({
            outfits: data,
            outfitsLoaded: true,
          }, this.isOverflowing);
        })
        .catch((error) => {
          console.log('Error getting outfit info in yourOutfit List', error);
        });
    }
  }

  addOutfit() {
    const {
      parentProductStyles, outfits, parentProductInfo, parentProductAvgRating,
    } = this.state;
    const outfitToAddID = parentProductStyles.product_id;
    let index;
    outfits.forEach((element, i) => {
      if (element.styles.product_id === outfitToAddID) {
        index = i;
      }
    });
    if (index >= 0) {
      console.log('Outfit already added');
    } else {
      const newOutfitInfoArray = [{
        info: parentProductInfo,
        styles: parentProductStyles,
        rating: parentProductAvgRating,
      }];
      const newOutfitInfoObj = newOutfitInfoArray[0];

      this.setState({
        outfits: [],
      });
      axios.post('/outfit', newOutfitInfoObj)
        .then(({ data }) => {
          this.setState({
            outfits: data,
            outfitsLoaded: true,
          }, this.isOverflowing);
        })
        .catch((error) => {
          console.log('Error posting outfit to server', error);
        });
    }
  }

  deleteOutfit(productID) {
    const outfitToDelete = {
      ID: productID,
    };
    this.setState({
      outfits: [],
    }, () => {
      axios.delete('/outfit', { data: outfitToDelete })
        .then(({ data }) => {
          if (data.length > 0) {
            this.setState({
              outfits: data,
            });
          } else {
            this.setState({
              outfits: data,
              outfitsLoaded: false,
            });
          }
        })
        .catch((error) => {
          console.log('Error deleting outfit from server', error);
        });
    });
  }

  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('yourOutfit');
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
    const carousel = document.getElementById('yourOutfit');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 316;
    if (carousel.scrollLeft >= amountLeftToScroll - 316) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    const carousel = document.getElementById('yourOutfit');
    if (carousel) {
      const bool = carousel.scrollWidth > carousel.clientWidth;
      this.setState({
        // cardOverflow: bool,
        imagesToTheRight: bool,
      });
    }
  }

  render() {
    const {
      imagesToTheRight, imagesToTheLeft, outfitsLoaded, outfits,
    } = this.state;
    const { updateProduct } = this.props;
    return (
      <>
        {imagesToTheRight ? (
          <RightButtonWrapper>
            <RightButton onClick={this.scrollRight}>
              &#8250;
            </RightButton>
          </RightButtonWrapper>
        ) : null }
        <ListContainer id="yourOutfit">
          <CardContainer onClick={this.addOutfit} id="addOutfit" aria-label="Add product to your outfit list">
            <AddOutfitContent>
              + Add To Your Outfit
            </AddOutfitContent>
            <BorderDiv />
          </CardContainer>
          {outfitsLoaded
            ? (
              <>
                {outfits.map((outfit, i) => (
                  <YourOutfitCard
                    outfit={outfit}
                    updateProduct={updateProduct}
                    deleteOutfit={this.deleteOutfit}
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  />
                ))}
              </>
            )
            : null}
        </ListContainer>
        {imagesToTheLeft ? (
          <LeftButtonWrapper>
            <LeftButton onClick={this.scrollLeft}>
              &#8249;
            </LeftButton>
          </LeftButtonWrapper>
        ) : null}
      </>
    );
  }
}

export default YourOutfitList;

const BorderDiv = styled.div`
border-bottom: 2px solid grey;
align: center;
width: 90%;
margin-top: 0px;
margin-left: 5%;
margin-right: 5%;
position: relative;
bottom: 0px;
`;

const AddOutfitContent = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 3px;
  background: rgba(255,255,255,0.1);
  box-shadow: 0px 0px 1px rgba(0,0,0,0.5);


  &:hover {
    background: linear-gradient(180deg, hsl(190,45%,95%), hsl(240,60%,100%));
  }
`;
