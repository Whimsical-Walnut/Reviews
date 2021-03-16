import styled from 'styled-components';

const CompareWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 30px;
  overflow: auto;
  justify-items: center;
  position: relative;
  z-index: 150;
`;

export default CompareWrapper;
