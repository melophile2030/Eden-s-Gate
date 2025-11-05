import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useRef, useEffect } from "react";
export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
  
  const dropdownRef = useRef(null);

  

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }
  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <>
      <header>
        <div className={styles.navbar}>
          <div className={styles.le}>
            <Link to="#">Home</Link>
          </div>
          <div className={styles.re}>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/customer">Customer</Link></li>
              <li>
                <Link to="/details">Details</Link>
              </li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li className={styles.dropdownBtnContainer} ref={dropdownRef}>
                <button onClick={toggleMenu} className={styles.dropdownBtn}>
                  <img src="down.png" alt="Dropdown" />
                </button>

                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/change-password">Change Password</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
