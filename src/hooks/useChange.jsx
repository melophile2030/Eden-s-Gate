import { useState} from "react";
import { useNavigate } from "react-router-dom";
export const useChange = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = sessionStorage.getItem("authToken");

      const response = await fetch(
        "https://temple.hexalinks.in/api/change_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: password,
            new_confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data?.success) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("tokenExpiry");
        alert("Password changed successfully");
        navigate("/login", { replace: true });
      } else {
        alert(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  }
  return {
    currentPassword,
    setCurrentPassword,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
