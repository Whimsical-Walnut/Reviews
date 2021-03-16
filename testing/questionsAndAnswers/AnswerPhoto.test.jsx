import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AnswerPhoto from '../../client/src/components/questionsAndAnswers/AnswerPhoto.jsx';

describe('<AnswerPhoto />', () => {
  it('Should render a container of photos', () => {
    const wrapper = shallow(<AnswerPhoto />);
    expect(wrapper.find('.PhotoList')).toBeDefined();
  }); 
});
