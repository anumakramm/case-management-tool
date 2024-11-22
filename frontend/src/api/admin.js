import api from './api'
import axios from 'axios';

export function signinAdmin (data) {
   console.log(data)
   return api.post('/users/admin/token', data)
}

export function addServices(file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post("/users/services/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}