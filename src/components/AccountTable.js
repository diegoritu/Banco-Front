import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  background: #fff;
  border: 1px solid black;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  background: grey;
  
`

const TableData = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
  color: #fff;
  width: 20%;
  text-align: center;
  padding: 8px;
`

const TableHeader = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 8px;
`

const TButton = styled.button`
  width: 100%;
  height: 100%;
  
`

const AccountTable = (data) => {
  return (
    <Table>
      <tbody>
        <TableRow>
          <TableHeader> Tipo </TableHeader>
          <TableHeader> Numero </TableHeader>
          <TableHeader> Saldo </TableHeader>
        </TableRow>
        <TableRow>
          <TableData>{data.type ? data.type : 'Cuenta'}</TableData>
          <TableData>{data.num ? data.num : '0'}</TableData>
          <TableData>{data.balance ? data.balance : '0'}</TableData>
        </TableRow>
        <TableRow>
          <TableData><TButton> Transferir </TButton></TableData>
          <TableData><TButton> CBU </TButton></TableData>
          <TableData><TButton> Movimientos </TButton></TableData>
        </TableRow>
      </tbody>
    </Table>

  )
}

export default AccountTable
