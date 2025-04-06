import socialLinks from "../../constants/social_links";

import styles from "./Footer.module.css";
import { useUiStore } from "@stores/cursor.store";

const Footer: React.FC = () => {
  const setCursorType = useUiStore((state) => state.setCursorType);

  return (
    <footer className={styles.footer}>
      <ul className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <li key={link.id} className={styles.socialLink}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.logo}>
        <a
          href="#hero"
          onMouseEnter={() => {
            setCursorType("hover");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
          <img src={`/public/svg/logo.svg`} alt="web dev" />
        </a>
      </div>
      <h4 className={styles.copyright}>
        designed & built by <span> nicolás di rago</span>
      </h4>
      <h4 className={styles.copyright}>
        copyright &copy; {new Date().getFullYear()}
      </h4>
    </footer>
  );
};

export default Footer;
