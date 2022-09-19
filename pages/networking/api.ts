import axios from "axios";
import { Auth } from "../models/auth";
import { serverHost, registerUser } from '../api/utils';

const client = axios.create({
    baseURL: serverHost,
    responseType: "json",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
});

const auth = () => {
    return {
        async login(credential: Auth) {
            return await client.post(registerUser, credential);
        },
    };
};

const authAPI = auth();

export { authAPI };
export default client;