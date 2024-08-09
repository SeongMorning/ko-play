"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function FlipK() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/flipflip/flipK1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/flipflip/flipK2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/flipflip/flipK3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/flipflip/flipK4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/flipflip/flipK5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/korea/commonK9.png",
  ];

  const handleNextStep = () => {
    if (currentStep < tutorialImages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/main");
    }
  };

  return (
    <div className={styles.tutorialContainer} onClick={handleNextStep}>
      <img
        src={tutorialImages[currentStep]}
        alt={`Tutorial Step ${currentStep + 1}`}
      />
    </div>
  );
}
