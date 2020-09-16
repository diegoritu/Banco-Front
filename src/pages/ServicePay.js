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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 20vw;
  text-align: center;
`
const data = {
  serviceName: 'Edesur',
  debt: 100,
  expirationDate: '2020-09-09'
}

const ServicePay = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Pago de servicios </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL><p> Identificador: </p></TableDataL>
                <TableDataL>
                  <Input name='identifier' type='text' ref={register({ required: true })} />
                  {errors.amount && <ErrorMsg> Debe ingresar un monto </ErrorMsg>}
                </TableDataL>
                <TableDataL>
                  <TButton type='button'>
                    Buscar
                  </TButton>
                </TableDataL>
              </tr>
              <tr>
                <TableDataL> Nombre del servicio: </TableDataL>
                <TableDataR> {data.serviceName} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Monto adeudado: </TableDataL>
                <TableDataR> {data.debt} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Fecha de vencimiento: </TableDataL>
                <TableDataR> {data.expirationDate} </TableDataR>
              </tr>
              <tr>
                <TableDataL><p> Cuenta a debitar: </p></TableDataL>
                <TableDataL><Dropdown /></TableDataL>
                <TableDataL><TButton type='submit'> Pagar </TButton></TableDataL>
              </tr>
            </tbody>
          </Table>
        </form>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ServicePay
