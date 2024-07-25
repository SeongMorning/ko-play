"use client";
import styles from "./StartButton.module.scss";
import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login"); // 로그인 페이지로 라우팅
  };
  return (
    <div className={styles.startButton} onClick={handleClick}>
      <div className={styles.startButtonDot} />
      <div className={styles.startButtonDot2} />
      <div className={styles.startButtonShadow}></div>
      <div className={styles.startButtonMain} />
      <h2 className={styles.text}>회원으로 시작</h2>
    </div>
  );
}
