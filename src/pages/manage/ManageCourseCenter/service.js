import request from 'umi-request';

export async function querySubmission(params) {
  return request.post('/hw/submission',{params});
}

export async function queryUserList(params) {
  return request.post('/hw/users',{params});
}