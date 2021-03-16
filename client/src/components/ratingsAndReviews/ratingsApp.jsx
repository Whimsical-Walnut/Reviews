import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewList from './reviewList/reviewList';
import WriteReview from './writeReview/writeReview';
import RatingBreakdown from './ratingBreakdown/ratingBreakdown';
import ProductBreakdown from './productBreakdown/productBreakdown';
import SortOptions from './sortOptions/sortOptions';
import reviewCache from '../../../../server/apiHelpers/reviewCache';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'minmax(5, 1fr) 200px',
  gridGap: '10px',
};

const noReviewsGrid = {
  display: 'grid',
  justifyContent: 'center',
  gridGap: '20px',
  paddingTop: '30px',
  paddingBottom: '30px',
};

const mainDiv = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '100%',
  maxWidth: '80%',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  // marginTop: '30px',
  marginBottom: '30px',
};

const ratingGrid = {
  gridColumn: '1',
  gridRow: '1',
  maxheight: '200px',
};

const addReviewBtnStyle = {
  border: '1px solid grey',
  boxShadow: '2px 2px 4px grey',
  backgroundColor: 'white',
  padding: '10px',
  marginLeft: '20px',
  width: 'auto',
  maxWidth: '300px',
  minWidth: '150px',
};

const noReviewsAddBtn = {
  border: '1px solid grey',
  boxShadow: '2px 2px 4px grey',
  backgroundColor: 'white',
  padding: '10px',
  width: '300px',
  margin: 'auto',
  gridRow: '2',
};

const moreReviewsBtn = {
  border: '1px solid grey',
  width: '150px',
  boxShadow: '2px 2px 4px grey',
  backgroundColor: 'white',
  padding: '10px',
};

const modalStyle = {
  backdropFilter: 'blur(8px) contrast(70%)',
  backgroundColor: 'rgb(0,0,0)',
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: '150',
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  overflow: 'hidden',
  paddingTop: '80px',
};

const innerModalStyle = {
  backgroundColor: 'white',
  width: '50%',
  minWidth: '580px',
  maxWidth: '100%',
  maxHeight: '80%',
  height: '80%',
  margin: 'auto',
  padding: '10px',
  border: 'none',
  overflow: 'auto',
  borderRadius: '20px',
};

const productStyle = {
  maxWidth: '100%',
  margin: 'auto',
  gridColumn: '1',
  gridRow: '2',
};

const sortOptionsStyle = {
  marginLeft: '30px',
  gridColumn: '2/-1',
  gridRow: '1',
};

const reviewListStyle = {
  gridColumn: '2/-1',
  gridRow: '1/5',
  overflow: 'auto',
  maxWidth: '90%',
  maxHeight: '520px',
  marginTop: '40px',
  marginBottom: '20px',
  marginLeft: '20px',
  listStyle: 'none',
};

const reviewButtonsStyle = {
  width: '100%',
  marginTop: '10px',
  gridColumn: '2/-1',
  gridRowEnd: '4',
};

class RatingsApp extends React.Component {
  constructor(props) {
    super(props);
    const { metaData } = this.props;
    this.state = {
      reviewList: [],
      metaData,
      reviewEnd: 2,
      starSort: [],
      listSort: 0,
      reviewsReady: false,
      writeReviewModal: false,
      noReviews: false,
      hideMoreReviews: false,
    };

    this.writeReviewClick = this.writeReviewClick.bind(this);
    this.exitWriteReviewClick = this.exitWriteReviewClick.bind(this);
    this.handleReviewData = this.handleReviewData.bind(this);
    this.moreReviewsClick = this.moreReviewsClick.bind(this);
    this.handlePut = this.handlePut.bind(this);
    this.listSortChange = this.listSortChange.bind(this);
    this.sortByStar = this.sortByStar.bind(this);
    this.clearStarFilter = this.clearStarFilter.bind(this);
  }

  componentDidMount() {
    /// /GET product reviews/////
    const { productID } = this.props;

    axios.get(`/reviews/?product_id=${productID}&count=4`)
      .then((results) => {
        if (results.data.results.length === 0) {
          this.setState({
            noReviews: true,
          });
        }
        this.setState({
          reviewList: results.data.results,
          reviewsReady: true,
        });
      })
      .catch((err) => {
        console.log('error on review GET request', err);
      });

    axios.get(`/reviews/?product_id=${productID}&count=1000`)
      .then((results) => {
        reviewCache.reviewCache.push(results.data);
      })
      .catch((err) => {
        console.log('err on 1000 get', err);
      });
  }

  handleReviewData(reviewData) {
    axios.post('/reviews', reviewData)
      .then((results) => {
      })
      .catch((err) => {
        console.log('err on review POST', err);
      });
  }

