import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 5vh;
  background: #000;
  justify-content: space-between;
  flex-wrap: wrap;
`

const HeaderTitle = styled.span`
  color: #FFF;
  padding: 10px;
`

const HeaderMenu = styled.span`
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
