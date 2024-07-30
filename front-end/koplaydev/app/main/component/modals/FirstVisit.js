import PinkBox from "@/app/component/boxes/PinkBox";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import YellowBox from "@/app/component/boxes/YellowBox";
import styles from './FirstVisit.module.scss';
import BlueBox from "@/app/component/boxes/BlueBox";

export default function FirstVisit(){
    return(
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
    )
}