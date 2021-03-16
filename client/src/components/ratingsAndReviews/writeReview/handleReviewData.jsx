// import React from 'react';

// const HandleReviewData = (e) => {
//   //mandatory  fields
//   e.preventDefault();
//   if (this.state.rating === null || this.state.recommend === null || this.props.metaData.characteristics.Comfort.id === null || this.props.metaData.characteristics.Quality.id === null || this.props.metaData.characteristics.Length.id === null || this.props.metaData.characteristics.Fit.id === null) {
//     alert(`Please fill out all required (*) fields`);
//     e.preventDefault()
//     return false
//   }
//   //body check
//   if (this.state.body.length < 50 || this.state.body.length > 1000) {
//     alert('Review body must be at least 50 characters');
//     e.preventDefault()
//     return false
//   }
//   //email check
//   if (!(this.state.email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || this.state.email.length > 60 || this.state.email.length === 0) {
//     alert(`Please make sure email is in proper format ex. 'hello@hello.com`);
//     e.preventDefault()
//     return false
//   }
//   //summary check
//   if (this.state.summary.length > 60) {
//     alert(`Summary must be 60 characters or less`)
//     e.preventDefault()
//     return false
//   }
//   //name check
//   if (this.state.name.length > 60 || this.state.name.length === 0) {
//     alert(`Name must be filled in and 60 characters or less`)
//     e.preventDefault()
//     return false
//   }

//   alert('Your review has been submitted!')
//   this.props.handleReviewData(this.state)
// };

// export default HandleReviewData;