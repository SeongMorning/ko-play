import { useDispatch, useSelector } from "react-redux";
import styles from "./ClickedPinkBtn.module.scss";
import { changeMyPageIdx } from "@/redux/slices/myPageSlice";
import { motion, useAnimate } from "framer-motion";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function ClickedPinkBtn(props) {
  const dispatch = useDispatch();
  const myPageIdx = useSelector((state) => state.myPage);
  const [scope, animation] = useAnimate()
  const es = effectSound(buttonSound, 1);
  console.log(props.text)
  return (
    <>
      {props.idx !== myPageIdx ? (
        <motion.div
          className={styles.ClickedPinkBtn}
          onClick={() => {
            es.play();
            dispatch(changeMyPageIdx(props.idx));
          }}
          onHoverStart={()=>{
            animation(scope.current, {backgroundColor : "#FFA8BD"})
          }}
          onHoverEnd={()=>{
            animation(scope.current, {backgroundColor : "#FFD6E0"})
          }}
          style={{
            width: `${props.width}%`,
            height: `${props.height}%`,
          }}
        >
          <div ref={scope} className={styles.ClickedPinkBtnTop}>{props.text}</div>
          <div className={styles.ClickedPinkBtnBottom} />
        </motion.div>
      ) : (
        <div
          className={styles.ClickedPinkBtn}
          onClick={() => {
            dispatch(changeMyPageIdx(props.idx));
          }}
          style={{
            width: `${props.width}%`,
            height: `${props.height}%`,
          }}
        >
          <div 
          className={styles.ClickedPinkBtnBottom}
          style={{
            backgroundColor : "#FFA8BD"
          }}>{props.text}</div>
        </div>
      )}
    </>
  );
}
