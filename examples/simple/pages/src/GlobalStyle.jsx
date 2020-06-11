import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 :root {
   --font-base: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
 }

 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    scroll-behavior: smooth;
    overflow-y: ${props => (props.loading ? 'hidden' : 'auto')}
  }

  body {
    line-height: 1.5;
    font-size: 14px;
    font-family: var(--font-base);
    color: #666;
  }

  a {
    color: #959595;
    text-decoration: underline;

    &:hover {
    color: #000;
    }
  }

  /* Disable arrows in number input type
  Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
   -webkit-appearance: none;
  margin: 0;
}

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
}
`;

export default GlobalStyle;