"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";
import { useDispatch } from "react-redux";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function FlipT() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const tutorialImages = [
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
      dispatch(changeGamePurposeIdx(0));
      dispatch(changeModalIdx(0));
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
