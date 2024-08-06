"use client";
import styles from "./ParentLogin.module.scss";
import { useRouter } from "next/navigation";

export default function ParentLogin() {
  const router = useRouter();
  
  return (
    <div className={styles.container}>
      <img
        src="/kakao_login_large_narrow.png"
        onClick={()=>{
          window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
          // window.location.href = "https://i11b302.p.ssafy.io/api/oauth2/authorization/kakao";
          }}
      />
      <img 
        src="/web_light_sq_ctn@2x.png" 
        onClick={()=>{
          window.location.href = "http://localhost:8080/oauth2/authorization/google";
          // window.location.href = "http://https://i11b302.p.ssafy.io/oauth2/authorization/google";
        }}
        />
    </div>
  );
}
