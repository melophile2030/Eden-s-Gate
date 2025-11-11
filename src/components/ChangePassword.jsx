import styles from "../styles/ChangePassword.module.css";
import { useState } from "react";
import { useChange } from "../hooks/useChange"; 

function ChangePassword() {


  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {currentPassword,
    setCurrentPassword,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,}= useChange();

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
