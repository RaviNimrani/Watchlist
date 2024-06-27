import { useState } from "react"; // Import useState from React
import styles from "./navbar.module.css"; // Import CSS module
import { Link } from "react-router-dom"; // Import Link for navigation

// Navbar component
export default function Navbar() {
  return (
    <>
      <div className={styles.navbarContainer}>
        {" "}
        {/* Navbar container */}
        <div className={styles.appName}>
          {" "}
          {/* App name */}
          <Link to="/">
            <h2>Movie Watchlist</h2>
          </Link>
        </div>
        <div className={styles.navLinks}>
          {" "}
          {/* Navigation links */}
          <Link href="/">Home</Link>
        </div>
      </div>
    </>
  );
}
