import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ If already logged in (and token still valid), skip login page
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const expiry = sessionStorage.getItem("tokenExpiry");
    if (token && expiry && Date.now() < parseInt(expiry, 10)) {
      navigate("/home");
    }
  }, [navigate]);

  async function postData(event) {
    event.preventDefault();
    setError("");

    // ✅ Clear old session before new login
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiry");

    try {
      const response = await fetch("https://temple.hexalinks.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed ");
      }

      if (data?.data?.token) {
        // ✅ Store token in sessionStorage
        sessionStorage.setItem("authToken", data.data.token);

        // ✅ Set token expiry 
        const expiresAt = Date.now() + 1 * 60 * 1000;
        sessionStorage.setItem("tokenExpiry", expiresAt.toString());

        navigate("/home");
      } else {
        setError("Invalid email or password");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to login. Please try again.");
      setPassword("");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <input
              type={showPassword ? "text" : "password"}
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
              {showPassword ? "🐵" : "🙈"}
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
