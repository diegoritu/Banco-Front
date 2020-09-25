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
import { useHistory } from 'react-router-dom'
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
  min-width: 100px;
  
`
const ButtonSelected = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #3a74b0;
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
  this.value = value
  this.label = label
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
    if (isLegal !== newValue) {
      setSelectedSearchField('')
    }
    setIsLegal(newValue)
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    const params = { field: selectedSearchField.value, term: data.term }
    const search = isLegal ? searchUserService.searchLegalUsers(params) : searchUserService.searchPhysicalUsers(params)
    search
      .then((data) => {
        if (!Array.isArray(data) || !data.length) {
          alert.info('No se encontraron usuarios', { timeout: 7000 })
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
      <Content id='content' url="background.png" direction='column'>
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
                <TableDataR>
                  <Select value={selectedSearchField} onChange={onChangeSearchField} options={getFieldOptions()} placeholder='Selecione una opción de búsqueda...' ref={register({ required: true})}/>
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
