const urlAPI = 'http://localhost:8080/bank-api'

const urlWebService = {
  login: urlAPI + '/user/login',
  changePassword: urlAPI + '/user/changePassword',
  getSavings: urlAPI + '/account/savings',
  getChecking: urlAPI + '/account/checking',
  getPhysical: urlAPI + '/user/physical',
  getLegal: urlAPI + '/user/legal',
  getAdministrative: urlAPI + '/user/administrative',
  createPhysicalUser : urlAPI + '/user/physical',
  createLegalUser : urlAPI + '/user/legal',
  searchPhysicalUser : urlAPI + '/user/physical/search',
  searchLegalUser : urlAPI + '/user/legal/search',
  transferToOtherAccounts: urlAPI + '/movement/transferToOtherAccounts',
  transferBetweenOwnAccounts: urlAPI + '/movement/transferBetweenOwnAccounts',
  getMovements: urlAPI + '/movement/movements',
  getMovement: urlAPI + '/movement/movementById',
  getLegals: urlAPI + '/user/legals',
  createService: urlAPI + '/service-bill/create'
}

export default urlWebService
