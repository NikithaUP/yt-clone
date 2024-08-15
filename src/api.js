import axios from 'axios'
console.log(process.env.REACT_YT_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
    
      key: 'AIzaSyAj7m4WfgrvnvwlJ8-U_yi1pkNJ64Jyf0w',

   },
})

export default request

