import api from "./api";

export function addProductManager(data) {
  return api.post("/product_manager/", data);
}

export function signinProjectManager(data) {
  return api.post("/product_manager/signin", data);
}

export function linkCaseManagerAndClient(pm_id, cm_id, clients) {
  return api.post(
    `/product_manager/${pm_id}/assign_users_to_case_manager/${cm_id}`,
    clients
  );
}
