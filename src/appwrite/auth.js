import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
import axios from "axios";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ username, email, password }) {
    try {
      console.log("AuthService :: createAccount 111111111 :: data", {
        username,
        email,
        password,
      });
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      console.log("AuthService :: createAccount  222222222222:: data", {
        username,
        email,
        password,
      });
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/users/register",
      //   {
      //     fullname: "Kunal Sing",
      //     username,
      //     email,
      //     password,
      //   }
      // );

      // if (response.status === 201) {
      //   // If registration is successful, log in the user
      //   return this.login({ email, password });
      // } else {
      //   throw new Error("User registration failed");
      // }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/users/login",
      //   {
      //     email,
      //     password,
      //   }
      // );
      // return response;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/users/logout"
      // );
      // return response;
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
