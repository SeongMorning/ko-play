"use client";

import PinkBox from "@/app/component/boxes/PinkBox";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./FirstVisit.module.scss";
import BlueBox from "@/app/component/boxes/BlueBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import effectSound from '@/app/utils/effectSound'

const keydownSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/keydownSound.wav";

export default function FirstVisit() {
  const translationWords = useSelector((state) => state.translationWords);
  const [red, setRed] = useState(false)
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const keydownEs = effectSound(keydownSound, 1);

  return (
    <YellowBox width={"50"} height={"50"}>
      <div className={styles.FirstSetting}>
        <span className={styles.Title}>{translationWords.firstVisitTitle}</span>
        <div className={styles.School}>
          <PinkBox width={"25"} height={"100"} text={translationWords.school} />
          <WhiteBox width={"65"} height={"100"}>
            <input
              className={styles.input}
              type="text"
              placeholder={
                translationWords.school + translationWords.schoolPlaceholder
              }
              onChange={(e) => 
                {
                  keydownEs.play();
                  setSchool(e.target.value)
                }}
            />
          </WhiteBox>
        </div>
        <div className={styles.Nickname}>
          <PinkBox
            width={"25"}
            height={"100"}
            text={translationWords.nickname}
          />
          <WhiteBox width={"65"} height={"100"} red={red}>
            <input
              className={styles.input}
              type="text"
              placeholder={translationWords.nicknamePlaceholder}
              onChange={(e) => {
                keydownEs.play();
                if (e.target.value.length <= 7) {
                  setNickname(e.target.value);
                  setRed(false); 
                }else{
                  setNickname(e.target.value);
                  setRed(true); 
                }
              }}
            />
          </WhiteBox>
        </div>
        {school.endsWith('학교') &&
        nickname.length <= 7 &&
        nickname.length >= 2 ? (
          <div className={styles.OK}>
            <BlueBox
              nickname={nickname}
              school={school}
              width={"25"}
              height={"100"}
              text={translationWords.complete}
            />
          </div>
        ) : (
          <span className={styles.text}>{translationWords.firstVisitInfo}</span>
        )}
      </div>
    </YellowBox>
  );
}
