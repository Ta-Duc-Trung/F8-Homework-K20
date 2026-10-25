import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10_000,
})

export default axiosClient
