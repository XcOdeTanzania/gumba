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
  updateSurvey: 'PUT /surveys/:id',
  createSurvey: 'POST /surveys',
  removeSurvey: 'DELETE /surveys/:id',
  removeSurveyList: 'POST /surveys/delete',

  querySection: '/sections/:id',
  querySectionList: '/sections',
  updateSection: 'PUT /sections/:id',
  createSection: 'POST /sections',
  removeSection: 'DELETE /sections/:id',
  removeSectionList: 'POST /sections/delete',


  queryQuestion: '/questions/:id',
  queryQuestionList: '/questions',
  updateQuestion: 'PUT /questions/:id',
  createQuestion: 'POST /questions',
  removeQuestion: 'DELETE /questions/:id',
  removeQuestionList: 'POST /questions/delete',

  queryAnswer: '/answers/:id',
  queryAnswerList: '/answers',
  updateAnswer: 'PUT /answers/:id',
  createAnswer: 'POST /answers',
  removeAnswer: 'DELETE /answers/:id',
  removeAnswerList: 'POST /answers/delete',


  querySkip: '/skips/:id',
  querySkipList: '/skips',
  updateSkip: 'PUT /skips/:id',
  createSkip: 'POST /skips',
  removeSkip: 'DELETE /skips/:id',
  removeSkipList: 'POST /skips/delete',

  queryResponse: '/responses/:id',
  queryResponseList: '/responses',
  updateResponse: 'PUT /responses/:id',
  createResponse: 'POST /responses',
  removeResponse: 'DELETE /responses/:id',
  removeResponseList: 'POST /responses/delete',

  queryPostList: '/posts',
  queryDashboard: '/dashboard',
}
