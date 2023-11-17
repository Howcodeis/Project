import AxiosInterceptor from "../Interceptors/AxiosInterceptor";

export function getSentence () {
  return AxiosInterceptor.get('https://v1.hitokoto.cn/')
}