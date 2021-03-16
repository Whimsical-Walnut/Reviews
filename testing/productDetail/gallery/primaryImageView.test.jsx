/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PrimaryImageView from '../../../client/src/components/productDetail/gallery/primaryImageView.jsx';

describe('<PrimaryImageView />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<PrimaryImageView photo={'a'}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
