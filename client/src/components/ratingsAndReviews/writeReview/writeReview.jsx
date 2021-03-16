/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';
import CharacteristicsRadioList from './characteristicsRadioList';
// import HandleReviewData from './handleReviewData.jsx';

const gridLayout = {
  display: 'grid',
  padding: '10px',
  gridGap: '5px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'minwidth(6, 1fr) 200px',
  alignItems: 'center',
  overflow: 'auto',
};

const autoFlex = {
  display: 'flex',
  margin: 'auto',
};

const starStyle = {
  fontSize: '12px',
  textAlign: 'center',
  gridColumn: '1',
  gridRow: '2',
};

const recommendStyle = {
  fontSize: '12px',
  textAlign: 'center',
  gridColumn: '2',
  gridRow: '2',
};

const characteristicsStyle = {
  fontSize: '12px',
  textAlign: 'center',
  width: '80%',
  margin: 'auto',
  marginBottom: '35px',
  gridColumn: '1/-1',
  gridRow: '3',
};

const summaryStyle = {
  fontSize: '12px',
  textAlign: 'center',
  padding: '3px',
  gridColumn: '1',
  gridRow: '4',
};

const nameStyle = {
  fontSize: '12px',
  textAlign: 'center',
  padding: '3px',
  gridColumn: '2',
  gridRow: '4',
};

const innerNameStyle = {
  width: '90%',
  height: '30px',
  fontFamily: 'Open sans',
  border: '1px solid grey',
  borderRadius: '5px',
};

const reviewStyle = {
  fontSize: '12px',
  textAlign: 'center',
  padding: '3px',
  gridColumn: '1/-1',
  gridRow: '5',
};

const innerReviewStyle = {
  width: '95%',
  height: '80px',
  border: '1px solid grey',
  borderRadius: '5px',
  fontFamily: 'Open sans',
  resize: 'none',
};

const photoStyle = {
  fontSize: '12px',
  textAlign: 'center',
  padding: '3px',
  gridColumn: '2',
  gridRow: '6',
};

const emailStyle = {
  fontSize: '12px',
  textAlign: 'center',
  padding: '3px',
  gridColumn: '1',
  gridRow: '6',
};

