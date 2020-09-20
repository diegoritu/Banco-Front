import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Dropdown from '../components/Dropdown'
import { useForm } from 'react-hook-form'
import Text from '../components/Text'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, Caption } from '../components/Table'
import { transactionService } from '../services/transactionService'

const Input = styled.input`
  padding: 10px;    
  margin: 10px 0px;
  width: 25vw;
`

const ToggleWrapper = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

const Button = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #b2b2b28c;
  
`
const ButtonSelected = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #3a74b0;
  color: white;
`

const TableDataRw = styled.td`
  padding: 10px 20%;
`

const Transfer = props => {
  
  var ownedAccInitialState = true

  if(sessionStorage.getItem('userSavings') === 'null' || sessionStorage.getItem('userChecking') === 'null'){
    ownedAccInitialState = false
  }
  
  const { register, handleSubmit, errors } = useForm()
  const [originAcc, setOriginAcc] = useState('')
  const [destinationAcc, setDestinationAcc] = useState('')
  const [originAccToNotOwned, setOriginAccToNotOwned] = useState('')
  const [ownedAcc, setOwnedAcc] = useState(ownedAccInitialState)

  const items = []
  
  if(sessionStorage.getItem('userSavings') !== 'null'){
    items.push({id: sessionStorage.getItem('userSavings'), value: 'CA ' + sessionStorage.getItem('userSavings')})
  }
  if(sessionStorage.getItem('userChecking') !== 'null'){
    items.push({id: sessionStorage.getItem('userChecking'), value: 'CC ' + sessionStorage.getItem('userChecking')})
  }



  const onSubmitOwned = (data) => {
    var accountDestination = ''
    var accountOrigin = ''

    items.forEach(element => {
      if(element.value === originAcc)
      {
        accountOrigin = element.id
      }
      if(element.value === destinationAcc)
      {
        accountDestination = element.id
      }      
    })
    transactionService.transferBetweenOwnAccounts(data, accountOrigin, accountDestination)
      .then(
        response => {
          const { from } = props.location.state || { from: { pathname: response } }          
          if (from.pathname !== 'accountNotFound' && from.pathname !== 'operationCantBePerformed') {
            props.history.push('/home')
          }
          else
          {
            if(from.pathname === 'accountNotFound'){
              //MENSAJE ERROR DE CUENTA NO ENCONTRADA
              console.log(from.pathname)
            }
            else if(from.pathname === 'operationCantBePerformed'){
              //MENSAJE ERROR DE OPERACION IMPOSIBLE DE REALIZAR
              console.log(from.pathname)
            }
          }
        }
      )
      .catch(error => {
        console.log(error)
      })
  }
  const onSubmitNotOwned = (data) => {
    var accountOrigin = ''
    items.forEach(element => {
      if(element.value === originAccToNotOwned)
      {
        accountOrigin = element.id
      }
    })

    transactionService.transferToOtherAccounts(data, accountOrigin)
      .then(
        response => {
          const { from } = props.location.state || { from: { pathname: response } }          
          if (from.pathname !== 'accountNotFound' && from.pathname !== 'operationCantBePerformed') {
            props.history.push('/home')
          }
          else
          {
            if(from.pathname === 'accountNotFound'){
              //MENSAJE ERROR DE CUENTA NO ENCONTRADA
              console.log(from.pathname)
            }
            else if(from.pathname === 'operationCantBePerformed'){
              //MENSAJE ERROR DE OPERACION IMPOSIBLE DE REALIZAR
              console.log(from.pathname)
            }
          }
        }
      )
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        {sessionStorage.getItem('userSavings') !== 'null' && sessionStorage.getItem('userChecking') !== 'null' ?
          <React.Fragment>
            <Text> Tipo de transferencia </Text>
            <ToggleWrapper>
              {ownedAcc ?
                (<React.Fragment>
                  <ButtonSelected onClick={() => setOwnedAcc(true)}> Entre cuentas propias </ButtonSelected>
                  <Button onClick={() => setOwnedAcc(false)}> Hacia otras cuentas </Button>
                </React.Fragment>)
              : 
                (<React.Fragment>
                  <Button onClick={() => setOwnedAcc(true)}> Entre cuentas propias </Button>
                  <ButtonSelected onClick={() => setOwnedAcc(false)}> Hacia otras cuentas </ButtonSelected>
                </React.Fragment>)
              }
              </ToggleWrapper>
          </React.Fragment>
        : ''
        }

        {ownedAcc &&
          <form onSubmit={handleSubmit(onSubmitOwned)}>
            <Table>
              <Caption> Transferencia de fondos </Caption>
              <tbody>
                <tr>
                  <TableDataL> Desde </TableDataL>
                  <TableDataRw><Dropdown title='Seleccione cuenta origen' items={items} updateParent={value => setOriginAcc(value)} /></TableDataRw>
                </tr>
                <tr>
                  <TableDataL> Hacia </TableDataL>
                  <TableDataRw><Dropdown title='Seleccione cuenta destino ' items={items} updateParent={value => setDestinationAcc(value)} /></TableDataRw>
                </tr>
                <tr>
                  <TableDataL> Importe </TableDataL>
                  <TableDataRw>
                    <Input name='amountToOwned' type='number' min='0' step='any' ref={register({ required: true, min: 0 })} />
                    {errors.amountToOwned && <ErrorMsg> Debe ingresar un monto </ErrorMsg>}
                  </TableDataRw>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
        {!ownedAcc &&
          <form onSubmit={handleSubmit(onSubmitNotOwned)}>
            <Table>
              <Caption> Transferencia hacia otra cuenta </Caption>
              <tbody>
                <tr>
                  <TableDataL> Cuenta Origen </TableDataL>
                  <TableDataRw><Dropdown title='Seleccione cuenta origen' items={items} updateParent={value => setOriginAccToNotOwned(value)} /></TableDataRw>
                </tr>
                <tr>
                  <TableDataL> CBU </TableDataL>
                  <TableDataRw>
                    <Input name='cbu' ref={register({ required: true })} />
                    {errors.cbu && <span> Debe ingresar un cbu </span>}
                  </TableDataRw>
                </tr>
                <tr>
                  <TableDataL> Referencia </TableDataL>
                  <TableDataRw>
                    <Input name='reference' ref={register({ required: true })} />
                    {errors.reference && <span> Debe ingresar una referencia </span>}
                  </TableDataRw>
                </tr>
                <tr>
                  <TableDataL> Importe </TableDataL>
                  <TableDataRw>
                    <Input name='amountToNotOwned' type='number' min='0' step='any' ref={register({ required: true })} />
                    {errors.amountToNotOwned && <span> Debe ingresar un monto </span>}
                  </TableDataRw>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transfer
