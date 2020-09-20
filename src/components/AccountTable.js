import React from 'react'
import styled from 'styled-components'
import { accountService } from '../services/accountService'
import { useHistory } from 'react-router-dom';

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #fff;
  border: 1px solid black;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  background: #3a74b0;
  
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
  background: #000000;
  color: white;
`

const TButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: white;
  padding: 6px;
  border: none;
  :hover, :active {
    background-color: #646464;
  }
`

function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}

const getAccount = (accountType) => {
  return accountService.account(accountType)
}


const AccountTable = (props) => {
  const history = useHistory()
  const navigateToTransactions = () => history.push({
    pathname: '/transactions',
    state: { account: data.accountNumber }
  })
  const navigateToTransfer = () => history.push('/transfer')
  const navigateToCBU = () => history.push({
    pathname: '/cbu',
    state: { account: data.accountNumber }
  })


  const [data, setAccount] = React.useState([])
  React.useEffect(() => {
    getAccount(props.accountType).then(data => setAccount(data))
  }, [])
  if(Object.keys(data).length !== 0){
    return (
      <Table>
        <tbody>
          <TableRow>
            <TableHeader> Tipo </TableHeader>
            <TableHeader> Numero </TableHeader>
            <TableHeader> Saldo </TableHeader>
          </TableRow>
          <TableRow>
            <TableData>{data.accountType === 'CHECKING' ? 'Cuenta corriente' : 'Caja de ahorro'}</TableData>
            <TableData>{data.accountNumber}</TableData>
            <TableData>{'$ ' + numberWithStyle(data.balance)}</TableData>
          </TableRow>
          <TableRow>
            <TableData><TButton onClick={navigateToTransfer} type="button"> Transferir </TButton></TableData>
            <TableData><TButton onClick={navigateToCBU} type="button"> CBU </TButton></TableData>
            <TableData><TButton onClick={navigateToTransactions} type="button"> Movimientos </TButton></TableData>
          </TableRow>
        </tbody>
      </Table>
  
    )
  }    
  else {
    return('')
  }

}

export default AccountTable
