import socialLinks from "../../constants/social_links";
import logo from "../../assets/svg/logo.svg";

import styles from "./Footer.module.css";
import { useUiStore } from "@stores/cursor.store";

const Footer: React.FC = () => {
  const setCursorType = useUiStore((state) => state.setCursorType);

  return (
    <footer className={styles.footer}>
      <ul className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <li key={link.id} className={styles.socialLink}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.logo}>
        <a
          href="#hero"
          aria-label="Back to top"
          onMouseEnter={() => {
            setCursorType("hover");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
          <img
            src={logo.src}
            alt="web dev"
            loading="lazy"
          />
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
