import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  background: rgba(0,0,0,0.55);
  margin: -96px -8px;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 500;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(8px) contrast(70%);
  animation-name: custom;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-duration: 0.25s;
`;
const Img = styled.img`
  border-radius: 4px;
  margin: auto;
  max-height: 920px;
  max-width: 1280px;
  cursor: pointer;
`;

function ExpandedView({ unselectPhoto, photo }) {
  return (
    <Div onClick={unselectPhoto}>
      <Img src={photo} alt={photo} />
    </Div>
  );
}

ExpandedView.propTypes = {
  photo: PropTypes.string.isRequired,
  unselectPhoto: PropTypes.func.isRequired,
};

export default ExpandedView;
