import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://43.139.155.210:3000'
// export const getArticle = async (data) => {
//     await axios.get('/article',{params : data}).then(res=>{
//         console.log(res.data.data.data)
//         return res.data.data.data
//     })
// }

export default axios
