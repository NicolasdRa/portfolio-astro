import { useRef, useEffect } from "react";
import styles from "./CustomCursor.module.css";
import { useUiStore } from "@stores/cursor.store";
import clsx from "clsx";

const CustomCursor = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const secondaryCursorRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  const type = useUiStore((state) => state.cursorType);
  console.log("🚀 ~ CustomCursor ~ type:", type);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!mainCursorRef.current || !secondaryCursorRef.current) return;

      const mouseX = clientX;
      const mouseY = clientY;

      positionRef.current.mouseX =
        mouseX - secondaryCursorRef.current.clientWidth / 2;
      positionRef.current.mouseY =
        mouseY - secondaryCursorRef.current.clientHeight / 2;

      mainCursorRef.current.style.transform = `translate3d(${
        mouseX - mainCursorRef.current.clientWidth / 2
      }px, ${mouseY - mainCursorRef.current.clientHeight / 2}px, 0)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);

      if (!secondaryCursorRef.current) return;

      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;

      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.07;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.07;

        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.05
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }

      secondaryCursorRef.current.style.transform = `translate3d(${positionRef.current.destinationX}px, ${positionRef.current.destinationY}px, 0)`;
    };

    followMouse();

    return () => {
      cancelAnimationFrame(positionRef.current.key);
    };
  }, []);

  return (
    <div>
      <div className={styles.mainCursor} ref={mainCursorRef}>
        <div className={styles.mainCursorBackground} />
      </div>
      <div className={styles.secondaryCursor} ref={secondaryCursorRef}>
        <div
          className={clsx(styles.secondaryCursorBackground, {
            [styles.cursor]: type === "default",
            [styles.hover]: type === "hover",
            [styles.hoverSocial]: type === "hover-social",
            [styles.hoverName]: type === "hover-name",
          })}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
