"use client";

import { useAnimate } from "framer-motion";
import styles from "./FameBtn.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import effectSound from '@/app/utils/effectSound'
import { useSelector } from "react-redux";

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function FameBtn() {
  const translationWords = useSelector((state) => state.translationWords);

  const [scope, animate] = useAnimate();
  let array = Array(30).fill(0);
  const router = useRouter();

  const es = effectSound(buttonSound, 1);

  return (
    <>
      <div className={styles.FameText}>
        <img src="/fame.png" alt="" />
        <motion.span
          onHoverStart={() => {
            animate(scope.current, {backgroundColor : "rgba(115, 238, 194, 0.5)"});
          }}
          onHoverEnd={() => {
            animate(scope.current, {backgroundColor : "rgba(115, 238, 194, 0.302)"});
          }}
          onClick={()=>{
            es.play();
            router.replace('/fame');
          }}
        >
          {translationWords.fameBtn}
        </motion.span>
      </div>
      <motion.table ref={scope} className={styles.FameBtn}>
        <tbody>
          {[...Array(4)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {array.map((_, colIndex) => (
                <td key={colIndex + rowIndex * array.length}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </motion.table>
    </>
  );
}
