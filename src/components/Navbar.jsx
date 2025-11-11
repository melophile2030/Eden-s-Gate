import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useState, useRef, useEffect } from "react";
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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
    // Clear all auth-related data
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiry");

    // Close the dropdown menu
    setShowMenu(false);

    // Navigate to login page
    navigate("/login", { replace: true });
  }

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

  function handleLinkClick() {
    setShowMenu(false);
  }
  return (
    <main>
      <header>
        <div className={styles.navbar}>
          <div className={styles.le}>
            <Link to="/home">Home</Link>
          </div>
          <div className={styles.re}>
            <ul className={styles.navLinks}>
              <li className={styles.desktopOnly}>
                <Link to="/products">Products</Link>
              </li>
              <li className={styles.desktopOnly}>
                <Link to="/customer">Customer</Link>
              </li>
              <li className={styles.desktopOnly}>
                <Link to="/details">Details</Link>
              </li>
              <li className={styles.desktopOnly}>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li className={styles.dropdownBtnContainer} ref={dropdownRef}>
                <button onClick={toggleMenu} className={styles.dropdownBtn}>
                  <img src={showMenu ? "down.png" : "down.png"} alt="Menu" />
                </button>
                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.mobileOnly}>
                      <Link to="/products" onClick={handleLinkClick}>
                        Products
                      </Link>
                      <Link to="/customer" onClick={handleLinkClick}>
                        Customer
                      </Link>
                      <Link to="/details" onClick={handleLinkClick}>
                        Details
                      </Link>
                      <Link to="/pricing" onClick={handleLinkClick}>
                        Pricing
                      </Link>
                    </div>
                    {window.innerWidth <= 900 && (
                      <div className={styles.menuDivider}></div>
                    )}
                    <Link to="/change-password" onClick={handleLinkClick}>
                      Change Password
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </main>
  );
}
