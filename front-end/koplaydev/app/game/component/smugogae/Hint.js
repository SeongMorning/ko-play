"use client";
import { useEffect, useRef } from "react";

export default function Hint({ hint, rate = 1.0 }) {
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (hint) {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(hint);
      utterance.lang = "ko-KR";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    }
  }, [hint, rate]);

  return null;
}
