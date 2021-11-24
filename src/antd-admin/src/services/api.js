export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  querySite: '/site/:id',
  querySiteList: '/sites',
  updateSite: 'Patch /site/:id',
  createSite: 'POST /site',
  removeSite: 'DELETE /site/:id',
  removeSiteList: 'POST /sites/delete',

  querySurvey: '/survey/:id',
  querySurveyList: '/surveys',
  updateSurvey: 'Patch /survey/:id',
  createSurvey: 'POST /survey',
  removeSurvey: 'DELETE /survey/:id',
  removeSurveyList: 'POST /surveys/delete',


  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}
