import React, { useState } from 'react'
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


const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const TButton = styled.button`
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

const data = [
  {
    id: 1,
    nombre: 'Carlos',
    cuitCuil: '12312542353',
    detalle: 'this is a detail'
  }
]

const fieldOptions = {
  legal: [
    new OptionItem('username', 'Nombre de usuario'), 
    new OptionItem('businessName', 'Razón social'), 
    new OptionItem('cuitCuil', 'CUIT/CUIL')
  ],
  physical: [
    new OptionItem('username', 'Nombre de usuario'), 
    new OptionItem('fullname', 'Nombre y/o apellido'), 
    new OptionItem('cuitCuil', 'CUIT/CUIL'),
    new OptionItem('dni', 'DNI')
  ]
}

function OptionItem (id, value) {
  this.id = id;
  this.value = value;
}

const SearchClient = () => {
  const { register, handleSubmit, errors } = useForm()
  const [isLegal, setIsLegal] = useState(false)
  const [searchField, setSearchField] = useState()

  const getFieldOptions = () => {
    return isLegal ? fieldOptions.legal : fieldOptions.physical
  }

  const onSubmit = (data) => {
    console.log(data)
    console.log('field:'+searchField)
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
            <Caption> Búsqueda Cliente </Caption>
            <tbody>
              <tr>
                <TableDataL> Búsqueda por:  </TableDataL>
                <TableDataR>
                    <Dropdown title='Seleccione opción de búsqueda' items={getFieldOptions()} updateParent={id => setSearchField(id)}/>
                </TableDataR>
              </tr>
              <tr>
                <TableDataL> Persona : </TableDataL>
                <TableDataL>
                {isLegal ?
                  (<React.Fragment>
                      <TButton onClick={() => setIsLegal(false)}> Física </TButton>
                      <ButtonSelected onClick={() => setIsLegal(true)}> Jurídica </ButtonSelected>
                  </React.Fragment>)
                : 
                  (<React.Fragment>
                      <ButtonSelected onClick={() => setIsLegal(false)}> Física </ButtonSelected>
                      <TButton onClick={() => setIsLegal(true)}> Jurídica </TButton>
                  </React.Fragment>)
                }        
                </TableDataL>
              </tr>
              <tr>
                <TableDataL>
                  <Input name='field' type='text' placeholder='Ingrese el término de búsqueda' ref={register({ required: true })} />
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
              <TableHeader> <span>Nombre / </span> <span>Razón Social</span> </TableHeader>
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
