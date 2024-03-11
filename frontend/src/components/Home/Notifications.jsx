import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Notifications.css";

function Notifications() {
  const { noticMsg, setNoticMsg } = useAuthContext();
  useEffect(() => {}, []);

  useEffect(() => {
    const content = document.querySelector(".Notifications");
    content.style.width = "0";
    const delay1 = setTimeout(() => {
      content.style.width = "30vw";
    }, 100);
    const delay2 = setTimeout(() => {
      content.style.width = "0";
    }, 7000);
    const delay3 = setTimeout(() => {
      setNoticMsg("");
    }, 8000);
    return () => {
      clearTimeout(delay1, delay2, delay3);
    };
  }, [setNoticMsg]);
  return (
    <div className="Notifications">
      <div className="notifWrapper">{noticMsg}</div>
    </div>
  );
}

export default Notifications;
