import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  margin: 8px;
  padding: 0px 56px 0px 32px;
  max-width: 470px;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 960px;
  margin: 32px auto 36px auto;
`;

function formatFeatures(featureArray) {
  const features = [];
  if (!featureArray) {
    return [];
  }
  featureArray.forEach((element) => {
    let feat = ` - ${element.feature}`;
    const val = element.value;
    if (typeof val === 'string' && val) {
      feat = `${feat}: ${val.split('"').join('')}`;
    }
    features.push(feat);
  });
  return Array.from(new Set(features));
}

// props => slogan-string description-string features-[{feature value}]
class ProductDescription extends React.Component {
  constructor({ slogan, description, features }) {
    super();
    this.state = {
      slogan,
      description,
      features: formatFeatures(features),
    };
  }

  render() {
    const { slogan, description, features } = this.state;
    return (
      <FlexDiv>
        <Div style={{ borderRight: '1px solid grey', paddingLeft: '0px' }}>
          <h3>{slogan}</h3>
          <p>{description}</p>
        </Div>
        <Div>
          { features.map((element) => <h5 key={element}>{element}</h5>) }
        </Div>
      </FlexDiv>
    );
  }
}

ProductDescription.defaultProps = {
  slogan: '',
  description: '',
  features: [],
};

ProductDescription.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductDescription;
