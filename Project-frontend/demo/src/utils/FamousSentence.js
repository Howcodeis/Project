import Axiosinterceptor from "./Axiosinterceptor";

export function getSentence () {
  return Axiosinterceptor({
    method: 'get',
    url: 'https://v1.hitokoto.cn/'
  })
}