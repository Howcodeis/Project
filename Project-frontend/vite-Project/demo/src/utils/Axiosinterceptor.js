import router from "../router";
import axios from "axios";

const Axiosinterceptor = axios.create({
  baseURL: "http://localhost:8088",
  timeout: 5000
})

Axiosinterceptor.interceptors.request.use(
  config => {
    const { token } = JSON.parse(localStorage.getItem("userinfo")) || ''
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  error => {
    Promise.reject(error)
  })
Axiosinterceptor.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    router.replace("/")
    return Promise.reject(error)
  }
)

export default Axiosinterceptor