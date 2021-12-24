import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api';
import { pageModel } from 'utils/model';

const {
  querySkipList,

  createSkip,
  removeSkip,
  updateSkip,
  removeSkipList,
} = api

export default modelExtend(pageModel, {
  namespace: 'skip',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/skip').exec(location.pathname)) {
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
      const data = yield call( querySkipList, payload)
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
      const data = yield call(removeSkip, { id: payload })
      console.log(data);

      if (data.success) {

        return data;

      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeSkipList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload,id }, { call, put }) {


      const data = yield call(createSkip, payload)
      if (data.success) {
        return data;


        // yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload,id }, { select, call, put }) {

      const newSkip = { ...payload, id }

      const data = yield call(updateSkip, newSkip)

      if (data.success) {
        console.log('skip updated successfully');
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
