import axios from "axios";
import nProgress from "nprogress";

const AxiosInterceptor = axios.create({
  baseURL: "http://localhost:8088",
  timeout: 5000,
})

AxiosInterceptor.interceptors.request.use(
  config => {
    nProgress.start()
    const { token } = JSON.parse(localStorage.getItem("userinfo-save")) || ''
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  error => {
    nProgress.done()
    Promise.reject(error)
  })
AxiosInterceptor.interceptors.response.use(
  response => {
    nProgress.done()
    return Promise.resolve(response)
  },
  error => {
    nProgress.done()
    return Promise.reject(error)
  },
)

export default AxiosInterceptor