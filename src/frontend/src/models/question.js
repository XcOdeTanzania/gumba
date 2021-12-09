import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api';
import { pageModel } from 'utils/model';

const {
  queryQuestionList,

  createQuestion,
  removeQuestion,
  updateQuestion,
  removeQuestionList,
} = api

export default modelExtend(pageModel, {
  namespace: 'question',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/question').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call( queryQuestionList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(removeQuestion, { id: payload })
      console.log(data);

      if (data.success) {

        return data;

      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeQuestionList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload,id }, { call, put }) {


      const data = yield call(createQuestion, payload)
      if (data.success) {
          return data;


        // yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload,id }, { select, call, put }) {

      const newQuestion = { ...payload, id }

      const data = yield call(updateQuestion, newQuestion)

      if (data.success) {
        console.log('question updated successfully');
        // yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
