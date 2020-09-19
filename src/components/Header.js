import React from 'react'
import styled from 'styled-components'
import Logout from './Logout'

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 5vh;
  background: #000;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 40px;
`

const HeaderTitle = styled.span`
  color: #FFF;
  padding: 10px;
  align-self:center;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderTitle>
        KRRL Bank
      </HeaderTitle>
      <Logout title={'Bienvenido/a ' + sessionStorage.getItem('userName')} />
    </HeaderWrapper>
  )
}

export default Header
