import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import styled from 'styled-components'

const Link = styled.a`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 20vw;
  height: 20vh;
  padding: 10px;
  
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 60%;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

const AdminHome = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Wrapper>
          <Link>
            <img src='https://www.flaticon.com/svg/static/icons/svg/554/554795.svg' alt='Employees' height='128' width='128' />
            <p> Registrar Cliente </p>
          </Link>
          <Link>
            <img src='https://www.flaticon.es/svg/static/icons/svg/1935/1935840.svg' alt='Magnifying glass' height='128' width='128' />
            <p> Buscar Cliente </p>
          </Link>
        </Wrapper>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default AdminHome
