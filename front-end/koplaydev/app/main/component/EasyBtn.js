import { useDispatch, useSelector } from "react-redux";
import styles from "./EasyBtn.module.scss";
import { motion } from "framer-motion";
import {
  changeListenLevel,
  changeReadLevel,
  changeSpeechLevel,
} from "@/redux/slices/levelSlice";

export default function EasyBtn(props) {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.level);
  const gameIdx = useSelector((state) => state.game);

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
        if (gameIdx === 1 && levelList[gameIdx - 1] !== 1) {
          dispatch(changeSpeechLevel(levelList[gameIdx - 1] - 1));
        } else if (gameIdx === 2 && levelList[gameIdx - 1] !== 1) {
          dispatch(changeReadLevel(levelList[gameIdx - 1] - 1));
        } else {
          dispatch(changeListenLevel(levelList[gameIdx - 1] - 1));
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
          쉬움
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
