import api from "./api";

export function addCaseManagers(data) {
  return api.post("/case_manager/", data);
}

export function signinCaseManager (data) {
    return api.post('/case_manager/signin', data)
}

export function createMeeting(meetingData) {
  return api.post("/meetings/", meetingData);
}

export function getAllMeetings (caseManagerId, clientId) {
    return api.get("/meetings/")
}

export function getCaseMangersUsers (case_manager_id) {
  return api.get(`/case_manager/${case_manager_id}/users`)
}

export function getCaseMangersUserMeeting (case_manager_id, user_email) {
  return api.get(`/meetings/case_manager/${case_manager_id}/client/${user_email}`)
}