import axios from "axios";

export function AddClient (data) {
    return axios.post('http://localhost:8000/users/', data)
}