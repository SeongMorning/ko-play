"use client";

import { useState, useEffect, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import UserVideo from "./UserVideo";
import { useSelector } from "react-redux";
import styles from "./OpenVidu.module.scss";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "https://i11b302.p.ssafy.io/openvidu/" : "https://demos.openvidu.io/";

export default function OpenViduItem() {
  //   const [mySessionId, setMySessionId] = useState("");
  const roomId = useSelector((state) => state.roomId);
  const [myUserName, setMyUserName] = useState(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session]);

  useEffect(() => {
    joinSession();
  }, []);

  const joinSession = async () => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscriber(subscriber);

      subscriber.on("videoElementCreated", (event) => {
        const videoElement = event.element;
      });
    });

    mySession.on("streamDestroyed", (event) => {
      setSubscriber(null);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    const token = await getToken();
    mySession
      .connect(token, { clientData: myUserName })
      .then(async () => {
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        publisher.on("videoElementCreated", function (event) {
          const videoElement = event.element;
          videoElement["muted"] = true;
        });

        mySession.publish(publisher);

        const devices = await OV.getDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const currentVideoDevice = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );

        setSession(mySession);
        setMainStreamManager(publisher);
        setPublisher(publisher);
        setCurrentVideoDevice(currentVideoDevice);
      })
      .catch((error) => {
        console.error(
          "Error connecting to the session:",
          error.code,
          error.message
        );
      });
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setSubscriber(null);
    // setMySessionId("");
    setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
    setMainStreamManager(null);
    setPublisher(null);
  };

  const getToken = async () => {
    const sessionId = await createSession(roomId);
    return await createToken(sessionId);
  };

  // const createSession = async (sessionId) => {
  //   const response = await axios.post(
  //     `${APPLICATION_SERVER_URL}api/sessions`,
  //     { customSessionId: sessionId },
  //     {
  //       headers: { "Authorization": "Basic " + btoa("OPENVIDUAPP:koplay"),
  //         "Content-Type": "application/json" },
  //     }
  //   );
  //   return response.data;
  // };

  const createSession = async (sessionId) => {
    try {
      // 세션이 이미 존재하는지 확인
      await axios.get(`${APPLICATION_SERVER_URL}api/sessions/${sessionId}`, {
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:koplay"),
          "Content-Type": "application/json",
        },
      });
      // 세션이 존재하면 세션 ID 반환
      return sessionId;
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 409)) {
        // 세션이 존재하지 않으면 새로 생성
        const response = await axios.post(
          `${APPLICATION_SERVER_URL}api/sessions`,
          { customSessionId: sessionId },
          {
            headers: {
              Authorization: "Basic " + btoa("OPENVIDUAPP:koplay"),
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } else {
        throw error;
      }
    }
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connection`,
      {},
      {
        headers: { "Authorization": "Basic " + btoa("OPENVIDUAPP:koplay"),
          "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  return (
    <div className={styles.main}>
      {session && (
        <>
          {publisher && (
            <div className={styles.publish}> 
              <UserVideo streamManager={publisher} />
            </div>
          )}
          {subscriber && (
            <div className={styles.subscriber}>
              <UserVideo streamManager={subscriber} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
