"use client";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import

// props : left, top, width
export default function Cam(props) {
  return (
    <>
      <Webcam
        className={styles.webcam}
        style={{ left: props.left, top: props.top, width: props.width, right: props.right, bottom : props.bottom }}
      />
    </>
  );
}
