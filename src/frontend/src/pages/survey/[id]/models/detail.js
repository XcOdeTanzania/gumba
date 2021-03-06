const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { querySurvey,updateSurvey } = api

export default {
  namespace: 'surveyDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/survey/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(querySurvey, payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
    *update({ payload,id }, { select, call, put }) {

      const newSurvey = { ...payload, id }

      const data = yield call(updateSurvey, newSurvey)

      if (data.success) {
        console.log('survey updated successfully');

      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
    localUpdateSurvey(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
