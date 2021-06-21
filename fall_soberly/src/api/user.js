import request from '../utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return fetch('http://localhost:3000/account?username='+token)
      .then(res=>res.json())
      .then(myJson=>myJson[0]).catch(err=> console.log(err));
  /*return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })*/
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
