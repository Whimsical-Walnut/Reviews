import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionModal from '../../client/src/components/questionsAndAnswers/QuestionModal';

const component = mount(<QuestionModal />);

describe('<QuestionModal />', () => {
  it('sends a new question', () => {
    component.find('button.submitQ').simulate('click');
    expect(component.state().send).toBe(true);
  });
});
