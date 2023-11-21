import axios from "axios";
import nProgress from "nprogress";


const MusciAxiosInterceptor = axios.create({
  baseURL: '/api/',
  timeout: 5000,
  withCredentials: true
})

MusciAxiosInterceptor.interceptors.request.use(
  config => {
    nProgress.start()
    return config
  },
  error => {
    nProgress.done()
    Promise.reject(error)
  }
)

MusciAxiosInterceptor.interceptors.response.use(
  response => {
    if (response.status == 200) {
      nProgress.done()
      return Promise.resolve(response.data)
    }
  },
  error => {
    nProgress.done()
    return Promise.reject(error)
  }
)

export default MusciAxiosInterceptor