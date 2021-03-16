/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StyleSelector from '../../../client/src/components/productDetail/customization/styleSelector.jsx';

describe('<StyleSelector />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<StyleSelector styles={[{style_id: 'a', name: 'b', original_price: 'c', sale_price: 'd', 'default?': 'e', photos: [{thumbnail_url: 'f', url: 'g'}], skus: 'h'}]}
    selectedStyle={{style_id: 'a', name: 'b', original_price: 'c', sale_price: 'd', 'default?': 'e', photos: [{thumbnail_url: 'f', url: 'g'}], skus: 'h'}}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});
