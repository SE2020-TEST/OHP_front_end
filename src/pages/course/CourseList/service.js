import request from 'umi-request';

export async function queryFakeList(params) {
  return request.post('http://localhost:8080/section/list', {
    data: params,
  });
}

export async function deleteSection(params) {
  return request.post('http://localhost:8080/section/delete', {
    data: params,
  });
}