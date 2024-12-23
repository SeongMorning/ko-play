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
    </>
  );
};

export default OpenViduVideo;
