import { querySubmission, queryUserList } from './service';

const Model = {
  namespace: 'manageCourseCenter',
  state: {
    submission: {},//作业提交情况
    userList: [],//用户列表
  },
  effects: {
    *fetchSubmission({ payload }, { call, put }) {
      const response = yield call(querySubmission, payload);
      yield put({
        type: 'saveSubmission',
        payload: response,
      });
    },

    *fetchUserList({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'saveUserList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

  },
  reducers: {
    saveSubmission(state, action) {
      return { ...state, submission: action.payload || {} };
    },

    saveUserList(state, action) {
      return { ...state, userList: action.payload };
    },

  },
};
export default Model;
