import request from 'umi-request';

export async function queryCourseInfo(params) {
  return request.post('/section/info',{params});
}