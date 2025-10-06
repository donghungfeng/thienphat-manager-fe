export const STATUS_LIST = [
  {
    code: "ON_HOLD",
    name: "On hold",
  },
  {
    code: "IN_PROGRESS",
    name: "In progress",
  },
  {
    code: "COMPLETED",
    name: "Completed",
  },
  {
    code: "CANCELED",
    name: "Canceled",
  },
];
export const STATUS = {
  ON_HOLD: "ON_HOLD",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED"
};
export const LOG_WORK_STATUS = {
  INVALID: "INVALID",
  VALID: "VALID",
  EXPLANATION: "EXPLANATION"
}
export const OPERATIONS = {
  DELETE: "/delete",
  SEARCH: "/search",
  UPDATE: "/update",
  DETAILS: "/details",
  CREATE: "/create",
  ADD: "/add",
  UPLOAD: "/upload",
  DOWNLOAD: "/download",
  UPDATELOGO: "/updatelogo",
};

export const API_V1 = "api/v1/"
export const USER_CONTROLLER = "user"
export const COMPANY_CONTROLLER = "company"
export const DEPARTMENT_CONTROLLER = "department"