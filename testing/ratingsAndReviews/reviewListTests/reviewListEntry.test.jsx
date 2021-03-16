import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import ReviewListEntry from '../../../client/src/components/ratingsAndReviews/reviewList/reviewListEntry.jsx';
import reviewsDummy from '../../../client/src/components/ratingsAndReviews/reviewsDummy.jsx';

describe('<ReviewListEntry />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<ReviewListEntry review={reviewsDummy.results[0]} />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});