"use client";
import Link from "next/link";
import React, { useState, useContext } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode } = useContext(ThemeContext);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        ChainChronicles
      </Link>
      <div
        className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.openMenu : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        role="button"
        aria-label="Toggle Menu"
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={styles.links + " " + (isMenuOpen ? styles.showMenu : "")} style={{ backgroundColor: mode === "light" ? "white" : "#111" }}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
