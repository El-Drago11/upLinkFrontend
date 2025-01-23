const BASE_URL = import.meta.env.VITE_BASE_URL

export const settingsEndpoints = {
    RESETPASSWORD_API : BASE_URL+"/auth/reset-password",
    SIGNUP_API : BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

export const adminApiEndpoints = {
    ADMIN_PLAYER_DETAILS_API : BASE_URL+"/admin/getAllPlayer"
}