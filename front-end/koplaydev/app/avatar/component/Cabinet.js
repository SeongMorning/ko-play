import styles from "./Cabinet.module.scss";
import BtnContainer from "./BtnContainer";
import Cam from "./Cam";
import ChangeNation from "./ChangeNation";

export default function Cabinet() {
  return (
    <div className={styles.cabinetContainer}>
      <img className={styles.cabinetImg} src="/cabinet.png" />
      <Cam left="65vw" top="50vh" width="20vw" />
      <BtnContainer />
      <ChangeNation />
    </div>
  );
}
