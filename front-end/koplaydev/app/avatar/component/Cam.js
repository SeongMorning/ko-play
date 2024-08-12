"use client";

import { forwardRef } from "react";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import
import { useSelector } from "react-redux";

// props : left, top, width
const Cam = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Webcam
        className={styles.webcam}
        style={{
          left: props.left,
          top: props.top,
          width: props.width,
          height: props.height,
          right: props.right,
          bottom: props.bottom,
        }}
      />
    </div>
  );
});

export default Cam;
