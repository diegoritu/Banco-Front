import webService from './webService'
const urlOrigin = 'http://localhost:3000'

const createService = (data, legalSelected, accountNumber, accountType) => {
  console.log(data)
  console.log(legalSelected)
  console.log(accountNumber)
  console.log(accountType)
const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({amount: data.amount, amountOfIds: data.amountOfIds, dueDate: data.dueDate, name : data.name, vendorAccountNumber : accountNumber, vendorAccountType : accountType, vendorUsername : legalSelected.value})
  }
  return fetch(webService.createService, requestOptions)
    .then(response => 
      response.json().catch(err => {
        if(response.status === 409){
          return 'vendorNotFound'  
        }
      })
     )
    .catch(error => console.log('Fetch Error :-S', error))
}


export const serviceService = { createService }
