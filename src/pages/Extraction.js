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

const Extraction = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const [account, setAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert()

  const onSubmit = (data) => {
    setIsLoading(true)
    transactionService.makeExtraction(account, data.amount)
      .then((response) => {
        alert.success('Extraccion realizada con exito ')
        //console.log(response)
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false))
  }

  const user = props.location.state.user
  const items = []
  if (user.savings !== null) items.push({ id: user.savings.accountNumber, value: 'CA ' + user.savings.accountNumber })
  if (user.checking !== null) items.push({ id: user.checking.accountNumber, value: 'CC ' + user.checking.accountNumber })

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Extraccion </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL><p> Cuenta: </p></TableDataL>
                <TableDataR><Dropdown items={items} updateParent={value => setAccount(value)} /></TableDataR>
              </tr>
              <tr>
                <TableDataL><p> Monto a extraer: </p></TableDataL>
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

export default Extraction
