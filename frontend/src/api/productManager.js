import api from "./api";

export function addProductManager(data) {
  return api.post("/users/", data);
}

export function userSignIn(data) {
  return api.post("/users/signin", data);
}

export function linkCaseManagerAndClient(case_manager_id, client_id, service_id) {
  const payload = {
    case_manager_id: case_manager_id,
    client_id: client_id,
    service_id: service_id,
  };

  return api.post(
    `/users/product_manager/client-to-case-manager?case_manager_id=${case_manager_id}&client_id=${client_id}&service_id=${service_id}`,
    payload
  );
}


export function getAllServices() {
  return api.get("/services/all");
}

export function getActiveCases() {
  return api.get("/users/product_manager/cases/active");
}