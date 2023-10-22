import AxiosInterceptor from "../Interceptors/AxiosInterceptor";

export function getSentence () {
  return AxiosInterceptor({
    method: 'get',
    url: 'https://v1.hitokoto.cn/'
  })
}