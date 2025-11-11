import styles from "../styles/Home.module.css";
function Home() {
  return (
      <>
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
        </div>
      </>
  );
}

export default Home;
