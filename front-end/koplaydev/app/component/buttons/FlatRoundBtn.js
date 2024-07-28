"use client";

import styles from "./FlatRoundBtn.module.scss";
import { useRouter } from "next/navigation";
// 어떤 모달을 사용할지 정해야할 듯합니다.

export default function FlatRoundBtn(props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(props.url);
  };
  const modals = function () {};
  return (
    <div className={styles.FlatRoundBtn} onClick={handleClick}>
      <div className={styles.FlatRoundBtnBottom} />
      <div className={styles.FlatRoundBtnTop} />
      <div className={styles.FlatRoundBtnDot1} />
      <div className={styles.FlatRoundBtnDot2} />
      <img src={props.imgSrc} />
    </div>
  );
}
