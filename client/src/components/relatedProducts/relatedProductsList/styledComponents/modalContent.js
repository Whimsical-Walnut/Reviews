import styled from 'styled-components';

const ModalContent = styled.div`
background-color: white;
width: 75%; /* Width in proportion to its parent container*/
max-width: 600px; /* Max width where it stops expanding */
height: 35%; /* Height in proportion to its parent container */
margin: auto; /* Auto margin according to the element width */
justify-content: center;
align-items: center;
padding: 10px;
border: 1px solid black;
border-radius: 20px; /* Optional. Rounds container corners */
overflow: auto;
`;

export default ModalContent;
