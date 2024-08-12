"use client";

import { forwardRef, useEffect, useRef } from "react";
import styles from "./Cam.module.scss";
import Webcam from "react-webcam"; // react-webcam import
import { useSelector } from "react-redux";
import FaceDetection, { initWebcamAndModel } from "@/app/utils/AR/script";

// props : left, top, width
const Cam = forwardRef((props, ref) => {
  const webcamRef = useRef(null);
  const handleInit = (videoElement) => {
    initWebcamAndModel(videoElement);
  };

  useEffect(() => {
    if (webcamRef.current) {
      handleInit(webcamRef.current.video);
    }
  }, [webcamRef]);

  return (
    <div ref={ref}>
      <Webcam
        ref={webcamRef}
        className={styles.webcam}
        style={{
          left: props.left,
          top: props.top,
          width: props.width,
          height: props.height,
          right: props.right,
          bottom: props.bottom,
          zIndex: 1,
        }}
      />
      {webcamRef.current && webcamRef.current.video && (
        <FaceDetection videoElement={webcamRef.current.video} />
      )}
    </div>
  );
});

export default Cam;
