import api from "./api";

export function addProductManager(data) {
  return api.post("/users/", data);
}

export function userSignIn(data) {
  return api.post("/users/signin", data);
}

// export function linkCaseManagerAndClient(pm_id, cm_id, clients) {
//   return api.post(
//     `/product_manager/${pm_id}/assign_users_to_case_manager/${cm_id}`,
//     clients
//   );
// }

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