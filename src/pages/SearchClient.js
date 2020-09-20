import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import { Table, TableDataL, TableDataR, Caption, TableHeader, TableHeaderRow } from '../components/Table'
import { useForm } from 'react-hook-form'
import Dropdown from '../components/Dropdown'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import Button from '../components/Button'

const TButton = styled.button`
  width: 50%;
  padding: 10px;
  margin: auto;
`
const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`
const data = [
  {
    id: 1,
    nombre: 'Carlos',
    cuitCuil: '12312542353',
    detalle: 'this is a detail'
  }
]

const SearchClient = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  const renderTableData = () => {
    return data.map((item, index) => {
      const { nombre, cuitCuil, detalle } = item
      return (
        <tr key={index}>
          <TableDataL>{nombre}</TableDataL>
          <TableDataL>{cuitCuil}</TableDataL>
          <TableDataL>{detalle}</TableDataL>
        </tr>
      )
    })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <Caption> Busqueda Cliente </Caption>
            <tbody>
              <tr>
                <TableDataL> Busqueda por:  </TableDataL>
                <TableDataR><Dropdown /></TableDataR>
              </tr>
              <tr>
                <TableDataL> Persona : </TableDataL>
                <TableDataL>
                  <TButton> Fisica </TButton>
                  <TButton> Juridica </TButton>
                </TableDataL>
              </tr>
              <tr>
                <TableDataL>
                  <Input name='field' type='text' placeholder='Ingrese el dato a buscar' ref={register({ required: true })} />
                  {errors.field && <ErrorMsg> No puede estar vacio </ErrorMsg>}
                </TableDataL>
                <TableDataR><Button> Buscar </Button></TableDataR>
              </tr>
            </tbody>
          </Table>
        </form>
        <Table>
          <tbody>
            <TableHeaderRow>
              <TableHeader> <span>Nombre / </span> <span>Razon Social</span> </TableHeader>
              <TableHeader> <span>CUIT /</span> <span>CUIL</span></TableHeader>
              <TableHeader> Detalle </TableHeader>
              <TableHeader> Operaciones </TableHeader>
            </TableHeaderRow>
            {renderTableData()}
          </tbody>
        </Table>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default SearchClient
