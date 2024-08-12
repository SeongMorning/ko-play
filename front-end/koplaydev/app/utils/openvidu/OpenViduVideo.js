import { useRef, useEffect } from 'react';
import styles from "./OpenViduVideo.module.scss";

const OpenViduVideo = ({ streamManager }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    return <video className={styles.video} autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideo;
