import styled from 'styled-components'

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #fff;
  border-collapse: collapse;
`
const TButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0px;
`

const TableDataR = styled.td`
  border-collapse: collapse;
  color: #000;
  width: 20%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`

const TableDataL = styled.td`
  border-collapse: collapse;
  color: #000;
  width: 10%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`

const Caption = styled.caption`
padding: 15px;
`

const TableHeader = styled.th`
  border-collapse: collapse;
  color: #000;
  width: 20%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`
const TableHeaderRow = styled.tr`
  background: grey;
`

export {
  Table,
  Caption,
  TableHeaderRow,
  TableHeader,
  TableDataL,
  TableDataR,
  TButton
}
