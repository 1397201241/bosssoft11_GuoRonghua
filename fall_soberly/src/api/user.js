import request from '../utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return fetch('http://localhost:3000/user?username='+token)
      .then(res=>res.json())
      .then(myJson=>myJson[0]).catch(err=> console.log(err));
}

export function getRole(uid) {
  return fetch('http://localhost:3000/user_role?uid='+uid)
      .then(res=>res.json())
      .then(myJson=>myJson[0]).catch(err=> console.log(err));
}

export function getPermissionID(rid) {
  return fetch('http://localhost:3000/role_permission?rid='+rid)
      .then(res=>res.json())
      .then(myJson=>myJson[0].permission_id)
      .catch(err=> console.log(err));
}

export function getPermission(permission_id) {
  return fetch('http://localhost:3000/permission/'+permission_id)
      .then(res=>res.json())
      .catch(err=> console.log(err));
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
