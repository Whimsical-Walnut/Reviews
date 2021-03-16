import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  margin: 32px 16px 5px 5px;
  height: 540px;
  width: 570px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
`;
const Img = styled.img`
  box-shadow: 2px 2px 5px rgba(0,0,0,0.8);
  position: absolute;
  max-height: 540px;
  max-width: 580px;
  cursor: pointer;
  animation-name: custom;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.2s;
  @keyframes custom {
    0% {
      opacity: 0.7;
      filter: blur(14px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
    }
  }
`;

function PrimaryImageView({ photo, handleExpand }) {
  return (
    <Div>
      <Img src={photo} alt={photo} onClick={handleExpand} />
    </Div>
  );
}

PrimaryImageView.defaultProps = {
  photo: '',
};

PrimaryImageView.propTypes = {
  photo: PropTypes.string,
  handleExpand: PropTypes.func.isRequired,
};

export default PrimaryImageView;
