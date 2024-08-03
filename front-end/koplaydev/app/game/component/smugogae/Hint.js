"use client";
import { useEffect, useRef } from "react";

export default function Hint({ hint, rate = 1.0, playHint }) {
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (playHint && hint) {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(hint);
      utterance.lang = "ko-KR";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    }
  }, [playHint, hint, rate]);

  return null;
}
