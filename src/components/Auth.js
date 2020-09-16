class Auth {
  constructor () {
    this.authenticated = true
    this.authenticatedAdmin = true
  }

  login (cb) {
    this.authenticated = false
    if (this.authenticated) cb()
  }

  loginAdmin (cb) {
    this.authenticatedAdmin = true
    cb()
  }

  logout (cb) {
    this.authenticated = false
    cb()
  }

  isAuthenticated () {
    return this.authenticated
  }

  isAuthenticatedAdmin () {
    return this.authenticatedAdmin
  }
}

export default new Auth()
