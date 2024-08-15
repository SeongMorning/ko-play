"use client";
import { motion } from "framer-motion";
import styles from "./BlueBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import modifyAvatarAxios from "@/app/axios/modifyAvatarAxios";
import { setStudentAvatars } from "@/redux/slices/studentAvatarSlice";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

// props : width, height, top, left, radius, click
export default function BlueBtn(props) {
  const myAvatars = useSelector((state) => state.myAvatar)
  const dispatch = useDispatch();
  const es = effectSound(buttonSound, 0.7);

  return (
    <>
      <motion.div
        className={styles.blueBtn}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          translateY: "1vh",
          transition: {
            duration: 0.1,
          },
        }}
        style={{
          width: props.width,
          height: props.height,
          left: props.left,
          top: props.top,
          borderRadius: props.radius,
        }}
        onClick={async ()=>{
          es.play();
          props.setIsAvatar(false);
          console.log(myAvatars);
          const idx = myAvatars.avatars.findIndex((data) => data.currentUse === true);
          if(idx !== -1){
            const beforeAvatarIdx = myAvatars.avatars[idx].avatar.avatarIdx;
            const data = await modifyAvatarAxios({beforeAvatarIdx : beforeAvatarIdx, afterAvatarIdx : 0})
            if(data){
              dispatch(setStudentAvatars(data));
            }
          }
        }}
      >
        {props.text}
      </motion.div>
    </>
  );
}
