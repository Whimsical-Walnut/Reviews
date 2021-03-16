/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RelatedProductsList from '../../../client/src/components/relatedProducts/relatedProductsList/relatedProductsList.jsx';
import dummyData from '../../../client/src/components/relatedProducts/dummyData.js';

describe('<RelatedProductsList />', () => {
  it('#data is not defined', async () => {
    const wrapper = shallow(<RelatedProductsList relatedProducts={dummyData.related}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });

  it('renders a productCarousel div', async () => {
    const wrapper = shallow(<RelatedProductsList relatedProducts={dummyData.related}/>);
    expect(wrapper.find('#productCarousel')).toBeDefined();
  });




});