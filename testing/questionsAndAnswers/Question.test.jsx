import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Question from '../../client/src/components/questionsAndAnswers/Question';

describe('<Question />', () => {
  it('if Question Modal button opens modal', () => {
    const component = mount(<Question item={{ answers: [] }} />);
    component.find('button.addAButton').simulate("click");
    expect(component.state().modal).toBe(true);
  });
});
