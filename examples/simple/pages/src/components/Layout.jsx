import React from 'react';
import styled from 'styled-components';
import GlobalStyle from "../GlobalStyle";

function Layout(props) {
    return (
        <Wrapper>
            <GlobalStyle />
            {props.children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 25px;
  background: #F0F0F0;
`;

export default Layout;