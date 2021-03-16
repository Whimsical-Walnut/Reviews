import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AnswerModal from '../../client/src/components/questionsAndAnswers/AnswerModal';

const component = mount(<AnswerModal />);

describe('<AnswerModal />', () => {
  it('sends a new answer', () => {
    component.find('button.submitA').simulate('click');
    expect(component.state().send).toBe(true);
  });
});
