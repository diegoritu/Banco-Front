import { urlWebService, urlOrigin } from './webService'
import request from './requestHelper'
import axios from 'axios'

const createService = (data, accountType, userName) => {
  var file = data.file[0]
  const formdata = new FormData()

  formdata.append("file", data.file[0])
  formdata.append('name', data.name)
  formdata.append('vendorAccountType', accountType)
  formdata.append('vendorUsername', userName)

  return axios.post(urlWebService.createService, formdata)
}

const searchService = (data) => {
  console.log(data)
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Origin: urlOrigin
    }
  }
  return fetch(urlWebService.searchService + '?servicePaymentId=' + data.servicePaymentId + "&vendorId=" + data.vendorId + "&dueDate=" + data.dueDateParameter, requestOptions)
    .then(response =>
      response.json().catch(err => {
        if (response.status === 404) {
          return 'serviceBillNotFound'
        }
      }).then(data => ({
        data: data,
        status: response.status
      }))
    )
    .catch(error => console.log('Fetch Error :-S', error))
}

export const serviceService = { createService, searchService }
