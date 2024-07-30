import BackScoreBtn from "../component/buttons/BackScoreBtn";
import AlbumFameBg from "../component/background/AlbumFameBg";
import EmCarousel from "./component/Carousel/EmCarousel";
import styles from "./page.module.scss";

export default function Album() {
  return (
    <>
      <BackScoreBtn text="뒤로가기" left="1vw" top="1vh" />
      <div className={styles.carousel}>
        <EmCarousel />
      </div>
      <AlbumFameBg />
    </>
  );
}
