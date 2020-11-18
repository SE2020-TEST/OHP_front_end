import request from 'umi-request';
export async function fakeRegister(params) {
  console.log("register")
  console.log(params)
  return request('http://localhost:8080/user/register', {
    method: 'POST',
    data: params,
  });
}
