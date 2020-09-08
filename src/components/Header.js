import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  background: #000;
`

const HeaderTitle = styled.span`
  flex: 1;
  color: #FFF;
  padding: 10px;
`

const HeaderMenu = styled.span`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  color: #FFF;
  padding: 10px;
  margin-left: 5px;
  
`

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderTitle>
        KRRL Bank
      </HeaderTitle>
      <HeaderMenu>
        Bienvenido/a Perez, Juan &#x25BC;
      </HeaderMenu>
    </HeaderWrapper>
  )
}

export default Header
