import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import logo from "../../assets/svg/logo.svg";
import pageLinks from "../../constants/links";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
// import { CustomCursorContext } from '../../context/CustomCursorContext';

interface Props {
  // TODO: move to zustand
  // toggleSideBar: () => void;
}

const Navbar: React.FC<Props> = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState("");

  // const { setType } = useContext(CustomCursorContext);

  // TODO: fix this function and event listener
  // const handleScroll = () => {
  //   let prevScroll = window.pageYOffset;

  //   window.onscroll = () => {
  //     const currentScroll = window.pageYOffset;

  //     if (prevScroll < currentScroll) {
  //       setScrolled('scrolledDown');
  //     } else if (prevScroll > currentScroll) {
  //       setScrolled('');
  //     } else {
  //       setScrolled('');
  //     }

  //     prevScroll = currentScroll;
  //   };
  // };

  useEffect(() => {
    let prevScroll = window.pageYOffset;

    window.onscroll = () => {
      const currentScroll = window.pageYOffset;

      if (prevScroll < currentScroll) {
        setScrolled("scrolledDown");
      } else if (prevScroll > currentScroll) {
        setScrolled("");
      } else {
        setScrolled("");
      }

      prevScroll = currentScroll;
    };

    return () => {
      // window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (!navRef.current) throw Error("divRef is not assigned");

    gsap.to(navRef.current, { duration: 0.3, opacity: 1 });
  }, []);

  return (
    <header ref={navRef} className={styles.container}>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolledDown : ""}`}
      >
        <div className={styles["nav-logo"]}>
          <a
            href="/"
            className={styles["nav-links"]}
            // onMouseEnter={() => setType('hover')}
            // onMouseLeave={() => setType('default')}
          >
            <img src={logo.src ?? ""} alt="web dev" />
          </a>
        </div>
        {/* TODO: Add toggle sidebar on click */}
        <button
          type="button"
          className={styles["toggle-btn"]}
          onClick={() => console.log("add sidebar toggle on click")}
        >
          <AiOutlineMenu />
        </button>
        <ul className={styles["nav-links"]}>
          {pageLinks.map((link: { id: number; url: string; text: string }) => (
            <li
              key={link.id}
              // onMouseEnter={() => setType('hover')}
              // onMouseLeave={() => setType('default')}
            >
              <a href={link.url}>
                <span className={styles["link-number"]}>0{link.id - 1}. </span>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
