import axios from "axios";
import { SigninData } from "./apiTypes";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

// Sends google signin data to server
export const sendSigninData = async (payload: SigninData) => {
  try {
    const response = await api.post("signin", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Sign in error:", error);
    throw error;
  }
};
