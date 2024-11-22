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

export function getAllMeetings(caseManagerId, clientId) {
  return api.get("/meetings/");
}

export function getCaseMangersUsers(case_manager_id) {
  return api.get(`/users/case_manager/${case_manager_id}/users`);
}

export function getCaseMangersUserMeeting(case_manager_id, user_email) {
  return api.get(
    `/meetings/case_manager/${case_manager_id}/client/${user_email}`
  );
}
