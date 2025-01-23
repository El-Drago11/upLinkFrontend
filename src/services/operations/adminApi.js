import toast from "react-hot-toast";
import { adminApiEndpoints} from "../apis";
import { apiConnector } from "../apiConnector";

export async function getAllPlayersData() {
    const toastId = toast.loading("Finding Players details");
    let result=[];
    try {
        const response = await apiConnector("GET", adminApiEndpoints.ADMIN_PLAYER_DETAILS_API)
        result = response?.data?.data;
    } catch (error) {
        console.error("Login API Error:", error.response ? error.response.data : error.message);
        toast.error(error?.response?.data?.message)
    }

    toast.dismiss(toastId);
    // dispatch(setLoginLoading(false));
    return result;
}