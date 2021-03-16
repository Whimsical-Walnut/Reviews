import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import SortOptions from '../../../client/src/components/ratingsAndReviews/sortOptions/sortOptions.jsx';
import metaDummy from '../../../client/src/components/ratingsAndReviews/metaDummy.jsx'

describe('<SortOptions />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<SortOptions metaData={metaDummy}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});