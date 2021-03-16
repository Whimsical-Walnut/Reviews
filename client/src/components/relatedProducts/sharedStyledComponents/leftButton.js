import styled from 'styled-components';

const LeftButton = styled.button`
  position: absolute;
  left: 2%;
  top: 25%;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  font-size: 40px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default LeftButton;
