import BackScoreBtn from "../component/buttons/BackScoreBtn";
import AlbumFameBg from "../component/background/AlbumFameBg";
import styles from "./page.module.scss";
import Embla from "./component/Embla/Embla";

export default function Album() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" />
      <div className={styles.emblaCarousel}>
        <Embla />
      </div>
      <AlbumFameBg />
    </>
  );
}
