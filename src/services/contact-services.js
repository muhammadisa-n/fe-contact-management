import axios from "axios"

export const getAllContact = async (token, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_API_URL}/contacts`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      callback(res.data.data)
    })
    .catch((error) => {
      callback(error.response.data.errors)
    })
}
export const getDetailContact = async (id, token, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_API_URL}/contacts/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      callback(res.data.data)
    })
    .catch((error) => {
      callback(error.response.data.errors)
    })
}
