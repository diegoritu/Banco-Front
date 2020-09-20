import urlWebService from './webService'
const urlOrigin = 'http://localhost:3000'

const transferToOtherAccounts = (data, originAcc) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({accountNumberFrom: originAcc, amount: data.amountToNotOwned, cbuTo: data.cbu, reference: data.reference})
  }
  return fetch(urlWebService.transferToOtherAccounts, requestOptions)
    .then(response => 
      response.json().catch(err => {
        
        if(response.status === 409){
          return 'accountNotFound'  
        }
        else{
          return 'operationCantBePerformed'  

        }
      })
      .then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      return res.data
  }))
    .catch(error => console.log('Fetch Error :-S', error))
}
const transferBetweenOwnAccounts = (data, originAcc, destinationAcc) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({accountNumberFrom: originAcc, accountNumberTo: destinationAcc, amount: data.amountToOwned})
  }
  return fetch(urlWebService.transferToOtherAccounts, requestOptions)
    .then(response => 
      response.json().catch(err => {
        
        if(response.status === 409){
          return 'accountNotFound'  
        }
        else{
          return 'operationCantBePerformed'  

        }
      })
      .then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      return res.data
  }))
    .catch(error => console.log('Fetch Error :-S', error))
}

export const transactionService = { transferToOtherAccounts, transferBetweenOwnAccounts }
