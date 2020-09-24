import React, { useState } from 'react'
import Content from '../components/Content'
import Dropdown from '../components/Dropdown'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, TableDataR } from '../components/Table'
import { transactionService } from '../services/transactionService'
import { useAlert } from 'react-alert'

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}


const Deposit = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert()

  const onSubmit = (data) => {
    console.log(data)
    console.log(account)
    setIsLoading(true)
    transactionService.makeDeposit(account, data.amount)
      .then((response) => {
        if(response !== 'transactionError'){
          alert.success('Depósito realizado con exito ')
        }
        else{
          alert.error('Operación fallida.')
        }
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false))
}

  const user = props.location.state.user
  const items = []
  if (user.savings !== null) items.push({ id: user.savings.accountNumber, value: 'CA ' + user.savings.accountNumber  + ' ($' + numberWithStyle(user.savings.balance) + ')'})
  if (user.checking !== null) items.push({ id: user.checking.accountNumber, value: 'CC ' + user.checking.accountNumber  + ' ($' + numberWithStyle(user.checking.balance) + ')'})

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Deposito </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL><p> Cuenta: </p></TableDataL>
                <TableDataR><Dropdown title={'Seleccione una cuenta'} items={items} updateParent={id => setAccount(id)} /></TableDataR>
              </tr>
              <tr>
                <TableDataL><p> Monto a depositar: </p></TableDataL>
                <TableDataR>
                  <Input name='amount' type='number' min='0' step='any' ref={register({ required: true })} />
                  {errors.amount && <ErrorMsg> Debe ingresar un monto </ErrorMsg>}
                </TableDataR>
              </tr>
              <tr>
                <TableDataL><TButton type='submit' disable={isLoading}> Confirmar </TButton></TableDataL>
              </tr>
            </tbody>
          </Table>
        </form>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Deposit