  handlePut(review_id, type) {
    axios.put(`/reviews/${review_id}/${type}`)
      .then((results) => {
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  moreReviewsClick() {
    const { productID, reviewCacheState } = this.props;
    const { reviewEnd, reviewList } = this.state;

    const newEnd = reviewEnd + 2;
    if (newEnd > reviewList.length) {
      this.setState({
        hideMoreReviews: true,
      });
    }

    if (newEnd === reviewList.length - 1 || newEnd === reviewList.length) {
      // axios.get(`/reviews/?product_id=${productID}&count=${newEnd + 20}`)
      //   .then((results) => {
      //     this.setState({
      //       reviewList: results.data.results,
      //       reviewEnd: newEnd,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log('error on review GET request', err);
      //   });
      this.setState({
        reviewList: reviewCache.reviewCache[reviewCacheState].results.slice(0, (newEnd + 20)),
        reviewEnd: newEnd,
      });
    } else {
      this.setState({
        reviewEnd: newEnd,
      });
    }
  }

  sortByStar(e) {
    const { starSort } = this.state;
    // if (e.target.id === '') {
    //   this.setState({
    //     starSort: [...starSort],
    //   });
    // } else
    if (starSort.indexOf(e.target.id) === -1) {
      this.setState({
        starSort: [...starSort, e.target.id],
      });
    } else {
      starSort.splice(starSort.indexOf(e.target.id), 1);
      this.setState({
        starSort,
      });
    }
  }

  clearStarFilter() {
    this.setState({
      starSort: [],
    });
  }

  exitWriteReviewClick() {
    this.setState({
      writeReviewModal: false,
    });
  }

  writeReviewClick(e) {
    this.setState({
      writeReviewModal: true,
    });
  }

  listSortChange(e) {
    this.setState({
      listSort: e.target.value,
    });
  }

  render() {
    const {
      noReviews, metaData, writeReviewModal,
      reviewsReady, reviewList, listSort, reviewEnd, hideMoreReviews, starSort,
    } = this.state;
    const { productID, reviewCacheState } = this.props;

    // console.log(this.state.starSort);
    if (noReviews) {
      return (
        <div style={noReviewsGrid}>
          <div style={{ textAlign: 'center', fontSize: '40px', gridRow: '1' }}>Be the first to write a review!</div>
          <button
            className="addReview"
            type="button"
            onClick={this.writeReviewClick}
            style={noReviewsAddBtn}
          >
            ADD A REVIEW +
          </button>
          {
          writeReviewModal
          && (
          <div
            style={modalStyle}
            aria-hidden="true"
            role="button"
            onClick={this.exitWriteReviewClick}
          >
            <div
              style={innerModalStyle}
              aria-hidden="true"
              onClick={(e) => e.stopPropagation()}
            >
              <WriteReview
                handleReviewData={this.handleReviewData}
                productID={productID}
                metaData={metaData}
              />
              <br />
            </div>
          </div>
          )
        }
        </div>
      );
    }
    return (
      <div style={mainDiv}>

        {
          reviewsReady === true
      && (
      <div style={gridLayout}>

        <div style={ratingGrid}>
          <RatingBreakdown
            metaData={metaData}
            sortByStar={this.sortByStar}
            starSort={starSort}
            clearStarFilter={this.clearStarFilter}
          />
        </div>

        <div style={productStyle}>
          <ProductBreakdown metaData={metaData} />
        </div>

        {
          writeReviewModal
          && (
          <div
            style={modalStyle}
            aria-hidden="true"
            role="button"
            onClick={this.exitWriteReviewClick}
          >
            <div
              style={innerModalStyle}
              aria-hidden="true"
              onClick={(e) => e.stopPropagation()}
            >
              <WriteReview
                handleReviewData={this.handleReviewData}
                productID={productID}
                metaData={metaData}
              />
              <br />
            </div>
          </div>
          )
        }

        <div style={sortOptionsStyle}>
          <SortOptions
            metaData={metaData}
            listSort={listSort}
            listSortChange={this.listSortChange}
          />
        </div>

        <div style={reviewListStyle}>

          {/* <div style={{display: 'flex',}}> */}
          <ReviewList
            reviewCache={reviewCache.reviewCache}
            reviewCacheState={reviewCacheState}
            starSort={starSort}
            reviewList={reviewList}
            reviewEnd={reviewEnd}
            handlePut={this.handlePut}
          />
        </div>

        <div style={reviewButtonsStyle}>
          <div style={{ display: 'flex', margin: 'auto', justifyContent: 'space-evenly' }}>
            <button
              id="addReview"
              type="button"
              onClick={this.writeReviewClick}
              style={addReviewBtnStyle}
            >
              ADD A REVIEW +
            </button>

            {
          reviewList.length > 2 && hideMoreReviews === false
        && (
        <button
          className="moreReviews"
          type="button"
          style={moreReviewsBtn}
          onClick={this.moreReviewsClick}
        >
          MORE REVIEWS
        </button>
        )
        }
          </div>
        </div>

      </div>
      )
    }
      </div>
    );
  }
}

// RatingsApp.propTypes = {
//   metaData: PropTypes.node.isRequired,
//   productID: PropTypes.node.isRequired,
// };

export default RatingsApp;
