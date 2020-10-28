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

import { useAlert } from 'react-alert'
import { searchUserService } from '../services/searchUserService'
import { useHistory } from 'react-router-dom'

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
  min-width: 100px;
  
`
const ButtonSelected = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #1877f2;
  color: white;
  min-width: 100px;
`
const ActionButton = styled.button`
  width: 50%;
  font-size: 12pt;
  padding: 2px;
  min-width: 100px;
  background-color: #000;
  color: #fff;
  :active, :hover
  {
    background: #646464;
  }

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
const TableRow = styled.tr`
  background-color: #FFF;  
  border-bottom: 1px solid black;
  :active, :hover
  {
    background: #e9e9e9;
  }
`

const SearchClient = () => {
  const { register, handleSubmit, errors } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isLegal, setIsLegal] = useState(false)
  const [selectedSearchField, setSelectedSearchField] = useState()
  const [items, setItems] = useState([])
  const alert = useAlert()

  const onChangeSearchField = (option) => {
    setSelectedSearchField(option)
  }

  const legalOptions = [
    { value: 'username', label: 'Nombre de usuario' },
    { value: 'cuitCuil', label: 'CUIT/CUIL' },
    { value: 'businessName', label: 'Razón social' }
  ]

  const physicalOptions = [
    { value: 'username', label: 'Nombre de usuario' },
    { value: 'cuitCuil', label: 'CUIT/CUIL' },
    { value: 'fullname', label: 'Nombre y/o apellido' },
    { value: 'dni', label: 'DNI' }
  ]

  const updateIsLegal = (newValue) => {
    if (isLegal !== newValue) {
      setSelectedSearchField(null)
    }
    setIsLegal(newValue)
  }

  const onSubmit = (data) => {
    if (selectedSearchField === null) {
      alert.error('Debe seleccionar un campo de búsqueda')
    } else {
      setIsLoading(true)
      const params = { field: selectedSearchField.value, term: data.term }
      const search = isLegal ? searchUserService.searchLegalUsers(params) : searchUserService.searchPhysicalUsers(params)
      search
        .then((data) => {
          if (!Array.isArray(data) || !data.length) {
            alert.info('No se encontraron usuarios')
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
  }

  const history = useHistory()

  const renderTableData = () => {
    if (!Array.isArray(items) || !items.length) {
      return (
        <TableRow key={0}>
          <TableDataL>-</TableDataL>
          <TableDataL>-</TableDataL>
          <TableDataL>-</TableDataL>
          <TableDataL>-</TableDataL>
        </TableRow>)
    }

    return items.map((item, index) => {
      const name = item.userType === 'LEGAL' ? item.businessName : (item.firstName + ' ' + item.lastName)
      const cuitCuil = item.cuitCuilCdi
      return (
        <TableRow key={index}>
          <TableDataL>{name}</TableDataL>
          <TableDataL>{cuitCuil}</TableDataL>
          <TableDataL><ActionButton onClick={() => history.push({ pathname: '/clientDetails', state: { user: item } })}> Detalle </ActionButton></TableDataL>
          <TableDataL>
            <ActionButton onClick={() => history.push({ pathname: '/deposit', state: { user: item } })}> Depositar </ActionButton>
            <ActionButton onClick={() => history.push({ pathname: '/extraction', state: { user: item } })}> Extraer </ActionButton>
          </TableDataL>
        </TableRow>
      )
    })
  }

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url='background.png' direction='column'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TableAlt>
            <Caption> Búsqueda Cliente </Caption>
            <tbody>
              <tr>
                <TableDataL> Persona : </TableDataL>
                <TableDataL>
                  {isLegal ? (<><TButton onClick={() => updateIsLegal(false)}> Física </TButton><ButtonSelected onClick={() => updateIsLegal(true)}> Jurídica </ButtonSelected></>) : (<><ButtonSelected onClick={() => updateIsLegal(false)}> Física </ButtonSelected><TButton onClick={() => updateIsLegal(true)}> Jurídica </TButton></>)}
                </TableDataL>
              </tr>
              <tr>
                <TableDataL> Búsqueda por:  </TableDataL>
                {/*
                <TableDataR>
                  {isLegal &&
                    <Select
                      name='searchFieldLegal'
                      value={selectedSearchField}
                      options={legalOptions}
                      onChange={onChangeSearchField}
                      placeholder='Selecione un campo de búsqueda...'
                      ref={register({ required: true })}
                    />}
                  {!isLegal &&
                    <Select
                      name='searchFieldPhysical'
                      value={selectedSearchField}
                      options={physicalOptions}
                      onChange={onChangeSearchField}
                      placeholder='Selecione un campo de búsqueda...'
                      ref={register({ required: true })}
                    />}
                </TableDataR>
                  */}
              </tr>
              <tr>
                <TableDataL>
                  <Input name='term' type='text' placeholder='Ingrese el término de búsqueda' ref={register({ required: true })} />
                  <div>
                    {errors.term && <ErrorMsg> Debe ingresar un término de búsqueda </ErrorMsg>}
                  </div>
                </TableDataL>
                <TableDataR><Button disabled={isLoading}> Buscar </Button></TableDataR>
              </tr>
            </tbody>
          </TableAlt>
        </form>
        <TableAlt>
          <tbody>
            <TableHeaderRow>
              <TableHeader> <span>{isLegal ? 'Razón social' : 'Nombre'} </span> </TableHeader>
              <TableHeader> <span>CUIT /</span> <span>CUIL</span></TableHeader>
              <TableHeader> Detalle </TableHeader>
              <TableHeader> Operaciones </TableHeader>
            </TableHeaderRow>
            {renderTableData()}
          </tbody>
        </TableAlt>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default SearchClient
