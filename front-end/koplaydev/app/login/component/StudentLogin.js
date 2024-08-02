"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.scss";
import axios from 'axios';

export default function StudentLogin() {
  const router = useRouter();
  
  // 각각의 입력 필드에 대한 useRef 선언
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  let id_in = '';
  let pw_in = '';
  useEffect(()=>{
    id_in = idRef.current.value;
    pw_in = passwordRef.current.value;
  },[idRef,passwordRef])
  // 쿠키에서 특정 값을 가져오는 함수
  function getCookieValue(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // 버튼 클릭 시 실행되는 함수
  const handleClick = () => {
    const formData = new FormData();
    
    // 입력 필드의 값을 올바르게 가져와서 FormData에 추가
    formData.append('id', idRef.current.value);  // 올바른 접근 방법
    formData.append('password', passwordRef.current.value);

    // 값 확인을 위해 콘솔에 출력
    console.log("ID:", idRef.current.value, "Password:", passwordRef.current.value);

    axios.post('http://localhost:8080/login', 
      formData, { withCredentials: true }
    )
    .then((res) => {
      console.log('Response:', res);

      // 쿠키에서 Authorization 토큰 가져오기
      const token = getCookieValue('Authorization');
      console.log('Auth Token:', token);

      // 성공적으로 로그인 시 메인 페이지로 이동
      router.push("/main");
    })
    .catch((e) => {
      alert("로그인 실패");
      console.error('Error:', e);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.idInput}
          type="text"
          id="username"  // 고유한 ID 설정
          ref={idRef}
          placeholder="아이디를 입력하세요"
        />
        <input
          className={styles.pwInput}
          type="password"
          id="password"  // 고유한 ID 설정
          ref={passwordRef}
          placeholder="비밀번호를 입력하세요"
          required
        />
        <div className={styles.infoText}>
          아이디와 비밀번호는 부모님 계정에서 발급 가능합니다.
        </div>
      </div>
      <button className={styles.loginBtn} onClick={handleClick}>
        로그인
      </button>
    </div>
  );
}
