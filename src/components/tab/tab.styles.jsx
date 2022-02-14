import styled from "styled-components";

export const TabContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  
`;
export const TabButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: 0.6s;
  background: ${props => (props.active ? "var(--color-grey-dark)" : "#f2f2f2")};
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
export const Title = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  font-size: 20px;
  color: ${props => (props.active ? 'var(--secondary-color)' : "#333")};
  transition: 0.2s;
`;
export const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-color: ${props => (props.active ? 'var(--secondary-color)' : "#f1f1f1")};
  transition: 0.2s;
`;