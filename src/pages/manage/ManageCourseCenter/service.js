import request from 'umi-request';

export async function querySubmission(params) {
  return request.post('/hw/submission',{params});
}