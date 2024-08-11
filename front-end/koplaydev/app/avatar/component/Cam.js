"use client";

import { forwardRef } from "react";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import

// props : left, top, width
const Cam = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{width : props.width, height : props.height}}>
      <Webcam
        className={styles.webcam}
        style={{
          left: props.left,
          top: props.top,
          width: "100%",
          height: "80%",
          right: props.right,
          bottom: props.bottom,
        }}
      />
    </div>
  );
});

export default Cam;
