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
  return api.post("/users/update", data);
}

export const deleteOrRetainUser = (id, status) => {
  if (status === "ACTIVE") return api.delete(`/users/${id}`);
  else if (status === "DELETED") return api.post(`/users/retain/${id}`);
};
