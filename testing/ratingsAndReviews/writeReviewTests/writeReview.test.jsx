import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import WriteReview from '../../../client/src/components/ratingsAndReviews/writeReview/writeReview.jsx';
import metaDummy from '../../../client/src/components/ratingsAndReviews/metaDummy.jsx';


describe('<WriteReview />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<WriteReview metaData={metaDummy}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});