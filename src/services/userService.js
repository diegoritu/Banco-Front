import urlWebService from './webService'
const urlOrigin = 'http://localhost:3000'

const login = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ password: data.password, username: data.username })
  }
  return fetch(urlWebService.login, requestOptions)
    .then(response => 
      response.json().catch(err => {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return 'Error'
      })
      .then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      if (res.status === 409) {
        logout()
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return 'Error'
      }
      else {
        window.sessionStorage.setItem('user', res.data.username)
        window.sessionStorage.setItem('userType', res.data.userType)
        window.sessionStorage.setItem('userName', res.data.userType === 'LEGAL' ? res.data.businessName : (res.data.lastName + ', ' + res.data.firstName))
        window.sessionStorage.setItem('userSavings', (res.data.savings ? res.data.savings.accountNumber : null))
        window.sessionStorage.setItem('userChecking', (res.data.checking ? res.data.checking.accountNumber : null))

        if (res.status === 200 && (res.data.userType === 'PHYSICAL' || res.data.userType === 'LEGAL')) return '/home'
        if (res.data.userType === 'ADMINISTRATIVE') return '/adminHome'
        if (res.status === 202) return '/password'
      }
  }))
    .catch(error => console.log('Fetch Error :-S', error))
}

function logout () {
  window.sessionStorage.removeItem('user')
  window.sessionStorage.removeItem('userType')
  window.sessionStorage.removeItem('userName')
  window.sessionStorage.removeItem('userSavings')
  window.sessionStorage.removeItem('userChecking')

}

const changePassword = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ password: data.password, username: window.sessionStorage.getItem('user') })
  }
  return fetch(urlWebService.changePassword, requestOptions)
    .then(response => {
      if (response.status === 409) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
      }
      else {
        if (window.sessionStorage.getItem('userType') === 'PHYSICAL' || window.sessionStorage.getItem('userType') === 'LEGAL') return '/home'
        if (window.sessionStorage.getItem('userType') === 'ADMINISTRATIVE') return '/adminHome'
      }
  })
    .catch(error => console.log('Fetch Error :-S', error))
}

export const userService = { login, logout, changePassword }
