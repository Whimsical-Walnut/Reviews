/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductMainView from '../../client/src/components/productDetail/productMainView.jsx';

describe('<ProductMainView />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<ProductMainView productID={14931}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});


