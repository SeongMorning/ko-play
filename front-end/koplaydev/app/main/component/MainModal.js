"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./MainModal.module.scss";
import BlurBox from "@/app/component/boxes/BlurBox";
import { motion, useAnimate } from "framer-motion";
import PinkBox from "@/app/component/boxes/PinkBox";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import BlueBox from "@/app/component/boxes/BlueBox";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainModal() {
  const modalNum = useSelector((state) => state.test);
  return (
    <motion.div
      className={styles.MainModal}
      animate={{
        opacity : 1
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <SelectModal idx={1000}></SelectModal>
    </motion.div>
  );
}

const SelectModal = ({ idx }) => {
  if (idx === 1000) {
    return (
      <>
        <YellowBox width={"50"} height={"50"}>
          <div className={styles.FirstSetting}>
            <span className={styles.Title}>초기 설정</span>
            <div className={styles.School}>
              <PinkBox width={"25"} height={"100"} text={"학 교"} />
              <WhiteBox width={"65"} height={"100"}>
                <input type="text" />
              </WhiteBox>
            </div>
            <div className={styles.Nickname}>
              <PinkBox width={"25"} height={"100"} text={"닉 네 임"} />
              <WhiteBox width={"65"} height={"100"}>
                <input type="text" />
              </WhiteBox>
            </div>
            <div className={styles.OK}>
              <BlueBox width={"25"} height={"100"} text={"완 료"} />
            </div>
          </div>
        </YellowBox>
        {/* <BlurBox /> */}
      </>
    );
  } else if (idx === 1) {
  } else if (idx === 2) {
  } else if (idx === 3) {
  } else if (idx === 4) {
  } else {
    return <></>;
  }
};
