import { changeTestIdx } from "@/redux/slices/testSlice";
import styles from "./WhiteTestBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import effectSound from '@/app/utils/effectSound'

const settingTestButtonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/settingTestButtonSound.mp3';

export default function WhiteTestBtn(props) {
  const testIdx = useSelector((state) => state.test);
  const dispatch = useDispatch();

  const es = effectSound(settingTestButtonSound, 0.3);

  return (
    <>
      <div
        onClick={() => {
          es.play();
          dispatch(changeTestIdx(props.idx + 1));
        }}
        className={`${styles.WhiteTestBtn} ${props.idx + 1 === testIdx ? styles.click : ""}`}
      >
        {props.text}
      </div>
    </>
  );
}
