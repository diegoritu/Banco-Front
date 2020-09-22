import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import { Table, TableDataL, TableDataR, Caption, TableHeader, TableHeaderRow } from '../components/Table'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import Button from '../components/Button'
import Select from 'react-select'
import { useAlert } from 'react-alert'
import { searchUserService } from '../services/searchUserService'
import { timeout } from 'select2-react-component'


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

const usernameOption = new OptionItem('username', 'Nombre de usuario')
const cuitCuilOption = new OptionItem('cuitCuil', 'CUIT/CUIL')

const fieldOptions = {
  legal: [
    usernameOption, 
    cuitCuilOption,
    new OptionItem('businessName', 'Razón social')
  ],
  physical: [
    usernameOption, 
    cuitCuilOption,
    new OptionItem('fullname', 'Nombre y/o apellido'), 
    new OptionItem('dni', 'DNI')
  ]
}

function OptionItem (value, label) {
  this.value = value;
  this.label = label;
}

const SearchClient = () => {
  const { register, handleSubmit, errors } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isLegal, setIsLegal] = useState(false)
  const [selectedSearchField, setSelectedSearchField] = useState()
  const [items, setItems] = useState([])
  const alert = useAlert()

  const getFieldOptions = () => {
    return isLegal ? fieldOptions.legal : fieldOptions.physical
  }

  const onChangeSearchField = (option) => {
    setSelectedSearchField(option)
  }

  const updateIsLegal = (newValue) => {
    if (isLegal != newValue) {
      setSelectedSearchField('')
    }
    setIsLegal(newValue)
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    const params = {field: selectedSearchField.value, term: data.term}
    const search = isLegal ? searchUserService.searchLegalUsers(params) : searchUserService.searchPhysicalUsers(params)
    search
      .then((data) => {
        if (!Array.isArray(data) || !data.length) {
          alert.info('No se encontraron usuarios', {timeout: 7000})
          setItems([])
        } else {
          setItems(data)
        }
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false))
  }

  const renderTableData = () => {
    if (!Array.isArray(items) || !items.length) {
      return (<tr key={0}>
        <TableDataL>-</TableDataL>
        <TableDataL>-</TableDataL>
        <TableDataL>-</TableDataL>
        <TableDataL>-</TableDataL>
      </tr>)
    }

    return items.map((item, index) => {
      const name = item.userType == 'LEGAL' ? item  .businessName : (item.firstName + ' ' + item.lastName);
      const cuitCuil = item.cuitCuilCdi
      return (
        <tr key={index}>
          <TableDataL>{name}</TableDataL>
          <TableDataL>{cuitCuil}</TableDataL>
          <TableDataL>{'(boton a detalle)'}</TableDataL>
          <TableDataL>{'(opciones depositar / extraer)'}</TableDataL>
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
                <TableDataL> Persona : </TableDataL>
                <TableDataL>
                {isLegal ?
                  (<React.Fragment>
                      <TButton onClick={() => updateIsLegal(false)}> Física </TButton>
                      <ButtonSelected onClick={() => updateIsLegal(true)}> Jurídica </ButtonSelected>
                  </React.Fragment>)
                : 
                  (<React.Fragment>
                      <ButtonSelected onClick={() => updateIsLegal(false)}> Física </ButtonSelected>
                      <TButton onClick={() => updateIsLegal(true)}> Jurídica </TButton>
                  </React.Fragment>)
                }        
                </TableDataL>
              </tr>
              <tr>
                <TableDataL> Búsqueda por:  </TableDataL>
                <TableDataR>
                    <Select value={selectedSearchField} onChange={onChangeSearchField} options={getFieldOptions()} 
                    placeholder={'Selecione una opción de búsqueda...'}></Select>
                </TableDataR>
              </tr>
              <tr>
                <TableDataL>
                  <Input name='term' type='text' placeholder='Ingrese el término de búsqueda' ref={register({ required: true })} />
                  {errors.term && <ErrorMsg> No puede estar vacio </ErrorMsg>}
                </TableDataL>
                <TableDataR><Button disabled={isLoading}> Buscar </Button></TableDataR>
              </tr>
            </tbody>
          </Table>
        </form>
        <Table>
          <tbody>
            <TableHeaderRow>
              <TableHeader> <span>{isLegal ? 'Razón social' : 'Nombre'} </span> </TableHeader>
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
