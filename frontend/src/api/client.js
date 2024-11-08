import api from "./api";

export function addClient (data) {
    return api.post('/users/', data)
}