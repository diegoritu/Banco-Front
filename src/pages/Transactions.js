import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import { Table, TableDataL, TableHeader, TableHeaderRow } from '../components/Table'

const data = [
  {
    id: 1,
    fecha: '18/09',
    concepto: 'Compra Pc',
    importe: -20,
    saldo: 100,
    detalle: {}
  },
  {
    id: 2,
    fecha: '18/09',
    concepto: 'Compra Pc',
    importe: -20,
    saldo: 100,
    detalle: {}
  }
]

const Transactions = () => {
  const renderTableData = () => {
    return data.map((item, index) => {
      const { fecha, concepto, importe, saldo } = item
      return (
        <tr key={index}>
          <TableDataL>{fecha}</TableDataL>
          <TableDataL>{concepto}</TableDataL>
          <TableDataL>{importe}</TableDataL>
          <TableDataL>{saldo}</TableDataL>
        </tr>
      )
    })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Detalle de cuenta </Text>
        <Text> Ultimos movimientos </Text>
        <Table>
          <tbody>
            <TableHeaderRow>
              <TableHeader> Fecha </TableHeader>
              <TableHeader> Concepto </TableHeader>
              <TableHeader> Importe </TableHeader>
              <TableHeader> Saldo </TableHeader>
              <TableHeader> Detalle </TableHeader>
            </TableHeaderRow>
            {renderTableData()}
          </tbody>
        </Table>

      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transactions
