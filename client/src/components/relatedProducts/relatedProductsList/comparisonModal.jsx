import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ModalContent from './styledComponents/modalContent';
import ModalWrapper from './styledComponents/modalWrapper';
import ComparisonTitle from './styledComponents/comparisonTitle';
import CompareWrapper from './styledComponents/compareWrapper';

const ComparisonModal = (props) => {
  const closeModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  const { parentProduct, compareProduct, combinedFeatures } = props;

  return (
    <ModalWrapper
      className="modal"
      onClick={closeModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <CloseButton className="close" onClick={closeModal}>&times; </CloseButton>
      </div>
      <ModalContent>
        <ComparisonTitle>
          <CompareTitle>COMPARING: </CompareTitle>
          <div>{null}</div>
          <div>{null}</div>
          <ProductTitle><b>{parentProduct}</b></ProductTitle>
          <div>{null}</div>
          <ProductTitle><b>{compareProduct}</b></ProductTitle>
        </ComparisonTitle>
        <CompareWrapper>
          {combinedFeatures.map((feature, i) => {
            if (feature) {
              if (feature[0] === '"') {
                const cleanFeature = feature.substring(1, feature.length - 1);
                return <TestDiv key={i}>{cleanFeature}</TestDiv>;
              }
              return <TestDiv key={i}>{feature}</TestDiv>;
            }
            return <TestDiv key={i}>{feature}</TestDiv>;
          })}
        </CompareWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

const CloseButton = styled.span`
  color: #aaaaaa;
  position: relative;
  float: right; /* Positioned to the right of the parent container whichever size it is */
  font-size: 25px;
  font-weight: bold;
`;

const TestDiv = styled.div`
  text-align: center;
  font-size: 17px;
`;
const ProductTitle = styled.div`
  text-align: center;
  font-size: 17px;
  border-bottom: 1px solid grey;
  margin-bottom: 13px;
`;

const CompareTitle = styled.div`
  margin: 30px 10px;
  font-size: 15px;
`;

export default ComparisonModal;