const submitStyle = {
  border: '1px solid grey',
  boxShadow: '2px 2px 4px grey',
  backgroundColor: 'white',
  fontFamily: 'Open Sans',
  cursor: 'pointer',
  width: '300px',
  margin: 'auto',
  padding: '10px',
  gridColumn: '1/-1',
  gridRow: '7',
};

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    const { productID } = this.props;
    this.state = {
      mouseOver: [0, 0, 0, 0, 0],
      product_id: productID,
      body: '',
      summary: '',
      name: '',
      email: '',
      recommend: null,
      rating: null,
      photos: [],
      characteristics: {
      },
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.characteristicsRadioClick = this.characteristicsRadioClick.bind(this);
    this.recommendRadioClick = this.recommendRadioClick.bind(this);
    this.starRadioClick = this.starRadioClick.bind(this);
    this.HandleReviewData = this.HandleReviewData.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  minimumCharCount() {
    const { body } = this.state;
    if (body.length >= 50) {
      return 'Minimum character count reached';
    } if (body.length < 50) {
      return `Minimum required characters left: ${(50 - body.length)}`;
    }
  }

  characteristicsRadioClick(e) {
    const { characteristics } = this.state;
    this.setState({
      characteristics: {
        ...characteristics,
        [e.target.name]: Number(e.target.value),
      },
    });
  }

  recommendRadioClick(e) {
    this.setState({
      [e.target.name]: Boolean(e.target.value),
    });
  }

  starRadioClick(e) {
    this.setState({
      [e.target.name]: Number(e.target.value),
    });
  }

  HandleReviewData(e) {
    // mandatory  fields
    const { rating, characteristics } = this.state;
    const { recommend } = this.state;
    const { body } = this.state;
    const { email } = this.state;
    const { summary } = this.state;
    const { name } = this.state;
    const { metaData } = this.props;
    const { handleReviewData } = this.props;

    if (rating === null || recommend === null)
      // || (metaData.characteristics.Comfort.id
      // && !characteristics[metaData.characteristics.Comfort.id])
      // || (metaData.characteristics.Quality.id
      // && !characteristics[metaData.characteristics.Quality.id])
      // || (metaData.characteristics.Length.id
      // && !characteristics[metaData.characteristics.Length.id])
      // || (metaData.characteristics.Fit.id
      // && !characteristics[metaData.characteristics.Fit.id])
      // || (metaData.characteristics.Width.id
      // && !characteristics[metaData.characteristics.Width.id])
      // || (metaData.characteristics.Size.id !== undefined
      // && !characteristics[metaData.characteristics.Size.id]))
      {
      alert('Please fill out all required (*) fields');
      e.preventDefault();
      return false;
    }
    // body check
    if (body.length < 50 || body.length > 1000) {
      alert('Review body must be at least 50 characters');
      e.preventDefault();
      return false;
    }
    // email check
    if (!(email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || email.length > 60 || email.length === 0) {
      alert('Please make sure email is in proper format ex. \'hello@hello.com');
      e.preventDefault();
      return false;
    }
    // summary check
    if (summary.length > 60) {
      alert('Summary must be 60 characters or less');
      e.preventDefault();
      return false;
    }
    // name check
    if (name.length > 60 || name.length === 0) {
      alert('Name must be filled in and 60 characters or less');
      e.preventDefault();
      return false;
    }

    alert('Your review has been submitted!');
    handleReviewData(this.state);
  }

  render() {
    const { mouseOver } = this.state;
    const { summary } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { metaData } = this.props;
    return (
      <div>
        <form onSubmit={this.HandleReviewData} id="reviewForm" style={gridLayout}>
          <div style={{
            gridColumn: '1/-1',
            gridRow: '1',
          }}
          >
            <h1 style={{ textAlign: 'center' }}>Tell us about this product!</h1>
            <small>* Required fields</small>
          </div>
          <div style={starStyle}>

            <b>* Overall</b>

            <div style={{
              display: 'flex', justifyContent: 'center', fontSize: '20px', marginTop: '5px', marginBottom: '5px',
            }}
            >
              {
               mouseOver[0] === 1
                 ? <span className="fa fa-star" aria-hidden="true" onMouseEnter={() => { this.setState({ mouseOver: [1, 0, 0, 0, 0] }); }} onClick={() => { this.setState({ rating: 1, mouseOver: [1, 0, 0, 0, 0] }); }} />
                 : <span className="fa fa-star-o" onMouseEnter={() => { this.setState({ mouseOver: [1, 0, 0, 0, 0] }); }} />
             }
              {
             mouseOver[1] === 1
               ? <span className="fa fa-star" aria-hidden="true" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 0, 0, 0] }); }} onClick={() => { this.setState({ rating: 2, mouseOver: [1, 1, 0, 0, 0] }); }} />
               : <span className="fa fa-star-o" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 0, 0, 0] }); }} />
             }
              {
              mouseOver[2] === 1
                ? <span className="fa fa-star" aria-hidden="true" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 1, 0, 0] }); }} onClick={() => { this.setState({ rating: 3, mouseOver: [1, 1, 1, 0, 0] }); }} />
                : <span className="fa fa-star-o" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 1, 0, 0] }); }} />
             }
              {
             mouseOver[3] === 1
               ? <span className="fa fa-star" aria-hidden="true" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 1, 1, 0] }); }} onClick={() => { this.setState({ rating: 4, mouseOver: [1, 1, 1, 1, 0] }); }} />
               : <span className="fa fa-star-o" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 1, 1, 0] }); }} />
             }
              {
             mouseOver[4] === 1
               ? <span className="fa fa-star" aria-hidden="true" onKeyUp={this.handleKeyUp} onClick={() => { this.setState({ rating: 5, mouseOver: [1, 1, 1, 1, 1] }); }} />
               : <span className="fa fa-star-o" onMouseEnter={() => { this.setState({ mouseOver: [1, 1, 1, 1, 1] }); }} />
             }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={autoFlex}>
                1 - Poor
              </div>
              <div style={autoFlex}>
                2 - Fair
              </div>
              <div style={autoFlex}>
                3 - Average
              </div>
              <div style={autoFlex}>
                4 - Good
              </div>
              <div style={autoFlex}>
                5 - Great
              </div>
            </div>
          </div>

          <div style={recommendStyle}>
            <b>* Would you recommend this product?</b>
            <div>
              <input type="radio" id="yes" name="recommend" value onClick={this.recommendRadioClick} />
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="recommend" value={false} onClick={this.recommendRadioClick} />
              <label htmlFor="no">No</label>
            </div>
          </div>

          <div style={characteristicsStyle}>
            <CharacteristicsRadioList
              metaData={metaData}
              characteristicsRadioClick={this.characteristicsRadioClick}
            />
          </div>

          <div style={summaryStyle}>
            <label htmlFor="summary">Review Summary (optional): </label>
            <textarea
              id="summaryInput"
              type="text"
              value={summary}
              style={{
                width: '90%', height: '60px', border: '1px solid grey', borderRadius: '5px', fontFamily: 'Open sans', resize: 'none',
              }}
              name="summary"
              onChange={this.onInputChange}
              placeholder="Example: Best purchase ever!"
            />
          </div>

          <div style={nameStyle}>
            <label htmlFor="name"><b>* Your Name: </b></label>
            <input
              type="text"
              name="name"
              style={innerNameStyle}
              value={name}
              onChange={this.onInputChange}
              placeholder="Example: jackson11!"
            />
            <br />
            <small><i>For privacy reasons, do not use your full name or email address.</i></small>
          </div>

          <div style={reviewStyle}>
            <label htmlFor="body"><b>* Your Review: </b></label>
            <textarea
              type="text"
              style={innerReviewStyle}
              value={this.state.body}
              name="body"
              onChange={this.onInputChange}
              placeholder="What did you like/dislike about the product?"
            />
            <br />
            <small>{this.minimumCharCount()}</small>
          </div>

          <div style={photoStyle}>
            Upload photos (optional)
            <button type="button" onClick={(e) => e.preventDefault}>Add photos</button>
          </div>

          <div style={emailStyle}>
            <label htmlFor="email"><b>* Email: </b></label>
            <input
              type="text"
              style={{
                width: '90%', height: '30px', fontFamily: 'Open sans', borderRadius: '5px', border: '1px solid grey',
              }}
              name="email"
              value={email}
              onChange={this.onInputChange}
              placeholder="Example: jackson11@email.com"
            />
            <br />
            <small><i>For authentication reasons, you will not be emailed.</i></small>
          </div>

          <button
            className="submitReview"
            type="button"
            style={submitStyle}
            onClick={this.HandleReviewData}
          >
            <b>Submit Review</b>
          </button>

        </form>
      </div>
    );
  }
}

// WriteReview.propTypes = {
//   metaData: PropTypes.node.isRequired,
//   productID: PropTypes.node.isRequired,
// };

export default WriteReview;
