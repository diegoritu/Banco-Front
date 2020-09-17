import urlWebService from './webService'

const login = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3000'
    },
    body: JSON.stringify({ password: data.password, username: data.username })
  }
  return fetch(urlWebService.login, requestOptions)
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          logout()
          window.location.reload()
        }
        console.log('Looks like there was a problem. Status Code: ' + response.status)
      } else {
        window.sessionStorage.setItem('user', data.username)
        if (response === 0 || response === 1) return '/home'
        if (response === 2) return '/adminHome'
        if (response.status === 202) return '/password'
      }
    })
    .catch(error => console.log('Fetch Error :-S', error))
}

function logout () {
  window.sessionStorage.removeItem('user')
}

export const userService = { login, logout }
