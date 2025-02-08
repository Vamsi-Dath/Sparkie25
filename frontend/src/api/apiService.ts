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

export const authSession = async () => {
  try {
    const response = await api.get("signin", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Session error:", error);
    throw error;
  }
};

export const signout = async () => {
  try {
    const response = await api.delete("signin", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Session error:", error);
    throw error;
  }
};

export const chatbot = async (message: string) => {
  try {
    const response = await api.post("chatbot", { message });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Chatbot error:", error);
    throw error;
  }
};

export const allchat = async () => {
  try {
    const response = await api.get("allchat");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Allchat error:", error);
    throw error;
  }
}