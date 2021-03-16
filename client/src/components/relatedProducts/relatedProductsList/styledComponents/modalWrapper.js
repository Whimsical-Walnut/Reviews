import styled from 'styled-components';

const ModalWrapper = styled.div`
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Overlay effect: translucent background: black w/ partial opacity */
background: rgba(0,0,0,0.55);
z-index: 1; /* Overlay effect: positioned over other containers */
width: 100%; /* Full width */
height: 100%; /* Full height */
position: fixed; /* Fix position on the top-left corner*/
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
overflow: auto; /* Enable scroll if needed */
padding-top: 80px; /* Location of the content container */
font-size: calc(10px + 2vmin);
color: black;
z-index: 150;
backdrop-filter: blur(8px) contrast(70%);
`;

export default ModalWrapper;
