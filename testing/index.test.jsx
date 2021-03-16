/* eslint-disable */
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/app.jsx';

// FOR COMMON / GENERAL TESTING (SHARED COMPONENTS??)

describe('<App />', () => {
  it('renders a div component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#data')).not.toBeUndefined();

    wrapper.find('#next').simulate('click', {preventDefault: ()=>{} });
  });
});
