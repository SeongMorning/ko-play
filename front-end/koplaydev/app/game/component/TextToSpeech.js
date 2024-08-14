"use client";
import { useEffect } from "react";

export default function TextToSpeech({
  text,
  languageCode,
  modelName,
  gender,
}) {
  useEffect(() => {
    const handleButtonClick = async () => {
      if (!text || !languageCode || !modelName) {
        console.error(
          "Invalid parameters: text, languageCode, or modelName is missing."
        );
        return;
      }
      const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TEXT_TO_SPEECH_KEY}`;
      const data = {
        input: {
          text: text,
        },
        voice: {
          languageCode: languageCode,
          name: modelName,
          ssmlGender: gender,
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
        if (!response.ok) {
          const errorDetail = await response.json();
          console.error("Google TTS API Error:", errorDetail);
          return;
        }
        const result = await response.json();
        const audioContent = result.audioContent;
        if (audioContent) {
          const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
          audio.play();
        } else {
          console.error("No audio content received.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleButtonClick();
  }, [text, languageCode, modelName]);

  return null;
}
