
export function setUserData (...value) {
  const userinfo = {
    userId: value[0],
    username: value[1],
    permissionsId: value[2],
    token: value[3]
  }
  return userinfo
}

export function setItem (value) {
  localStorage.setItem('userinfo-save', value)
}