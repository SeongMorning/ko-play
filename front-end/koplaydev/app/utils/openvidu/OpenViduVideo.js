import { useRef, useEffect } from "react";
import styles from "./OpenViduVideo.module.scss";
import { useFaceMask } from "../AR/useFaceMask";
import { useStream } from "./useStream";

const OpenViduVideo = ({ streamManager, avatarPath }) => {
  const { videoRef, speaking, micStatus, videoStatus } =
    useStream(streamManager);
  const canvasRef = useRef(null);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      <video className={styles.video} autoPlay={true} ref={videoRef} />;
      <canvas
        id="faceCanvas"
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          borderRadius: "10px",
        }}
      />
    </>
  );
};

export default OpenViduVideo;
