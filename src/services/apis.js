const BASE_URL = import.meta.env.VITE_BASE_URL

export const settingsEndpoints = {
    RESETPASSWORDTOKEN_API : BASE_URL+"/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL+"/auth/reset-password",
    SIGNUP_API : BASE_URL+"/auth/signup",
    SENDOTP_API : BASE_URL+"/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
}