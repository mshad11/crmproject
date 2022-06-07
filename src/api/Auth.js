import axios from 'axios';
const BASE_URL = process.env.REACT_APP_SERVER_URL


//this function is used to send all the data for signup (username email password etc) that the user entered to the api
export  async function userSignup(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data)
}
   

//for signIn part
export  async function userSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data)
}