import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { removeUserinfo } from '@/utils/userinfo';


const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

     // if (response.status === 'ok') {
      if (response.code == 0) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        console.log('rediretn')
        console.log(params)
        console.log(redirect)
        
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      removeUserinfo();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload)
      setAuthority(payload.data.role==0?'user':'admin');
      return { ...state, status: payload.code == 0 ? 'ok' : 'error', type: payload.type };
    },
  },
};
export default Model;
