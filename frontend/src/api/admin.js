import api from './api'

export function signinAdmin (data) {
   console.log(data)
   return api.post('/users/admin/token', data)
}