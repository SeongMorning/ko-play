"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function SmuV() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/smugogae/smuV6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV9.png",
  ];

  const handleNextStep = () => {
    if (currentStep < tutorialImages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace("/main");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.tutorialContainer}>
      <img
        src={tutorialImages[currentStep]}
        alt={`Tutorial Step ${currentStep + 1}`}
      />
      <button
        className={`${styles.navButton} ${styles.leftButton}`}
        onClick={handlePrevStep}
        disabled={currentStep === 0}
      >
        ◀
      </button>
      <button
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={handleNextStep}
      >
        ▶
      </button>
    </div>
  );
}
