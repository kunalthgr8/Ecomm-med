import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import authService from "../../appwrite/auth.js";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    if (
      data.oldPassword === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      setTimeout(() => {
        setError("Please fill all the fields");
      }, 1000);
      setError("");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      setTimeout(() => {
        setError("Password does not match");
      }, 1000);
      setError("");
      return;
    }
    const resp = await authService.changePassword(data);
    if (resp.data.statusCode === 200) {
      navigate("/user");
    } else {
      setTimeout(() => {
        setError("Something went wrong! Please try again.");
      }, 1000);
      setError("");
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-center m-10 gap-10">
        <div className="flex flex-col gap-5 w-4/5 lg:w-2/3">
          <h1>Change Password</h1>
          <div className="flex flex-col w-full lg:w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
            <div className="w-full flex flex-row">
              <div className="flex flex-col w-full gap-3">
                <h1 className="text-sm text-heading-color font-semibold">
                  Change Password
                </h1>
                <h1 className="text-logout-color">{error}</h1>
                <div className="flex flex-col p-3 gap-2">
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-button-color">
                      OLD PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="Old Password"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          oldPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-button-color">
                      NEW PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="New Password"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-button-color">
                      CONFIRM PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-right">
              <Button
                width="flex justify-end"
                className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
                onClick={handleSubmit}
              >
                Change Password
                <MdModeEdit className="flex justify-center self-center" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
