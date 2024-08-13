import { useDispatch, useSelector } from "react-redux";
import styles from "./ClickedPinkBtn.module.scss";
import { changeMyPageIdx } from "@/redux/slices/myPageSlice";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function ClickedPinkBtn(props) {
  const router = useRouter();

  const myPageIdx = useSelector((state) => state.myPage);
  const [scope, animation] = useAnimate()
  const es = effectSound(buttonSound, 1);

  return (
    <>
        <motion.div
          className={styles.ClickedPinkBtn}
          onClick={() => {
            es.play();
            router.replace(`/parent/child/${props.id}/statistic?view=${props.idx}`)
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
    </>
  );
}
