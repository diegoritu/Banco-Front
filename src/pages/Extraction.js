import React from 'react'
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

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const Extraction = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
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
                <TableDataR><Dropdown /></TableDataR>
              </tr>
              <tr>
                <TableDataL><p> Monto a extraer: </p></TableDataL>
                <TableDataR>
                  <Input name='amount' type='number' min='0' step='any' ref={register({ required: true })} />
                  {errors.amount && <ErrorMsg> Debe ingresar un monto </ErrorMsg>}
                </TableDataR>
              </tr>
              <tr>
                <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
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
