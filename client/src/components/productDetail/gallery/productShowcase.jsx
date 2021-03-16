import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PrimaryImageView from './primaryImageView';

const FlexDiv = styled.div`
  border: 1px solid lightgrey;
  margin: 64px 12px 12px -32px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  overflow-x: hidden;
  width: 77px;
  height: 480px;
  display: flex;
  flex-wrap: wrap;
  float: left;
  position: absolute;
  z-index: 10;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(14px);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
  }
`;
const Img = styled.img`
  margin: 6px;
  height: 64px;
  width: 64px;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  transition-duration: 0.2s;
  &:hover {
    margin: 4px;
    height: 68px;
    width: 69px;
  }
`;
const Button = styled.div`
  border-radius: 50%;
  padding: 12px 14px 12px 14px;
  cursor: pointer;
  float: right;
  position: relative;
  z-index: 20;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(8px) contrast(80%);
  &:hover {
    background: rgba(255,255,255,0.4);
  }
`;

class ProductShowcase extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = props;
    this.state = {
      photos,
      currentPhoto: photos[0],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.isPosition = this.isPosition.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
  }

  componentDidMount() {
    const { photos } = this.state;
    const promises = photos.map((photo) => (
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = photo.url;
        img.onload = resolve();
        img.onerror = reject();
      })
    ));
    Promise.all(promises);
  }

  handleClick(value) {
    const { photos } = this.state;
    this.setState({
      currentPhoto: photos.find((item) => item.url === value),
    });
  }

  handleExpand() {
    const { selectPhoto } = this.props;
    const { currentPhoto } = this.state;
    selectPhoto(currentPhoto.url);
  }

  nextPhoto(flag) {
    const { photos, currentPhoto } = this.state;
    this.setState({
      currentPhoto: photos[(
        photos.indexOf(currentPhoto) + flag + photos.length
      ) % photos.length
      ],
    });
  }

  isPosition(pos) {
    const { currentPhoto, photos } = this.state;
    if (pos === 'right') {
      return currentPhoto.url !== photos[photos.length - 1].url;
    }
    if (pos === 'left') {
      return currentPhoto.url !== photos[0].url;
    }
    return false;
  }

  render() {
    const { currentPhoto, photos } = this.state;
    return (
      <div>
        {
          this.isPosition('right')
          && (
            <Button
              style={{ margin: '276px 20px -64px -76px' }}
              onClick={() => this.nextPhoto(1)}
              className="fa fa-arrow-right"
              aria-label="right"
            />
          )
        }
        {
          this.isPosition('left')
          && (
            <Button
              style={{ margin: '276px 496px -64px -552px' }}
              onClick={() => this.nextPhoto(-1)}
              className="fa fa-arrow-left"
              aria-label="left"
            />
          )
        }
        <PrimaryImageView
          handleExpand={this.handleExpand}
          photo={currentPhoto.url}
        />
        <FlexDiv>
          {
            photos.map((photo) => (
              <Img
                key={photo.url}
                onClick={() => this.handleClick(photo.url)}
                src={photo.thumbnail_url}
                alt={photo.url}
              />
            ))
          }
        </FlexDiv>
      </div>
    );
  }
}

ProductShowcase.defaultProps = {
  photos: [],
};

ProductShowcase.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({})),
  selectPhoto: PropTypes.func.isRequired,
};

export default ProductShowcase;
