/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Checkout from '../../../client/src/components/productDetail/checkout/checkout.jsx';

describe('<Checkout />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<Checkout skus={{'a':{}}}
    />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
