import conf from "../conf/conf.js";
import axios from "axios";
import Cookies from "js-cookie";

const bckndURL= "https://ecomm-med-bcknd.vercel.app";
export class AuthService {
  constructor() {
    // Initialization logic can be added here if needed
  }


  async createAccount({ fullname, email, password, phoneNumber }) {
    try {
      const response = await axios.post(
        `${bckndURL}/api/v1/users/register`,
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
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      throw new Error(errorMessage);
    }
  }

  async login({ email, password }) {
    try {
      const response = await axios.post(
        `${bckndURL}/api/v1/users/login`,
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
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
  }

  async getCurrentUser() {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`${bckndURL}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    return null;
  }

  async logout() {
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/users/logout`,
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
      const errorMessage = error.response?.data?.message || "Logout failed";
      throw new Error(errorMessage);
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${bckndURL}/api/v1/users/changePassword`,
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
      const errorMessage =
        error.response?.data?.message || "Changing Password failed";
      throw new Error(errorMessage);
    }
  }

  async changeUserDetails({ fullname, email, phoneNumber, gender }) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.put(
        `${bckndURL}/api/v1/users/updateUserDetails`,
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
      const errorMessage =
        error.response?.data?.message || "Changing Password failed";
      throw new Error(errorMessage);
    }
  }

  async updateUserLocationDetails({ address, city, pincode, district }) {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.put(
        `${bckndURL}/api/v1/users/updateLocationDetails`,
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
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Changing Password failed";
      throw new Error(errorMessage);
    }
  }

  async updateUserToSeller() {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.put(
        `${bckndURL}/api/v1/users/updateToSeller`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Changing Password failed";
      throw new Error(errorMessage);
    }
  }
}

const authService = new AuthService();

export default authService;
