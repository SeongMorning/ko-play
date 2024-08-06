import PinkBox from "@/app/component/boxes/PinkBox";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./FirstVisit.module.scss";
import BlueBox from "@/app/component/boxes/BlueBox";
import { useState } from "react";

export default function FirstVisit() {
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  return (
    <YellowBox width={"50"} height={"50"}>
      <div className={styles.FirstSetting}>
        <span className={styles.Title}>초기 설정</span>
        <div className={styles.School}>
          <PinkBox width={"25"} height={"100"} text={"학 교"} />
          <WhiteBox width={"65"} height={"100"}>
            <input
              className={styles.input}
              type="text"
              placeholder="'학교'로 끝나게 입력"
              onChange={(e) => setSchool(e.target.value)}
            />
          </WhiteBox>
        </div>
        <div className={styles.Nickname}>
          <PinkBox width={"25"} height={"100"} text={"닉 네 임"} />
          <WhiteBox width={"65"} height={"100"}>
            <input
              className={styles.input}
              type="text"
              placeholder="2글자 이상 6글자 이하"
              onChange={(e) => setNickname(e.target.value)}
            />
          </WhiteBox>
        </div>
        {school.endsWith("학교") && nickname.length <= 6 && nickname.length >= 2 ? (
          <div className={styles.OK}>
            <BlueBox nickname = {nickname} school={school} width={"25"} height={"100"} text={"완 료"} />
          </div>
        ) : <span className={styles.text}>학교와 닉네임 정보를 제대로 입력하세요.</span>}
      </div>
    </YellowBox>
  );
}
