import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Modal = styled.div`
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Overlay effect: translucent background: black w/ partial opacity */
    z-index: 150; /* Overlay effect: positioned over other containers */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    position: fixed; /* Fix position on the top-left corner*/
    top: 0;
    left: 0;
    overflow: auto; //Enable scroll if needed
    padding-top: 275px; /* Location of the content container */
`;

const Modal_Con = styled.div`
display: flex;
flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 35%; /* Width in proportion to its parent container*/
    max-width: 320px; /* Max width where it stops expanding */
    height: auto; /* Height in proportion to its parent container */
    margin: auto; /* Auto margin according to the element width */
    padding: 10px;
    border: 1px solid black;
    border-radius: 20px; /* Optional. Rounds container corners */

    /* modal transition here */
    opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.5s;
    }
    @keyframes fadeInOpacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
`;

const Close = styled.span`
   color: #aaaaaa;
   float: right; /* Positioned to the right of the parent container whichever size it is */
   font-size: 25px;
   font-weight: bold;
`;

const NewForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewQueA = styled.input`
  padding: 5px;
  width: 170px;
`;

const NewQueB = styled.input`
  padding: 5px;
  width: 170px;
`;

const NewQueC = styled.textarea`
  padding: 5px;
  height: 100px;
  width: 200px;
`;

const Button = styled.button`
  height: 60px;
  width: 175px;
  background-color: white;
  padding: 10px;
  margin-top: 10px;

  &:hover {
    background-color: lightgrey;
    border: 1px solid black;
  border-radius: 5px;
  transition: all ease 0.3s;
  }

`;

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newEmail: '',
      newQuestion: '',
      send: false,
    };
    this.selectModal = this.selectModal.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.type = this.type.bind(this);
  }

  selectModal(event) {
    const { closeModal } = this.props;
    event.stopPropagation();
    closeModal();
  }

  type(event) {
    if (event.target.placeholder === 'Example: jack@email.com') {
      this.setState({
        newEmail: event.target.value,
      });
    } else if (event.target.placeholder === 'Examples: jackson11!') {
      this.setState({
        newName: event.target.value,
      });
    } else {
      this.setState({
        newQuestion: event.target.value,
      });
    }
  }

  postQuestion() {
    const { product_id } = this.props;
    const {
      newQuestion, newName, newEmail,
    } = this.state;
    this.setState({
      send: true,
    });
    axios.post('/qa/questions', {
      body: newQuestion,
      name: newName,
      email: newEmail,
      product_id: product_id,
    })
      .then((response) => {
        console.log('successful post!', response.data);
        this.props.closeModal();
      });
  }

  render() {
    const { newEmail, newName, newQuestion } = this.state;
    const { displayModal } = this.props;
    const divStyle = {
      display: displayModal ? 'block' : 'none',
    };
    return (
      <Modal className="modal" onClick={(event) => { this.selectModal(event); }} style={divStyle}>
        <Modal_Con onClick={(event) => { event.stopPropagation(); }}>
          <Close className="close" onClick={(event) => { this.selectModal(event); }}>&times;</Close>
          <NewForm className="QuestionForm">
            <NewQueA placeholder="Example: jack@email.com" required type="email" maxLength="60" autoComplete="off" value={newEmail} onChange={(event) => { this.type(event); }} />
            <p>For authentication reasons, you will not be emailed</p>
            <NewQueB placeholder="Examples: jackson11!" required type="text" maxLength="60" autoComplete="off" value={newName} onChange={(event) => { this.type(event); }} />
            <p>For privacy reasons, do not use your full name or email address</p>
            <NewQueC placeholder="Enter Question Here..." required type="text" maxLength="1000" minLength="" autoComplete="off" value={newQuestion} onChange={(event) => { this.type(event); }} />
            <Button className="submitQ" onClick={(event) => { this.postQuestion(event); }}> Submit Question </Button>
          </NewForm>
        </Modal_Con>
      </Modal>
    );
  }
}

export default QuestionModal;
