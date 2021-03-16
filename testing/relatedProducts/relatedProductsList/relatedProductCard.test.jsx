/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RelatedProductCard from '../../../client/src/components/relatedProducts/relatedProductsList/relatedProductCard.jsx';
import dummyData from '../../../client/src/components/relatedProducts/dummyData.js';

describe('<RelatedProductCard />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<RelatedProductCard productID={14035} />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});