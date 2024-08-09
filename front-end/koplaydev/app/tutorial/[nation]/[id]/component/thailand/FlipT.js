"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function FlipT() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/flipflip/flipT1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/flipflip/flipT2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/flipflip/flipT3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/flipflip/flipT4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/flipflip/flipT5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/thailand/commonT9.png",
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
