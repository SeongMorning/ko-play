import { useDispatch, useSelector } from "react-redux";
import styles from "./EasyBtn.module.scss";
import { motion } from "framer-motion";
import {
  changeListenLevel,
  changeReadLevel,
  changeSpeechLevel,
} from "@/redux/slices/levelSlice";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function EasyBtn(props) {
  const translationWords = useSelector((state) => state.translationWords);

  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.level);
  const gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const es = effectSound(buttonSound, 1);

  return (
    <motion.div
      className={styles.EasyBtn}
      whileHover={{
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.3,
        },
      }}
      onClick={() => {
        es.play();
        if (gamePurposeIdx === 1 && levelList[gamePurposeIdx - 1] !== 1) {
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
        } else if (gamePurposeIdx === 2 && levelList[gamePurposeIdx - 1] !== 1) {
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
        } else {
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
        }
      }}
    >
      <motion.div
        className={styles.EasyBtnTap}
        whileTap={{
          translateY: "6px",
        }}
      >
        <svg
          className={styles.EasyBtnTop}
          viewBox="0 0 205 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4387 154.998C-5.03751 139.414 -5.29763 103.772 18.9485 87.8326L140.981 7.60845C167.469 -9.80493 202.721 9.04224 202.953 40.7408L204.111 199.399C204.342 231.098 169.368 250.458 142.629 233.433L19.4387 154.998Z"
            fill={props.bg}
          />
        </svg>
        <span
          className={styles.text}
          style={{
            color: `${props.shadow}`,
          }}
        >
          {translationWords.easy}
        </span>
      </motion.div>
      <svg
        className={styles.EasyBtnBottom}
        viewBox="0 0 205 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4387 154.998C-5.03751 139.414 -5.29763 103.772 18.9485 87.8326L140.981 7.60845C167.469 -9.80493 202.721 9.04224 202.953 40.7408L204.111 199.399C204.342 231.098 169.368 250.458 142.629 233.433L19.4387 154.998Z"
          fill={props.shadow}
        />
      </svg>
    </motion.div>
  );
}
