import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  height: 38px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${props => props.width || '20px'};
  height: ${props => props.width || '20px'};
  border: 3px solid var(--color-grey-light);
  border-radius: 50%;
  border-top-color: var(--secondary-color);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;