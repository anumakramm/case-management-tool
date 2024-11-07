import api from "./api";

export function AddCaseManagers(data) {
  return api.post("/case_manager/", data);
}

export function signinCaseManager (data) {
    return api.post('/case_manager/signin', data)
}

export function createMeeting(meetingData) {
  return api.post("/meetings/", meetingData);
}
