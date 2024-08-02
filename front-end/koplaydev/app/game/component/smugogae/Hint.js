"use client";
import { useEffect } from "react";

export default function Hint({ hint, rate = 1.0 }) {
  useEffect(() => {
    if (hint) {
      const utterance = new SpeechSynthesisUtterance(hint);
      utterance.lang = "ko-KR";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  }, [hint, rate]);

  return <p>{hint}</p>;
}
