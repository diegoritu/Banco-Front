import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import Details from '../components/Details'

const TransactionDetails = (data) => {

  console.log(data.history.location.state)
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Detalle de movimiento </Text>
        <Details>
          <h4> Cuenta: {data.account} </h4>
          <h4> Importe: {data.amount}</h4>
          <h4> Concepto: {data.concept}</h4>
          <h4> Fecha y hora: {data.date} </h4>
          <h4> Numero de transaccion: {data.transactionNumber} </h4>
        </Details>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default TransactionDetails
