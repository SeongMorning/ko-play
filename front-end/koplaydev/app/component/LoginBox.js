"use client";
import { useRef } from "react";
import styles from "./LoginBox.module.scss";
export default function LoginBox() {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.idInput}
          type="text"
          placeholder="아이디를 입력하세요"
        />
        <input
          className={styles.pwInput}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <div className={styles.infoText}>
          아이디와 비밀번호는 부모님 계정에서 발급 가능합니다.
        </div>
      </div>
      <button className={styles.loginBtn}>로그인</button>
    </div>
  );
}
