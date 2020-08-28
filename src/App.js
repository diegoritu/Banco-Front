import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalContainer from './components/GlobalContainer'
import Column from './components/Column'
import Content from './components/Content'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'

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
          <Column size={2} background='welcome' />
          <Column size={1}>
            <LoginForm />
          </Column>
        </Content>
        <Footer id='footer' />
      </GlobalContainer>
    </ThemeProvider>
  )
}

export default App
