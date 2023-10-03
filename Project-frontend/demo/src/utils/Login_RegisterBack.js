import { setUserInfo } from './UserInfo'
import { setItem } from './LocalStorage'
import { Message } from 'element-ui'
import store from '../store'
import router from '../router'
import Axiosinterceptor from './Axiosinterceptor'


export function loginBack (username, password, reload) {
  Axiosinterceptor({
    method: 'get',
    url: '/login',
    params: {
      username: username,
      password: password
    }
  }).then(async result => {
    const { msg, code } = result.data
    const { token, user } = result.data.data
    if (code == 20000) {
      Message.success({
        message: msg,
        duration: 2000
      })
      const { userId, username, permissionsId } = user
      setItem(JSON.stringify(setUserInfo(userId, username, permissionsId, token)))
      store.state.userinfo = JSON.stringify(localStorage.getItem('userinfo'))
      await router.replace('/todos')
      reload()
    } else {
      Message.warning({
        message: msg,
        duration: 2000
      })
    }
  })
    .catch(error => {
      console.log(error);
    })
}
export function registerBack (username, password) {
  if (username.length < 4 || username.length > 8) {
    Message.warning({
      message: "用户名字符在4~8之间",
      duration: 2000
    })
  } else if (password.length < 6 || password.length > 16) {
    Message.warning({
      message: "密码字符在6~16之间",
      duration: 2000
    })
  } else {
    Axiosinterceptor({
      method: 'post',
      url: '/register',
      params: {
        username: username,
        password: password
      }
    }).then((result) => {
      const { msg, code } = result.data
      if (code == 20000) {
        Message.success({
          message: msg,
          duration: 2000
        })
        router.replace({
          name: 'login',
        })
      } else {
        Message.error({
          message: msg,
          duration: 2000
        })
      }
    })
  }
}