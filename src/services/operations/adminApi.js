import toast from "react-hot-toast";
import { adminApiEndpoints} from "../apis";
import { apiConnector } from "../apiConnector";

export async function getAllPlayersData(getCurrentPageNumber) {
    const toastId = toast.loading("Finding Players details");
    let result=[];
    try {
        const response = await apiConnector("GET", adminApiEndpoints.ADMIN_PLAYER_DETAILS_API,null,null,{pageNo:getCurrentPageNumber})
        result = response?.data;
    } catch (error) {
        console.error("Login API Error:", error.response ? error.response.data : error.message);
        toast.error(error?.response?.data?.message)
    }

    toast.dismiss(toastId);
    // dispatch(setLoginLoading(false));
    return result;
}

export async function updatePlayerStatus(playerId) {
    const toastId = toast.loading("Updating User Status");
    let result=[];
    try {
        const response = await apiConnector("PUT", adminApiEndpoints.ADMIN_PLAYER_STATUS_API,null,null,{playerId})
        result = response;
    } catch (error) {
        console.error("Login API Error:", error.response ? error.response.data : error.message);
        toast.error(error?.response?.data?.message)
    }

    toast.dismiss(toastId);
    // dispatch(setLoginLoading(false));
    return result;
}