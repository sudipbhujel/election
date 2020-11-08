import styled, { css, createGlobalStyle } from "styled-components/macro";

const GlobalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
  } 

  body {
    position: relative;
    min-height: 100vh;
    padding-bottom: 10rem;
  }

  h1,
  h2 {
    color: #4d80e4;
  }

  h1 {
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }

  h2 {
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }

  h3 {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h4 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h5 {
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h6 {
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  // TOAST override;
  .Toastify__toast-container {
    margin-top: 4.5rem;
  }

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) and (max-width: 767.98px) { 
    .Toastify__toast-container {
      width: 60%;
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) and (max-width: 991.98px) { 
    .Toastify__toast-container {
      width: 50%;
    }
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) and (max-width: 1199.98px) {   .Toastify__toast-container {
    width: 45%;
  } }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {   .Toastify__toast-container {
    width: 40%;
  } }

  .Toastify__toast--success {
    background-color: #4bb543;
  }

  .Toastify__toast--error {
    background-color: #ec0101;
  }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const RowCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ColumnCSS = css`
  flex: 1;
`;

const primaryBtn = css`
  background-color: #4d80e4;

  &:hover {
    background-color: #3770e2;
    transition: all 0.3s ease-out;
  }
`;

const dangerBtn = css`
  background-color: #ec0101;

  &:hover {
    background-color: #cd0a0a;
    transition: all 0.3s ease-out;
  }
`;

export const Button = styled.button`
  background-color: #ffffff;
  border: none;
  outline: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  color: #ffffff;

  ${(props) => {
    if (props.primary) {
      return `${primaryBtn}`;
    } else if (props.danger) {
      return `${dangerBtn}`;
    } else {
      return `${primaryBtn}`;
    }
  }}
`;

export const InfoLinkGroup = styled.div`
  display: flex;
`;

export const InfoLink = styled.a`
  display: flex;
  align-items: center;
  margin: 15px 0;
  color: #4d80e4;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  &:hover {
    color: #5952bc;
  }

  &:hover svg path {
    fill: #5952bc;
  }
`;

export default GlobalStyles;
