import React from 'react';
import PhotoMapEntry from './photoMapEntry';

const imgContainer = {
  display: 'flex',
};

const PhotosMap = ({ photos }) => (
  <div>
    <div style={imgContainer}>
      {photos.map((photo) => (
        <PhotoMapEntry photo={photo} key={photo.id} />
      ))}
    </div>
  </div>
);

export default PhotosMap;
