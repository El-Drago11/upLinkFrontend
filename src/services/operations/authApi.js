import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setGameData, setUser } from "../../Store/profileReducer";
import { setToken } from "../../Store/authReducer";

export async function login(email, password,dispatch,navigate) {
    const toastId = toast.loading("Loging You in..");
    try {
        const response = await apiConnector("POST", settingsEndpoints.LOGIN_API, { email, password })
        if (response && (response.data.user.accountType==="Player" || response.data.user.accountType==="Admin")) {
            toast.success(`Welcome back ${email}`);
            localStorage.setItem("token", JSON.stringify(response.data.user.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem('gameData',JSON.stringify(response.data.user.gameDetails) || null),
            dispatch(setUser(response.data.user))
            dispatch(setToken(response.data.user.token))
            dispatch(setGameData(response.data.user.gameDetails || null))
            if(response.data.user.accountType==="Player"){
                navigate('/BananaGame')
            }   
            if(response.data.user.accountType==="Admin"){
                navigate('admin/dashboard')
            }
        }
    } catch (error) {
        console.error("Login API Error:", error.response ? error.response.data : error.message);
        toast.error(error?.response?.data?.message)
    }

    toast.dismiss(toastId);
    // dispatch(setLoginLoading(false));
    return;
}
export async function signUp(firstName, lastName, email, password, confirmPassword, contactNumber, navigate) {
    // dispatch(setLoading(true));
    const toastId = toast.loading("Signing You up Please wait...")
    try {
        const accountType = "Player"
        const response = await apiConnector("POST", settingsEndpoints.SIGNUP_API, { firstName, lastName, email, password, confirmPassword, accountType, contactNumber })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Congratulation!! on sucessfull Signup..")
        navigate('/')
    } catch (error) {
        console.log("ERor : ", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    // dispatch(setLoading(false))
    return;
}