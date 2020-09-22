import urlWebService from './webService'
import request from './requestHelper'
const urlOrigin = 'http://localhost:3000'

const searchPhysicalUsers = (params) => {
    const url = urlWebService.searchPhysicalUser + '?field=' + params.field + '&term=' + params.term
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: urlOrigin
      }
    }

    return request(url, requestOptions)
}

const searchLegalUsers = (params) => {
    const url = urlWebService.searchLegalUser + '?field=' + params.field + '&term=' + params.term
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: urlOrigin
      }
    }

    return request(url, requestOptions)
}

export const searchUserService = { searchPhysicalUsers, searchLegalUsers }