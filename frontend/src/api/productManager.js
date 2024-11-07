import api from "./api";

export function AddProductManager (data) {
    return api.post('/product_manager/', data)
}

export function signinProjectManager (data) {
    return api.post('/product_manager/signin', data)
}