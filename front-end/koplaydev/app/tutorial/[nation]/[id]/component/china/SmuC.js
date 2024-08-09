"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function SmuC() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC9.png",
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
