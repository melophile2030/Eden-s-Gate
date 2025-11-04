import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function postData(event) {
    event.preventDefault();
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
      console.log("Response:", data);

      if (data?.data?.token) {
        localStorage.setItem("authToken", data.data.token);
        console.log("AuthToken : ", data.data.token);
        navigate("/home");
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error. Try again later ❌");
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

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
