"use client";
import { useEffect, useRef } from "react";

export default function Hint({ hint, rate = 1.0, volume = 1.0, playHint, onEnd }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (playHint && hint) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(`data:audio/mp3;base64,${hint}`);
      audioRef.current = audio;
      audio.playbackRate = rate;
      audio.volume = volume;
      audio.onended = onEnd;
      audio.play();
    }
  }, [playHint, hint, rate, onEnd]);

  return null;
}
