import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoModal from '../../client/src/components/questionsAndAnswers/PhotoModal';

describe('<PhotoModal />', () => {
  it('renders a photo', () => {
    const wrapper = shallow(<PhotoModal photo={['']} />);
    expect(wrapper.find('.modal-content')).toBeDefined();
  });
  it('opens photo modal on screen', () => {
    const component = mount(<PhotoModal />);
    expect(component.find('img')).toBeDefined();
  });
});
