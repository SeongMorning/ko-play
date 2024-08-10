"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  const googleTranslateElementInit = () => {
    if (!window.google || !window.google.translate) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    if (!document.querySelector("#google_translate_script")) {
      const addScript = document.createElement("script");
      addScript.id = "google_translate_script";
      addScript.setAttribute(
        "src",
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
        // "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      googleTranslateElementInit();
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ display: "inline-block" }}
    ></div>
  );
}
