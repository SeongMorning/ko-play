"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./BackScoreBtn.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeMyPageIdx } from "@/redux/slices/myPageSlice";
import logoutAxios from "@/app/axios/logoutAxios";
import { persistor } from '../../../redux/reduxStore';
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

// props : left, top, score, question, text
export default function BackScoreBtn(props) {
    
  const pathName = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

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
      router.push("/")
    } else if (props.text) {
      history.go(-1);
    }
    if (pathName === "/mypage") {
      dispatch(changeMyPageIdx(1));
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

          // useEffect(() => {
          //   const fetchTranslations = async () => {
          //     try {
          //       const result = await translations("ko-KR");
          //       dispatch(changeTranslationWords(result));
          //     } catch (error) {
          //       console.error("Failed to fetch translations:", error);
          //     }
          //   };
        
          //   fetchTranslations(); // 비동기 함수 호출
          // }, [dispatch]);

          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue('Authorization');
          if (authToken == null) {
            router.push("/")
          }

          const response = await logoutAxios();

          if (response != null) {
            //null이 아니면 성공
            router.push("/")
          }
        } else {
          handleClick();
        }
      }}
      style={{
        left: props.left,
        top: props.top,
        cursor: props.score ? "default" : "pointer",
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