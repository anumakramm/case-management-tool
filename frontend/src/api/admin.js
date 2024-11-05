import api from './api'

export function signinAdmin (data) {
    return api.post('/admin/authorize', data)
}