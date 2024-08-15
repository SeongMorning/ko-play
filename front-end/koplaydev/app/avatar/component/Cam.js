"use client";

import { forwardRef, useEffect, useRef } from "react";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

// props : left, top, width
const Cam = forwardRef((props, ref) => {
  const pathName = usePathname();
  const filePath = useSelector((state) => state.currentAvatar)
  return (
    <div
      style={{
        position: "relative",
        left: props.left,
        top: props.top,
        width: props.width,
        height: props.height,
        right: props.right,
        bottom: props.bottom,
        zIndex: 30,
      }}
      ref={ref}
    >
      <Webcam
        mirrored="false"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {(pathName === "/avatar" || pathName === "/game/4" ) && props.isAvatar? (
        <img className={styles.img} src={filePath}
        style={{
          top : filePath.includes("Hat") ? "10%" : "30%"
        }}/>
      ) : null}
    </div>
  );
});

export default Cam;
