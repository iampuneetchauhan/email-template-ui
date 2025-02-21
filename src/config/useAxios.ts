import axios, {CreateAxiosDefaults} from "axios";
import { Constants } from "../constants/Constants";

const clientConfig: CreateAxiosDefaults = {
    baseURL: Constants.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
}

export const useAxios = () => {
    const axiosInstance = axios.create(clientConfig);
    return {axiosInstance};
}