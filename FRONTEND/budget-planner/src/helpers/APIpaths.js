export const BASE_URL = "http://127.0.0.1:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
        UPDATE_BUDGET: "/api/v1/auth/budget",
    },

    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        ADD: "/api/v1/income/add",
        GET_ALL: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
    },
    SPENDINGS: {
        ADD_SPENDINGS: "/api/v1/spendings/add",
        GET_ALL_SPENDINGS: "/api/v1/spendings/get",
        DELETE_SPENDINGS: (spendingsId) => `/api/v1/spendings/${spendingsId}`,
        DOWNLOAD_SPENDINGS: "/api/v1/spendings/downloadexcel",
    },
    IMAGE: {
        UPLOAD: "/api/v1/image/upload",
    },
};