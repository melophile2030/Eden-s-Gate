import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
function Home() {
  const [showMenu, setShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

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
  return (
    <div>
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
      <main>
        <div className={styles.mainContainer}>
          <img src="/eden's-gate-logo.png" alt="logo" className={styles.logo} />

          <h1>The Project At The Eden's Gate</h1>
          <p className={styles.quoteText}>
            "I saw when the Lamb opened the First Seal, and I heard as it were
            the noise of thunder, one of the four beasts say, come and see… and
            I saw, and behold it was a white horse… and Hell followed with him.
            God will not let you take me."
          </p>
          <h3>-Joseph Seed</h3>
          <Link to="#" className={styles.getStartedButton}>
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
