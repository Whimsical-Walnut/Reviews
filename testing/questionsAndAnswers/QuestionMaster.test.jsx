import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionMaster from '../../client/src/components/questionsAndAnswers/QuestionMaster';
import Question from '../../client/src/components/questionsAndAnswers/Question';

describe('<QuestionMaster />', () => {
  it('if Question Modal button opens modal', () => {
    const component = mount(<QuestionMaster />);
    component.find('button.add-Q-button').simulate("click");
    expect(component.state().modal).toBe(true);
  });
});
