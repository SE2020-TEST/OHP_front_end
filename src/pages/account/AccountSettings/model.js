import { queryCurrent, queryPassword } from './service';

const Model = {
  namespace: 'accountSettings',
  state: {
    currentUser: {},
    isLoading: false,
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchPassword({ payload, callback }, { call, put }) {
      return yield call(queryPassword,payload);
    },

  },
  reducers: {
    saveCurrentUser(state, {payload:currentUser}) {
      return { ...state, currentUser};
    },

    savePassword(state, action) {
      return { ...state, password: action.payload.password || {} };
    },


    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
