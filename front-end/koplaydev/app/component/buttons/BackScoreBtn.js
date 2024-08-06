"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./BackScoreBtn.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeMyPageIdx } from "@/redux/slices/myPageSlice";
import logoutAxios from "@/app/axios/logoutAxios";
import { persistor } from '../../../redux/reduxStore';


// props : left, top, score, question, text
export default function BackScoreBtn(props) {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const correct = useSelector((state) => state.correct);

  // 뒤로가기 기능 단순 구현
  const handleClick = () => {
    if (props.text) {
      history.go(-1);
    }
    if(pathName ==="/mypage"){
      dispatch(changeMyPageIdx(1));
    }
  };

  return (
    <div
      className={styles.BackScoreBtn}
      onClick={async () => {
        if (props.text =='로그아웃') {
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
          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue('Authorization');
          if (authToken == null) {
            router.push("/")
          }
          persistor.purge();

          const response = await logoutAxios();
          
          if(response != null){
            //null이 아니면 성공
            router.push("/")
          }
        }else{
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
