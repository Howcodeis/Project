import AxiosInterceptor from "./AxiosInterceptor";

export function getSentence () {
  return AxiosInterceptor({
    method: 'get',
    url: 'https://v1.hitokoto.cn/'
  })
}