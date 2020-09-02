import React from 'react'
import styled from 'styled-components'
import GlobalContainer from '../components/GlobalContainer'
import Content from '../components/Content'

const NotFoundMsg = styled.h1`
  display:flex;
  font-weight: bold;
  flex-basis: 100%;
  justify-content: center;
  color: #1877f2;

`
const NotFound = () => {
  return (
    <GlobalContainer id='globalcontainer'>
      <Content id='content'>
        <NotFoundMsg>
          404 Page not found
        </NotFoundMsg>
      </Content>
    </GlobalContainer>
  )
}

export default NotFound
