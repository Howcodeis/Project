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
    // config.headers.Authorization = 'Access - Control - Allow - Origin'
    return config
  },
  error => {
    nProgress.done()
    Promise.reject(error)
  }
)

MusciAxiosInterceptor.interceptors.response.use(
  response => {
    nProgress.done()
    return Promise.resolve(response)
  },
  error => {
    nProgress.done()
    return Promise.reject(error)
  }
)

export default MusciAxiosInterceptor