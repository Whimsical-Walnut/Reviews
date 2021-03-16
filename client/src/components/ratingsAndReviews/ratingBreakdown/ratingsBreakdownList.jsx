import React from 'react';
import RatingsBreakdownListEntry from './ratingsBreakdownListEntry';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minwidth(5, 1fr) 50px',
  margin: 'auto',
};

const RatingsBreakdownList = ({ metaData, sortByStar }) => (
  <div style={gridLayout}>
    {
        ([5, 4, 3, 2, 1])
          .map((rating) => (
            <RatingsBreakdownListEntry
              rating={rating}
              ratings={metaData.ratings}
              totalRating={metaData.ratings[rating] || 0}
              sortByStar={sortByStar}
              key={rating}
            />
          ))
    }
  </div>
);

export default RatingsBreakdownList;
