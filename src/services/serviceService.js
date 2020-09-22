import urlWebService from './webService'

const createService = (data, amountOfIds, dueDate, name, vendorAccountNumber, vendorAccountType, vendorUsername) => {
const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({amount: data.amount, amountOfIds: amountOfIds, dueDate: dueDate, name : name, vendorAccountNumber : vendorAccountNumber, vendorAccountType : vendorAccountType, vendorUsername : vendorUsername})
  }
  return fetch(urlWebService.createService, requestOptions)
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
