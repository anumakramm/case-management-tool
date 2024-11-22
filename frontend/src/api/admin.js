import api from "./api";
import axios from "axios";

export function signinAdmin(data) {
  console.log(data);
  return api.post("/users/admin/token", data);
}

export function addServices(file) {
  return api.post("/users/services/upload", file);
}

export function addPassword(data) {
    return api.post('/users/update', data)
 }