"use client";
import styles from "./ParentLogin.module.scss";
import { useRouter } from "next/navigation";
import effectSound from '@/app/utils/effectSound'

const mouseClickSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3';

export default function ParentLogin() {
  const router = useRouter();
  const es = effectSound(mouseClickSound, 1);
  
  return (
    <div className={styles.container}>
      <img
        src="/kakao_login_large_narrow.png"
        onClick={()=>{
          es.play();
          window.location.href = `${process.env.customKey}/oauth2/authorization/kakao`;

          }}
      />
      <img 
        src="/web_light_sq_ctn@2x.png" 
        onClick={()=>{
          es.play();
          window.location.href = `${process.env.customKey}/oauth2/authorization/google`;

        }}
        />
    </div>
  );
}