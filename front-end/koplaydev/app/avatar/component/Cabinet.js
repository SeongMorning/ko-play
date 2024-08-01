import styles from "./Cabinet.module.scss";
import BtnContainer from "./BtnContainer";
export default function Cabinet() {
  return (
    <div className={styles.cabinetContainer}>
      <img src="/cabinet.png" />
      <BtnContainer />
    </div>
  );
}
