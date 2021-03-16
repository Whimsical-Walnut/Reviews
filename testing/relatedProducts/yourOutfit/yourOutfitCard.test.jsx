/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import YourOutfitCard from '../../../client/src/components/relatedProducts/yourOutfitList/yourOutfitCard.jsx';
import dummyData from '../../../client/src/components/relatedProducts/dummyData.js';


describe('<YourOutfitCard />', () => {
  it('renders a div component', async () => {
    const wrapper = shallow(<YourOutfitCard outfit={dummyData.outfits} />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});