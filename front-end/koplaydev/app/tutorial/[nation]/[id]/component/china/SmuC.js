"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function SmuC() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "/images/tutorial1.png",
    "/images/tutorial2.png",
    "/images/tutorial3.png",
    // 필요한 만큼 이미지를 추가합니다.
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
