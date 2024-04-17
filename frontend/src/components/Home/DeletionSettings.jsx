import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";

function DeletionSettings({ deletePW, setDeletePW, setShowDelete }) {
  const { deleteUser, deleteLoading } = useAuthContext();

  return (
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
        autoFocus
      />
      <div className="SettingsBtns">
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
  );
}

export default DeletionSettings;
