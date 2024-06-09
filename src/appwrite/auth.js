import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
import axios from "axios";
import Cookies from "js-cookie";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ username, email, password,phoneNumber
   }) {
    try {
      // Code for Appwrite backend

      // const userAccount = await this.account.create(
      //   ID.unique(),
      //   email,
      //   password,
      //   username
      // );
      // if (userAccount) {
      //   return this.login({ email, password });
      // } else {
      //   return userAccount;
      // }

      //  Code for my own backend

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          fullname: "Kunal Sing",
          username,
          email,
          password,
          phoneNumber,
        }
      );
      if (response.data.statusCode === 201) {
        // If registration is successful, log in the user
        const rsp2 = await this.login({ email, password });
        return rsp2;
      } else {
        throw new Error("User registration failed");
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // Code for Appwrite backend

      // return await this.account.createEmailPasswordSession(email, password);

      // Code for my own backend

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      const { accessToken, refreshToken } = response.data.data;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      return response;
    } catch (error) {
      console.log("Appwrite serive :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      // Code for Appwrite backend

      // return await this.account.get();

      // Code for my own backend

      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      // Code for Appwrite backend

      // await this.account.deleteSessions();

      // Code for my own backend

      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      localStorage.removeItem("userData");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return response;
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    try {
      // Code for Appwrite backend

      // return await this.account.updateEmail(email);

      // Code for my own backend

      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/changePassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("Appwrite serive :: changePassword :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
