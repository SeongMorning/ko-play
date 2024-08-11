"use client";
import { useEffect } from "react";

export default function TextToSpeech({ text, languageCode, modelName }) {
  useEffect(() => {
    const handleButtonClick = async () => {
      const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TEXT_TO_SPEECH_KEY}`;
      const data = {
        input: {
          text: text,
        },
        voice: {
          languageCode: languageCode,
          name: modelName,
          ssmlGender: "MALE",
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      };
      const otherparam = {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
        method: "POST",
      };

      try {
        const response = await fetch(url, otherparam);
        const result = await response.json();
        const audioContent = result.audioContent;
        if (audioContent) {
          const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
          audio.play();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleButtonClick();
  }, [text, languageCode, modelName]);

  return null;
}
