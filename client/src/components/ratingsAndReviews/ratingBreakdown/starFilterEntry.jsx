import React from 'react';

const starStyle = {
  display: 'flex', marginLeft: '2px', marginRight: '2px', width: '30px', textAlign: 'center', borderRadius: '40px', padding: '5px', fontSize: '10px', border: 'none', boxShadow: '2px 2px 4px gold', cursor: 'pointer',
};

const StarFilterEntry = (props) => (
  <div id={`${props.star}`} aria-hidden="true" style={starStyle} onClick={props.sortByStar}>
    <div style={{ textAlign: 'center' }}>
      {`${props.star} stars`}
    </div>
  </div>
);

export default StarFilterEntry;
