import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import ProductBreakdown from '../../../client/src/components/ratingsAndReviews/productBreakdown/productBreakdown.jsx';
import metaDummy from '../../../client/src/components/ratingsAndReviews/metaDummy.jsx'

describe('<ProductBreakdown />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<ProductBreakdown metaData={metaDummy}/>);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});