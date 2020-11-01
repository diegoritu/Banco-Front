import { urlWebService, urlOrigin } from './webService'
import request from './requestHelper'

const createService = (data, accountType, userName) => {
  var file = data.file[0]
  const formData = new FormData()

  formData.append("file", data.file)

  formData.append('name', data.name)
  formData.append('vendorAccountType', accountType)
  formData.append('vendorUsername', userName)

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      "Content-Type": "multipart/form-data",
      Origin: urlOrigin,
      type: "formData"
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
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Origin: urlOrigin
    },
  }
  return fetch(urlWebService.searchService + '?servicePaymentId=' + data.servicePaymentId + "&vendorId=" + data.vendorId, requestOptions)
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

