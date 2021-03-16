/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComparisonModal from '../../../client/src/components/relatedProducts/relatedProductsList/comparisonModal.jsx';
import dummyData from '../../../client/src/components/relatedProducts/dummyData.js';

describe('<ComparisonModal />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ComparisonModal combinedFeatures={[]}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});