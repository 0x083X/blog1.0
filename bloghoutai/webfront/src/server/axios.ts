import axios from 'axios'

axios.defaults.baseURL = 'http://43.139.155.210:3000'
axios.defaults.timeout = 10000

export default axios