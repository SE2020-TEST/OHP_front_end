import request from 'umi-request';

export async function queryCourseInfo(params) {
  return request.post('/section/info',{params});
}

export async function queryHwList(params) {
  return request.post('/hw/list',{params});
}

export async function queryHwInfo(params) {
  return request.post('/hw/info',{params});
}