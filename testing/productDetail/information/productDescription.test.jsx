/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductDescription from '../../../client/src/components/productDetail/information/productDescription.jsx';

describe('<ProductDescription />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ProductDescription slogan={'a'} description={'b'} features={[{feature: 'c', value: 'd'}]}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
