import {  queryFakeList, deleteSection } from './service';

const Model = {
  namespace: 'courseList',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(deleteSection, payload);
      if (res.code == 0) {
        yield put({
          type: 'deleteOne',
          payload: payload.sid,
        });
      }
    },
    
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    'deleteOne'(state,{payload}){
      console.log("sid")
      console.log(state.list)
      console.log(payload)
      console.log(state.list.filter(item=>item.id!=payload.sid))

      return { ...state, list: state.list.filter(item=>item.id!=payload.sid)};
    }

  
  },
};
export default Model;
