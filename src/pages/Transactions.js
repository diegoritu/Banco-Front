import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import { Table, TableDataL, TableHeader, TableHeaderRow } from '../components/Table'
import { transactionService } from '../services/transactionService'
import styled from 'styled-components'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom';
import AccountDetail from '../components/AccountDetail'

const EmptyTableMessage = styled.p`
  text-align: center;
`
const TableRow = styled.tr`
  background-color: #FFF;  
  border-bottom: 1px solid black;
  :active, :hover
  {
    background: #e9e9e9;
  }
`
const RedText = styled.p`
  color: red;
`
const TableAlt = styled(Table)`
  width:60%;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  border-collapse: collapse;
  background-color: #e1e1e182;
`
const getTransactions = (accountType) => {
  return transactionService.getTransactions(accountType)
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

const Transactions = (props) => {
  const history = useHistory()

  function goToTransactionDetail(value){
    history.push({
      pathname: '/transactionDetails',
      state: { transactionId: value }
    })}
  
  var accountType = 'SAVINGS'
  if(props.history.location.state.account === sessionStorage.getItem('userChecking')){
    accountType = 'CHECKING'
  }
  const [data, setTransactions] = React.useState([])

  React.useEffect(() => {
    getTransactions(accountType).then(data => setTransactions(data))

  }, [])
  const renderTableData = () => {
    return data.map((item, index) => {
      var isEntryBalanceBeforeMovement = false
      var account = null
      if(item.chEntryAccount !== null || item.saEntryAccount !== null){
        account = (item.chEntryAccount !== null ? item.chEntryAccount : item.saEntryAccount)
        if(item.chEntryAccount && account.accountNumber === props.history.location.state.account){
          isEntryBalanceBeforeMovement = true
        }
        else if(item.saEntryAccount &&  account.accountNumber === props.history.location.state.account){
          isEntryBalanceBeforeMovement = true

        }
      }

      if(account === null){
        account = (item.chExitAccount !== null ? item.chExitAccount : item.saExitAccount)
      }
      var concept = 'CONCEPTO'
      switch(item.movementType){
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
          concept = 'PAGO DE SERVICIOS'
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
        default:
          concept = 'CONCEPTO'
          break
      }

      return (
        <TableRow key={index}>
          <TableDataL>{formatDate(item.dayAndHour)}</TableDataL>
          <TableDataL>{concept}</TableDataL>
          <TableDataL>{(!isEntryBalanceBeforeMovement ? <RedText>{'$ ' + numberWithStyle(item.amount)}</RedText> : '$ ' + numberWithStyle(item.amount))}</TableDataL>
          <TableDataL>{'$ ' + (isEntryBalanceBeforeMovement ? numberWithStyle(parseFloat(item.entryBalanceBeforeMovement + item.amount)) : numberWithStyle(parseFloat(item.exitBalanceBeforeMovement - item.amount)))}</TableDataL>
          <TableDataL><Button value={item.idMovement} onClick={e => goToTransactionDetail(e.target.value)} type="button"> Ver detalle </Button></TableDataL>
        </TableRow>
      )
    })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Detalle de cuenta </Text>
        <AccountDetail accountType={accountType}/>
        <Text> Últimos movimientos </Text>
        <TableAlt>
          <tbody>
            <TableHeaderRow>
              <TableHeader> Fecha </TableHeader>
              <TableHeader> Concepto </TableHeader>
              <TableHeader> Importe </TableHeader>
              <TableHeader> Saldo </TableHeader>
              <TableHeader> Detalle </TableHeader>
            </TableHeaderRow>
            {renderTableData().length === 0 ? <tr><td colSpan='5'><EmptyTableMessage>Esta cuenta no registra movimientos</EmptyTableMessage></td></tr> : renderTableData()}
          </tbody>
        </TableAlt>

      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transactions
