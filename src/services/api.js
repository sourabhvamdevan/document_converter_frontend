


import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

export const convertDocument = (formData) => {
  return api.post("/convert", formData, {
    responseType: "blob",
  })
}
