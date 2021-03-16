import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import RatingsApp from '../../client/src/components/ratingsAndReviews/ratingsApp.jsx';

describe('<RatingsApp />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<RatingsApp />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});