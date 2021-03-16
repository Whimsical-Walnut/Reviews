/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductShowcase from '../../../client/src/components/productDetail/gallery/productShowcase.jsx';

describe('<ProductShowcase />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ProductShowcase photos={[{thumbnail_url: 'a', url: 'b'}]}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
