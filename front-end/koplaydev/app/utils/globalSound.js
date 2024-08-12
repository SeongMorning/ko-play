// components/GlobalSound.js
"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function GlobalSound({ src, volume = 1, fadeoutTime = 0 }) {
  const soundRef = useRef(null);

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src,
        volume,
        loop: true, // 음악이 반복되도록 설정
      });
      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, [src, volume, fadeoutTime]);

  return null; // UI에 아무것도 렌더링하지 않음
}
