import api from "./api";

export function getAllCaseMangers() {
  return api.get("/users/case_manager/all");
}
export function addCaseManagers(data) {
  return api.post("/users/", data);
}

export function signinCaseManager(data) {
  return api.post("/case_manager/signin", data);
}

export function createMeeting(meetingData) {
  return api.post("/meetings/", meetingData);
}

export function initiateClient(case_manager_id, client_id, service_id) {
  const payload = {
    case_manager_id: case_manager_id,
    client_id: client_id,
    service_id: service_id,
  };

  return api.post(
    `/users/case_manager/initial/management/${case_manager_id}?client_id=${client_id}&service_id=${service_id}`,
    payload
  );
}

export function getAllMeetings(caseManagerId, clientId) {
  return api.get("/meetings/");
}

export function getCaseMangersUsers(case_manager_id) {
  return api.get(`/users/case_manager/${case_manager_id}/users`);
}

export function getCaseMangersUserMeeting(client_id, service_id) {
  return api.get(
    `/users/case_manager/client/${client_id}/service/${service_id}/meetings/all`
  );
}

export function getAllCaseManagers() {
  return api.get("/users/case_manager/all");
}

export function getAllActiveCaseManagers() {
  return api.get("/users/case_manager/active");
}

