import { queryCourseInfo } from './service';

const Model = {
  namespace: 'courseCenter',
  state: {
    courseInfo: {},
  },
  effects: {
    *fetchCourseInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryCourseInfo, payload);
      yield put({
        type: 'saveCourseInfo',
        payload: response,
      });
    },

  },
  reducers: {
    saveCourseInfo(state, action) {
      return { ...state, courseInfo: action.payload || {} };
    },
  },
};
export default Model;
