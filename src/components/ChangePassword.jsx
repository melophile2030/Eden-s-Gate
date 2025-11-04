import styles from "./ChangePassword.module.css";
import { useState } from "react";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

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
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        alert("Password changed successfully ✅");
      } else {
        alert(data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error ❌");
    }
  }

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUp}>
        <h2 className={styles.signUpTitle}>CHANGE PASSWORD</h2>

        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.signUpField}>
            <input
              type={showCurrentPass ? "text" : "password"}
              placeholder="Your Current Password"
              className={styles.signUpBox}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
            >
              {showCurrentPass ? "🐵" : "🙈"}
            </button>
          </div>

          <div className={styles.signUpField}>
            <input
              type={showNewPass ? "text" : "password"}
              placeholder="Create New Password"
              className={styles.signUpBox}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowNewPass(!showNewPass)}>
              {showNewPass ? "🐵" : "🙈"}
            </button>
          </div>

          <div className={styles.signUpField}>
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Re-enter New Password"
              className={styles.signUpBox}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? "🐵" : "🙈"}
            </button>
          </div>

          <button type="submit" className={styles.submitButton}>
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
