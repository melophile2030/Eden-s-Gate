import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  async function postData(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("https://temple.hexalinks.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (data?.data?.token) {
        // Store token in sessionStorage instead of localStorage
        sessionStorage.setItem("authToken", data.data.token);

        // Store token expiry (e.g., 24 hours from now)
        const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;
        sessionStorage.setItem("tokenExpiry", expiresAt.toString());

        navigate("/home");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to login. Please try again.");
    }
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h2 className={styles.loginTitle}>LOGIN</h2>
        <form onSubmit={postData} className={styles.loginForm}>
          <div className={styles.inputField}>
            <input
              type="email"
              placeholder="Enter your Email"
              className={styles.inputBox}
              required
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              className={styles.inputBox}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🐵" : "🙈"}{" "}
            </button>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
