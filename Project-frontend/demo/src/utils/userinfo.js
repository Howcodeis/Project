

export function setUserInfo (...value) {
  const userinfo = {
    userId: value[0],
    username: value[1],
    token: value[3],
    permissionsId: value[2]
  }
  return userinfo
}