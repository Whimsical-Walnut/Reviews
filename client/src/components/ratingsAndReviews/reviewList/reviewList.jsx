import React from 'react';
import ReviewListEntry from './reviewListEntry';

const gridLayout = {
  display: 'grid',
  padding: '10px',
  alignItems: 'center',
};

const reviewList = ({
  reviewList, reviewEnd, handlePut, starSort, reviewCacheState, reviewCache,
}) => (
  <div>
    {
      starSort.length === 0
      && (
      <ul style={gridLayout}>
        {reviewList.slice(0, reviewEnd)
          .map((review, key) => (
            <ReviewListEntry
              review={review}
              key={key}
              handlePut={handlePut}
            />
          ))}
      </ul>
      )
    }
    {
      starSort.length > 0
    && (
    <ul style={gridLayout}>
      {reviewCache[reviewCacheState].results
        .map((review, key) => starSort.map((star) => {
          if (Number(star) === review.rating) {
            return <ReviewListEntry review={review} key={key} handlePut={handlePut} />;
          }
        }))}
    </ul>
    )
    }
  </div>
);

export default reviewList;
