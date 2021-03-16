/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpandedView from '../../../client/src/components/productDetail/gallery/expandedView.jsx';

describe('<ExpandedView />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ExpandedView />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
