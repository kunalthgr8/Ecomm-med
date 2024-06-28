import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import authService from "../../appwrite/auth.js";
import { MdModeEdit } from "react-icons/md";

function ChangePassword() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setError("");

    if (
      data.oldPassword === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      return setError("Please fill all the fields");
    }

    if (data.newPassword !== data.confirmPassword) {
      return setError("Password does not match");
    }

    try {
      setLoading(true);
      await authService.changePassword(data);
      navigate("/user");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
                {error && <h1 className="text-logout-color">{error}</h1>}
                <div className="flex flex-col p-3 gap-2">
                  <div className="flex flex-col pb-3 gap-1">
                    <p className="text-sm font-medium text-button-color">
                      OLD PASSWORD
                    </p>
                    <Input
                      type="password"
                      placeholder="Old Password"
                      value={data.oldPassword}
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
                      value={data.newPassword}
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
                      value={data.confirmPassword}
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
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
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
