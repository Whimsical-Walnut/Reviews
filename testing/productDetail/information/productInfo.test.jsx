/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductInfo from '../../../client/src/components/productDetail/information/productInfo.jsx';

describe('<ProductInfo />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ProductInfo category={'a'} name={'b'} price={'c'} ratings={[]}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
