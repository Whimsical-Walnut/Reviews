import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InvisDiv = styled.div`
  border-radius: 8px;
  padding: 8px 12px 0px 12px;
  margin: 12px 12px 0px 12px;
  margin: 0px;
  background: rgba(255,255,255,0.1);
`;
const Img = styled.img`
  border: 2px solid rgba(0,0,0,0);
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  height: 68px;
  width: 68px;
  object-fit: cover;
  &:hover {
    border: 0px solid black;
    height: 72px;
    width: 72px;
  }
`;
const FlexStyleDiv = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    const { selectedStyle } = props;
    this.state = {
      selectedStyle: selectedStyle.name,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, name) {
    const { changeStyle } = this.props;
    changeStyle(id);
    this.setState({
      selectedStyle: name,
    });
  }

  render() {
    const { selectedStyle } = this.state;
    const { styles } = this.props;
    return (
      <InvisDiv>
        <h3 style={{ margin: '12px' }}>{`Style > ${selectedStyle}`}</h3>
        <FlexStyleDiv>
          {
            styles.map((style) => (
              <Img
                key={style.style_id}
                src={style.photos[0].thumbnail_url}
                onClick={() => this.handleClick(style.style_id, style.name)}
                a=""
              />
            ))
          }
        </FlexStyleDiv>
      </InvisDiv>
    );
  }
}

StyleSelector.defaultProps = {
  selectedStyle: { name: '' },
  styles: [],
};

StyleSelector.propTypes = {
  selectedStyle: PropTypes.shape({ name: PropTypes.string }),
  changeStyle: PropTypes.func.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape({})),
};

export default StyleSelector;
