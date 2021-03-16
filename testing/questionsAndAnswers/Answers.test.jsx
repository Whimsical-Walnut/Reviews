import React from 'react';
import {
  shallow, mount, render, configure,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Answers from '../../client/src/components/questionsAndAnswers/Answers';

describe('<Answers />', () => {
  it('if answer component has a helpful button', () => {
    //unit test
    const component = mount(<Answers item={{
      answer_id: 5,
      body: "Something pretty durable but I can't be sure",
      date: '2018-01-04T00:00:00.000Z',
      answerer_name: 'metslover',
      helpfulness: 5,
      photos: [{
        id: 1,
        url: 'urlplaceholder/answer_5_photo_number_1.jpg',
      }],
    }}
    />);
    component.find("button[name='helpful']").simulate('click');
    expect(component.state().clickedYes).toBe(true);
  });

  it('if answer component have a report button', () => {
    const component = mount(<Answers item={{
      answer_id: 5,
      body: "Something pretty durable but I can't be sure",
      date: '2018-01-04T00:00:00.000Z',
      answerer_name: 'metslover',
      helpfulness: 5,
      photos: [{
        id: 1,
        url: 'urlplaceholder/answer_5_photo_number_1.jpg',
      }],
    }}
    />);
    component.find("button[name='report']").simulate('click');
    expect(component.state().clickedReport).toBe(true);
  });
});

//integration test - axios request in questionmaster
