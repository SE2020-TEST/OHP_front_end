import request from 'umi-request';

export async function querySubmission(params) {
  return request.post('/hw/submission',{params});
}

export async function queryUserList(params) {
  console.log(params)
  return request.post('http://localhost:8080/section/userlist', { data: params });
}