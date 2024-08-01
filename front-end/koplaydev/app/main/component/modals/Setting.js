import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Setting.module.scss";
import WhiteBox from "@/app/component/boxes/WhiteBox";
import { useDispatch } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function Setting() {
  const dispatch = useDispatch();
  return (
    <YellowBox width={"30"} height={"80"}>
      <img
        src="/close.png"
        className={styles.backBtn}
        onClick={() => {
          dispatch(changeModalIdx(0));
        }}
      ></img>
      <div className={styles.settingMain}>
        <div className={styles.profileBox}>
          <img className={styles.profileImg} src="/hehe.png" />
          <img className={styles.profileSetting}src="/settingIcon2.png"/>
        </div>
        <WhiteBox width={"60"} height={"10"}>
          <input />
          <img className={styles.modifyImg} src="/modify.png" />
        </WhiteBox>
        <WhiteBox width={"60"} height={"10"}>
          <input />
          <img className={styles.modifyImg} src="/modify.png" />
        </WhiteBox>
        <WhiteBox width={"60"} height={"10"}>
          <span>비밀번호 재설정</span>
        </WhiteBox>
      </div>
    </YellowBox>
  );
}
