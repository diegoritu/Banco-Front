import React from 'react'
import Content from '../components/Content'
import Dropdown from '../components/Dropdown'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import { useForm } from 'react-hook-form'
import { serviceService } from '../services/serviceService'
import { useAlert } from 'react-alert'

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
  amount: 100,
  due: '2020-09-09'
}

const ServicePay = () => {
  const alert = useAlert()
  const { register, handleSubmit, errors } = useForm()
  const {
    register: registerA,
    errors: errorsA,
    handleSubmit: handleSubmitA
  } = useForm();


  const onSubmit = (data) => {
    const searchService = serviceService.searchService(data)
    searchService
    .then((data) =>{
      console.log(data)
      alert.success('¡Lo econtramos!' )
    })
  }

  const onSubmitA = (data) => {
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
                <TableDataL><p> Identificador del proveedor: </p></TableDataL>
                <TableDataL>
                  <Input name='vendorId' type='text' ref={register({ required: true })} />
                  {errors.vendorId && <ErrorMsg> Debe ingresar un id de proveedor </ErrorMsg>}
                </TableDataL>      
              </tr>
              <tr>
                <TableDataL><p> Identificador del servicio: </p></TableDataL>
                <TableDataL>
                  <Input name='servicePaymentId' type='text' ref={register({ required: true })} />
                  {errors.servicePaymentId && <ErrorMsg> Debe ingresar un id de servicio </ErrorMsg>}
                </TableDataL>
                 <TableDataL>
                  <TButton type='submit'>
                    Buscar
                  </TButton>
                </TableDataL>
              </tr>
              </tbody>
          </Table>
        </form>
        <form onSubmit={handleSubmitA(onSubmitA)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL> Nombre del Proveedor: </TableDataL>
                <TableDataR> {data.vendorName} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Nombre del Servicio: </TableDataL>
                <TableDataR> {data.serviceName} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Monto adeudado: </TableDataL>
                <TableDataR> {data.amount} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Fecha de vencimiento: </TableDataL>
                <TableDataR> {data.due} </TableDataR>
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
