import styles from "./Header.module.css";
import igniteLogo from "../assets/ignite-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logo Ignite" />
      <p className={styles.title}>Ignite Feed</p>
    </header>
  );
}
