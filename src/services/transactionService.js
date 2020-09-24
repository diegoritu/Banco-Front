import request from './requestHelper'
import { urlWebService, urlOrigin } from './webService'

const transferToOtherAccounts = (data, originAcc) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ accountNumberFrom: originAcc, amount: data.amountToNotOwned, cbuTo: data.cbu, reference: data.reference })
  }
  return fetch(urlWebService.transferToOtherAccounts, requestOptions)
    .then(response =>
      response.json().catch(err => {
        if (response.status === 409) {
          return 'accountNotFound'
        } else {
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
    body: JSON.stringify({ accountNumberFrom: originAcc, accountNumberTo: destinationAcc, amount: data.amountToOwned })
  }
  return fetch(urlWebService.transferBetweenOwnAccounts, requestOptions)
    .then(response =>
      response.json().catch(err => {
        if (response.status === 409) {
          return 'accountNotFound'
        } else {
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

const getTransactions = (data) => {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    }
  }
  if (data === 'CHECKING') {
    return fetch(urlWebService.getMovements + '?accountNumber=' + window.sessionStorage.getItem('userChecking'), requestOptions)
      .then(response =>
        response.json().catch(err => {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          return {}
        })
          .then(data => ({
            data: data,
            status: response.status
          })
          ).then(res => {
            if (res.status === 404) {
              return {}
            } else {
              return res.data
            }
          }))
      .catch(error => console.log('Fetch Error :-S', error))
  } else {
    return fetch(urlWebService.getMovements + '?accountNumber=' + window.sessionStorage.getItem('userSavings'), requestOptions)
      .then(response =>
        response.json().catch(err => {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          return ({})
        }
        )
          .then(data => ({
            data: data,
            status: response.status
          })
          ).then(res => {
            if (res.status === 404) {
              return {}
            } else {
              return res.data
            }
          }))
      .catch(error => console.log('Fetch Error :-S', error))
  }
}

const getTransaction = (data) => {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    }
  }
  return fetch(urlWebService.getMovement + '?id=' + data, requestOptions)
    .then(response =>
      response.json().catch(err => {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return {}
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

const makeExtraction = (account, amount) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ accountNumberEntryAccount: account, amount: amount })
  }
  return fetch(urlWebService.extract, requestOptions)
  .then(response =>
    response.json().catch(err => {
      console.log('Looks like there was a problem. Status Code: ' + response.status)
      if(response.status === 418){
        return 'transactionError'
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

const makeDeposit = (account, amount) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ accountNumberEntryAccount: account, amount: amount })
  }
  return fetch(urlWebService.deposit, requestOptions)
  .then(response =>
    response.json().catch(err => {
      console.log('Looks like there was a problem. Status Code: ' + response.status)
      if(response.status === 418){
        return 'transactionError'
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

export const transactionService = { transferToOtherAccounts, transferBetweenOwnAccounts, getTransactions, getTransaction, makeExtraction, makeDeposit }
