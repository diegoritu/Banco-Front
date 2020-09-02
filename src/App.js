import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalContainer from './components/GlobalContainer'
import Column from './components/Column'
import Content from './components/Content'
import LoginForm from './components/LoginForm'
import Recovery from './components/Recovery'
import Welcome from './components/Welcome'

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
        <Content id='content' role='main' url='https://www.cdbeco.com.vn/wp-content/uploads/2019/02/326780-P9JGF8-718.jpg' collapse='xs'>
          <Column size={8} collapse='xs' />
          <Column size={5}>
            <Welcome />
            <LoginForm />
            <Recovery />
          </Column>
        </Content>
      </GlobalContainer>
    </ThemeProvider>
  )
}

export default App
