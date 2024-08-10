"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function FlipV() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/commonV3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/flipflip/flipV1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/flipflip/flipV2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/flipflip/flipV3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/flipflip/flipV4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/vietnam/flipflip/flipV5.png",
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
      router.push("/main");
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
