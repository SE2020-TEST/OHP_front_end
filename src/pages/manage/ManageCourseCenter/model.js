import { querySubmission } from './service';

const Model = {
  namespace: 'manageCourseCenter',
  state: {
    submission:{},//作业提交情况
  },
  effects: {
    *fetchSubmission({ payload }, { call, put }) {
      const response = yield call(querySubmission, payload);
      yield put({
        type: 'saveSubmission',
        payload: response,
      });
    },

  },
  reducers: {
    saveSubmission(state, action) {
      return { ...state, submission: action.payload || {} };
    },
  },
};
export default Model;
