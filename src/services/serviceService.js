import { urlWebService, urlOrigin } from './webService'
import request from './requestHelper'

const createService = (data, accountType, userName) => {
  const formData = {
    file: data.file[0],
    name: data.name,
    vendorAccountType: accountType,
    vendorUsername: userName
  }
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: formData
  }
  return request(urlWebService.createService, requestOptions)
  /*
  return fetch(urlWebService.createService, requestOptions)
    .then(response =>
      response.json().catch(err => {
        if(response.status === 409){
          return 'vendorNotFound'
        }
      })
     )
    .catch(error => console.log('Fetch Error :-S', error))
  */
}

const searchService = (data) => {
  console.log(data)
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    }
  }
  return fetch(urlWebService.searchService + '?servicePaymentId=' + data.servicePaymentId + '&vendorId=' + data.vendorId, requestOptions)
    .then(response =>
      response.json().catch(err => {
        if (response.status === 404) {
          return 'serviceBillNotFound'
        }
      })
    )
    .catch(error => console.log('Fetch Error :-S', error))
}

export const serviceService = { createService, searchService }
