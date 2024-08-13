"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import styles from "./BackScoreBtn.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeMyPageIdx } from "@/redux/slices/myPageSlice";
import logoutAxios from "@/app/axios/logoutAxios";
import { persistor } from '../../../redux/reduxStore';
import effectSound from '@/app/utils/effectSound'
import { useEffect } from "react";
import translations from "@/app/axios/translations";
import { changeTranslationWords } from "@/redux/slices/translationWords";

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

// props : left, top, score, question, text
export default function BackScoreBtn(props) {
    
  const pathName = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const correct = useSelector((state) => state.correct);

  // 쿠키에서 특정 값을 가져오는 함수
  const getCookieValue = function (name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // 뒤로가기 기능 단순 구현
  const handleClick = () => {
    const authToken = getCookieValue('Authorization');
    if (authToken == null) {
      dispatch({ type: 'RESET_ALL' });
      router.replace("/")
    }
    if (pathName === "/mypage") {
      dispatch(changeMyPageIdx(1));
    }

    if(pathName === "/login"){
      router.replace("/");
    }else if(pathName === "/album"){
      router.replace("/main");
    }else if(pathName === "/mypage"){
      router.replace("/main");
    }else if(pathName === "/avatar"){
      router.replace("/main");
    }else if(pathName ==="/parent"){
      router.replace("/");
    }else if(pathName === `/parent/child/${params.id}`){
      router.replace("/parent");
    }else if(pathName.endsWith("/statistic")){
      router.replace(`/parent/child/${params.id}`);
    }else if(pathName === "/fame"){
      router.replace('/main');
    }
  }

  const es = effectSound(buttonSound, 1);

  return (
    <div
      className={styles.BackScoreBtn}
      onClick={async () => {
        es.play();

        if (props.text == '로그아웃') {
          dispatch({ type: 'RESET_ALL' });
          persistor.purge();

          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue('Authorization');
          if (authToken == null) {
            router.replace("/")
          }

          const response = await logoutAxios();

          if (response != null) {
            //null이 아니면 성공
            router.replace("/")
          }
        } else {
          handleClick();
        }
      }}
      style={{
        left: props.left,
        top: props.top,
        cursor: props.score ? "default" : "url('/smile-star-hover.svg') 30 30, auto"
      }}
    >
      <motion.div
        className={styles.BackScoreBtnTop}
        whileTap={
          props.score
            ? {}
            : {
              translateY: "0.5vh",
              translateX: "-0.2vw",
              transition: {
                duration: 0.1,
              },
            }
        }
      >
        {props.score ? (
          `점수 : ${correct} / ${props.question}`
        ) : (
          <img src="/Back.png" />
        )}
        <span>{props.score ? null : props.text}</span>
      </motion.div>
      <div className={styles.BackScoreBtnBottom} />
    </div>
  );

}