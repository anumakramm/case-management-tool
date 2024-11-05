import api from "./api";

export function AddClient (data) {
    return api.post('/users/', data)
}