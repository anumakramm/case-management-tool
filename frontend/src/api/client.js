import api from "./api";

export function addClient(data) {
  return api.post("/users/", data);
}

export function getAllClients() {
  return api.get("/users/clients/all");
}

export function getAllActiveClients() {
  return api.get("/users/clients/active");
}

