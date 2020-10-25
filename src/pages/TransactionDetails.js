import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import Details from '../components/Details'
import { transactionService } from '../services/transactionService'

const getTransaction = (transactionId) => {
  return transactionService.getTransaction(transactionId)
}

function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}

function formatDate(inputDate) {
  var date = new Date(inputDate)
  if (!isNaN(date.getTime())) {
      return  (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 9 ? '0' + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1))  + '/' + date.getFullYear() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  }
}

const TransactionDetails = (props) => {
  const [data, setTransaction] = React.useState([])
  React.useEffect(() => {
    getTransaction(props.history.location.state.transactionId).then(data => setTransaction(data))
  }, [])
  var isEntryBalanceBeforeMovement = false
  var account = null

  if(data.chEntryAccount !== null || data.saEntryAccount !== null){
    account = (data.chEntryAccount !== null ? data.chEntryAccount : data.saEntryAccount)
    if(data.chEntryAccount && account.accountNumber === props.history.location.state.account){
      isEntryBalanceBeforeMovement = true
    }
    else if(data.saEntryAccount &&  account.accountNumber === props.history.location.state.account){
      isEntryBalanceBeforeMovement = true

    }
  }

  if(account === null){
    account = (data.chExitAccount !== null ? data.chExitAccount : data.saExitAccount)
  }


  var concept = 'CONCEPTO'
  switch(data.movementType){
    case 0:
      concept = 'DEPÓSITO'
      break
    case 1:
      concept = 'EXTRACCIÓN'
      break
    case 2:
      concept = 'COMISIÓN'
      break
    case 3:
      concept = 'MANTENIMIENTO'
      break
    case 4:
      if(isEntryBalanceBeforeMovement){
        concept = 'COBRO DE SERVICIOS'
      }
      else{
        concept = 'PAGO DE SERVICIOS'
      }
      break
    case 5:
      concept = 'TRANSFERENCIA'
      break
    case 6:
      concept = 'TRANSFERENCIA'
      break
    case 7:
      concept = 'INTERESES'
      break
    case 8:
      if(isEntryBalanceBeforeMovement){
        concept = 'COBRO DE COMPRA'
      }
      else{
        concept = 'COMPRA CON TARJETA DE DÉBITO'
      }
      break
    case 9:
      if(isEntryBalanceBeforeMovement){
        concept = 'COBRO DE TARJETA'
      }
      else{
        concept = 'PAGO DE TARJETA DE CRÉDITO'
      }
      break
    case 10:
      if(isEntryBalanceBeforeMovement){
        concept = 'ACREDITACIÓN DE SUELDO'
      } 
      else{
        concept = 'PAGO DE SUELDO'
      }
      break
    case 11:
      if(isEntryBalanceBeforeMovement){
        concept = 'COBRO DE VENTAS CON TARJETA DE CRÉDITO'
      }
      else{
        concept = 'PAGO A COMERCIO'
      }
      break
    default:
      concept = 'CONCEPTO'
      break
  }
  var entryAccount = null
  var exitAccount = null
  if(data.chEntryAccount !== null || data.saEntryAccount !== null){
    entryAccount = (data.chEntryAccount !== null ? data.chEntryAccount : data.saEntryAccount)
  }
  if(data.chExitAccount !== null || data.saExitAccount !== null){
    exitAccount = (data.chExitAccount !== null ? data.chExitAccount : data.saExitAccount)
  }

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Detalle de movimiento </Text>
        <Details>
          <h4> Número de transacción: #{data.idMovement} </h4>
          <h4> Fecha y hora: {formatDate(data.dayAndHour)} </h4>
          <h4> Tipo de transacción: {concept}</h4>
          { (data.movementType === 4 || data.movementType === 8 || data.movementType === 10) &&
            <h4> {'Comercio: ' + data.businessName}</h4>          
          }
          { (data.movementType === 9 || data.movementType === 11) &&
            <h4> {'Entidad de crédito: ' + data.businessName}</h4>          
          }

          { entryAccount && (data.movementType !== 4 && data.movementType !== 8 && data.movementType !== 9) ? <h4> {entryAccount && !exitAccount ? 'Cuenta: ' : 'Cuenta origen: '}{entryAccount.accountNumber} </h4> : ''}
          { exitAccount && (data.movementType !== 10 && data.movementType !== 11) ? <h4> {!entryAccount && exitAccount ? 'Cuenta: ' : 'Cuenta destino: '}{exitAccount.accountNumber} </h4> : ''}
          <h4> Importe: $ {numberWithStyle(parseFloat(data.amount))}</h4>
          { data.reference ? <h4> Referencia: {data.reference} </h4> : ''}

        </Details>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default TransactionDetails
