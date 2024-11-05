import api from "./api";

export function AddCaseManagers (data) {
    return api.post('/case_manager/', data)
}