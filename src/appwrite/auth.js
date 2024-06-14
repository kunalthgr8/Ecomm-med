import conf from "../conf/conf.js";
import axios from "axios";
import Cookies from "js-cookie";

export class AuthService {
  constructor() {
    // Initialization logic can be added here if needed
  }

  async createAccount({ fullname, email, password, phoneNumber }) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          fullname,
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      console.log("AuthService :: login :: response", response);
      const { accessToken, refreshToken } = response.data.data;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      return response;
    } catch (error) {
      console.log("AuthService :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
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
      console.log("AuthService :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
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
      console.log("AuthService :: logout :: error", error);
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    try {
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
      console.log("AuthService :: changePassword :: error", error);
    }
  }

  async changeUserDetails({ fullname, email, phoneNumber, gender }) {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log("from AuthService", fullname, email, phoneNumber, gender);
      const response = await axios.put(
        "http://localhost:8000/api/v1/users/updateUserDetails",
        {
          fullname,
          email,
          phoneNumber,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("AuthService :: changeDetails :: error", error);
    }
  }

  async updateUserLocationDetails({ address, city, pincode, district }) {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log("from AuthService", address, city, pincode, district)
      console.log("from AuthService", accessToken)
      const response = await axios.put(
        "http://localhost:8000/api/v1/users/updateLocationDetails",
        {
          address,
          city,
          pincode,
          district,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(
        "AuthService :: updateUserLocationDetails :: error",
        error
      );
    }
  }
}

const authService = new AuthService();

export default authService;
