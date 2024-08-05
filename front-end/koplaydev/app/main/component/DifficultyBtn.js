import { useDispatch, useSelector } from "react-redux";
import styles from "./DifficultyBtn.module.scss";
import { motion } from "framer-motion";
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";

export default function DifficultyBtn(props) {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.level);
  const gamePurposeIdx = useSelector((state) => state.gamePurpose)

  return (
    <motion.div
      className={styles.DifficultyBtn}
      whileHover={{
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.3,
        },
      }}
      onClick={() => {
        if (levelList[gamePurposeIdx - 1] !== 5) {
          if (gamePurposeIdx === 1) {
            dispatch(changeSpeechLevel(levelList[gamePurposeIdx - 1] + 1));
          } else if (gamePurposeIdx === 2) {
            dispatch(changeReadLevel(levelList[gamePurposeIdx - 1] + 1));
          } else {
            dispatch(changeListenLevel(levelList[gamePurposeIdx - 1] + 1));
          }
        }
      }}
    >
      <motion.div
        className={styles.DifficultyBtnTap}
        whileTap={{
          translateY: "6px",
        }}
      >
        <svg
          className={styles.DifficultyBtnTop}
          viewBox="0 0 204 240"
          fill={`${props.bg}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M185.129 154.998C209.605 139.414 209.866 103.772 185.619 87.8326L63.5872 7.60845C37.0989 -9.80493 1.84642 9.04224 1.61508 40.7408L0.457139 199.399C0.225794 231.098 35.1995 250.458 61.939 233.433L185.129 154.998Z"
            fill={`${props.bg}`}
          />
        </svg>
        <span
          className={styles.text}
          style={{
            color: `${props.shadow}`,
          }}
        >
          어려움
        </span>
      </motion.div>
      <svg
        className={styles.DifficultyBtnBottom}
        viewBox="0 0 204 240"
        fill={`${props.shadow}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M185.129 154.998C209.605 139.414 209.866 103.772 185.619 87.8326L63.5872 7.60845C37.0989 -9.80493 1.84642 9.04224 1.61508 40.7408L0.457139 199.399C0.225794 231.098 35.1995 250.458 61.939 233.433L185.129 154.998Z"
          fill={`${props.shadow}`}
        />
      </svg>
    </motion.div>
  );
}
