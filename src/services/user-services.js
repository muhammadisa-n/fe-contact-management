import axios from "axios"

export const authRegister = (data, callback) => {
  axios
    .post(`${import.meta.env.VITE_BASE_API_URL}/users`, data)
    .then((res) => {
      callback(true, res.data.message)
    })
    .catch((error) => {
      callback(false, error.response.data.errors)
    })
}
export const authLogin = (data, callback) => {
  axios
    .post(`${import.meta.env.VITE_BASE_API_URL}/users/login`, data)
    .then((res) => {
      callback(true, res.data.data.token)
    })
    .catch((error) => {
      callback(false, error.response.data.errors)
    })
}
export const getUserLoggedIn = async (token, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_API_URL}/users/current`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      callback(res.data.data)
    })
    .catch((error) => {
      callback(error.response.data.errors)
    })
}
