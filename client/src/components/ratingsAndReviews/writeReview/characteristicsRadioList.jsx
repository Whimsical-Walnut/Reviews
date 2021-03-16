import React from 'react';
import CharacteristicsRadioListEntry from './characteristicsRadioListEntry';

const CharacteristicsRadioList = ({ metaData, characteristicsRadioClick }) => (
  <div>
    {
        Object.keys(metaData.characteristics)
          .map((characteristic, index) => (
            <CharacteristicsRadioListEntry
              characteristicID={metaData.characteristics[characteristic].id}
              characteristic={characteristic}
              characteristicsRadioClick={characteristicsRadioClick}
              key={index}
            />
          ))
      }
  </div>
);

export default CharacteristicsRadioList;
