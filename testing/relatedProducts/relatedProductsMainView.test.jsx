/* eslint-disable */

import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RelatedProductsMainView from '../../client/src/components/relatedProducts/relatedProductsMainView.jsx';

describe('<relatedProductsMainView />', () => {
  it('renders a div component', async () => {
    const wrapper = shallow(<RelatedProductsMainView />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });

  it('renders you may also like title', async () => {
    const wrapper = shallow(<RelatedProductsMainView />);
    const related = <h3>YOU MAY ALSO LIKE</h3>;
    expect(wrapper.contains(related)).toEqual(true);
  })

  it('renders a yourOutfit title', async () => {
    const wrapper = shallow(<RelatedProductsMainView />);
    const outfit = <h3>YOUR OUTFIT</h3>
    expect(wrapper.contains(outfit)).toEqual(true);
  });
});

