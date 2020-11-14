import request from 'umi-request';

export async function queryCurrent() {
  return request.get('/api/user');
}
export async function queryPassword(params) {
  return request.post('/api/user/password',{params});
}