"use client";

import { forwardRef, useEffect, useRef } from "react";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import
import { useSelector } from "react-redux";
import FaceDetection, { initWebcamAndModel } from "@/app/utils/AR/script";

// props : left, top, width
const Cam = forwardRef((props, ref) => {
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
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <img className={styles.img} src="/jamini-mask.jpg" />
    </div>
  );
});

export default Cam;
