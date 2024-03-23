import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Settings.css";

function Settings() {
  const {
    setShowSettings,
    getUserData,
    user,
    deleteUser,
    deleteLoading,
    updateUser,
    updateLoading,
    updatePassword,
  } = useAuthContext();
  const [showPwSettings, setShowPwSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePW, setDeletePW] = useState();
  const [updatePw, setUpdatePw] = useState();

  const handleUpdatePw = (e) => {
    setUpdatePw({ ...updatePw, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="SettingsWrapper">
      {!showPwSettings ? (
        !showDelete ? (
          <form
            className="Settings"
            onSubmit={(e) => {
              e.preventDefault();
              const nameInput = document.querySelector("#newName");
              if (nameInput.value === "") {
                nameInput.value = nameInput.defaultValue;
              }
              const emailInput = document.querySelector("#newEmail");
              if (emailInput.name === "") {
                emailInput.value = emailInput.defaultValue;
              }
              updateUser({
                [nameInput.name]: nameInput.value,
                [emailInput.name]: emailInput.value,
              });
            }}
          >
            <h2>Settings - Generals</h2>
            <input
              type="text"
              name="newName"
              id="newName"
              placeholder="new username.."
              defaultValue={user?.userName}
              required
            />
            <input
              type="email"
              name="newEmail"
              id="newEmail"
              placeholder="new e-mail.."
              defaultValue={user?.userEmail}
              required
            />
            <div className="SettingsBtns">
              <button type="submit">
                {updateLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                    >
                      <path
                        strokeDasharray={60}
                        strokeDashoffset={60}
                        strokeOpacity={0.3}
                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="1.3s"
                          values="60;0"
                        ></animate>
                      </path>
                      <path
                        strokeDasharray={15}
                        strokeDashoffset={15}
                        d="M12 3C16.9706 3 21 7.02944 21 12"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.3s"
                          values="15;0"
                        ></animate>
                        <animateTransform
                          attributeName="transform"
                          dur="1.5s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        ></animateTransform>
                      </path>
                    </g>
                  </svg>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button type="button" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
            </div>
            <div className="SettingsBtns" style={{ marginTop: "0" }}>
              <button type="button" onClick={() => setShowPwSettings(true)}>
                Change Password
              </button>
              <button
                type="button"
                style={{ color: "red" }}
                onClick={() => setShowDelete(true)}
              >
                Delete Account
              </button>
            </div>
          </form>
        ) : (
          //____________________delete account_________________________________
          <form
            className="Settings"
            onSubmit={(e) => {
              e.preventDefault();
              deleteUser(deletePW);
            }}
          >
            <h2>Delete account</h2>
            <p>Are you sure you want to delete your account?</p>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={""}
              placeholder="Validate with password here.."
              autoComplete="on"
              required
              onChange={(e) => setDeletePW({ password: e.target.value })}
            />
            <div className="SettingsBtns">
              {" "}
              <button type="submit" style={{ color: "red" }}>
                {deleteLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                    >
                      <path
                        strokeDasharray={60}
                        strokeDashoffset={60}
                        strokeOpacity={0.3}
                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="1.3s"
                          values="60;0"
                        ></animate>
                      </path>
                      <path
                        strokeDasharray={15}
                        strokeDashoffset={15}
                        d="M12 3C16.9706 3 21 7.02944 21 12"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.3s"
                          values="15;0"
                        ></animate>
                        <animateTransform
                          attributeName="transform"
                          dur="1.5s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        ></animateTransform>
                      </path>
                    </g>
                  </svg>
                ) : (
                  "Submit action"
                )}
              </button>
              <button type="button" onClick={() => setShowDelete(false)}>
                Cancel
              </button>
            </div>
          </form>
        )
      ) : (
        //_____________________change password_________________________________
        <form
          className="Settings"
          onSubmit={(e) => {
            e.preventDefault();
            updatePassword(updatePw);
          }}
        >
          <h2>Settings - Password </h2>
          <input
            type="password"
            name="oldPassword"
            id="password"
            defaultValue={""}
            placeholder="Old password.."
            required
            onChange={handleUpdatePw}
          />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            defaultValue={""}
            placeholder="New password.."
            required
            onChange={handleUpdatePw}
          />
          <div className="SettingsBtns">
            <button type="submit">
              {updateLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                  >
                    <path
                      strokeDasharray={60}
                      strokeDashoffset={60}
                      strokeOpacity={0.3}
                      d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="1.3s"
                        values="60;0"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray={15}
                      strokeDashoffset={15}
                      d="M12 3C16.9706 3 21 7.02944 21 12"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.3s"
                        values="15;0"
                      ></animate>
                      <animateTransform
                        attributeName="transform"
                        dur="1.5s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      ></animateTransform>
                    </path>
                  </g>
                </svg>
              ) : (
                "Save Changes"
              )}
            </button>
            <button type="button" onClick={() => setShowPwSettings(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Settings;
