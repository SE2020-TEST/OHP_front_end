import { queryCourseInfo, queryHwList,queryHwInfo} from './service';

const Model = {
  namespace: 'courseCenter',
  state: {
    courseInfo: {},
    hwList: [],
    hwInfo: {},
  },
  effects: {
    *fetchCourseInfo({ payload }, { call, put }) {
      const response = yield call(queryCourseInfo, payload);
      yield put({
        type: 'saveCourseInfo',
        payload: response,
      });
    },

    *fetchHwList({ payload }, { call, put }) {
      const response = yield call(queryHwList, payload);
      yield put({
        type: 'saveHwList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchHwInfo({ payload }, { call, put }) {
      const response = yield call(queryHwInfo, payload);
      yield put({
        type: 'saveHwInfo',
        payload: response,
      });
    },

  },
  reducers: {
    saveCourseInfo(state, action) {
      return { ...state, courseInfo: action.payload.data || {} };
    },

    saveHwList(state, action) {
      return { ...state, hwList: action.payload };
    },

    saveHwInfo(state, action) {
      return { ...state, hwInfo: action.payload || {} };
    },
  },
};
export default Model;
