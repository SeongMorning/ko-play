"use client";
import { useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = async () => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY}`;
    const data = {
      input: {
        text: text,
      },
      voice: {
        languageCode: "ko-KR",
        name: "ko-KR-Neural2-c",
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
      console.log(audioContent);
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Text to Speech</h2>
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text to convert to speech"
      />
      <button onClick={handleButtonClick}>Convert and Play Speech</button>
    </div>
  );
}
