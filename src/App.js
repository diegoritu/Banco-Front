import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalContainer from './components/GlobalContainer'
import Column from './components/Column'
import Content from './components/Content'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Recovery from './components/Recovery'

const theme = {
  font: 'Calibri',
  colors: {
    primary: 'blue',
    secondary: 'white'
  }
}

function App () {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContainer id='globalContainer'>
        <Content id='content' role='main'>
          <Column size={8} />
          <Column size={5}>
            <LoginForm />
            <Recovery />
          </Column>
        </Content>
        <Footer id='footer' />
      </GlobalContainer>
    </ThemeProvider>
  )
}

export default App
