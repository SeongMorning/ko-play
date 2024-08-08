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
          window.location.href = `${process.env.customKey}/oauth2/authorization/kakao`;

          }}
      />
      <img 
        src="/web_light_sq_ctn@2x.png" 
        onClick={()=>{
          window.location.href = `${process.env.customKey}/oauth2/authorization/google`;

        }}
        />
    </div>
  );
}