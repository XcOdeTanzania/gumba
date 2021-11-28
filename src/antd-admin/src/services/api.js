export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/users/:id',
  queryUserList: '/users',
  updateUser: 'PUT /users/:id',
  createUser: 'POST /users',
  removeUser: 'DELETE /users/:id',
  removeUserList: 'POST /users/delete',

  querySite: '/sites/:id',
  querySiteList: '/sites',
  updateSite: 'PUT /sites/:id',
  createSite: 'POST /sites',
  removeSite: 'DELETE /sites/:id',
  removeSiteList: 'POST /sites/delete',

  querySurvey: '/surveys/:id',
  querySurveyList: '/surveys',
  updateSurvey: 'Patch /survey/:id',
  createSurvey: 'POST /survey',
  removeSurvey: 'DELETE /survey/:id',
  removeSurveyList: 'POST /surveys/delete',


  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}
