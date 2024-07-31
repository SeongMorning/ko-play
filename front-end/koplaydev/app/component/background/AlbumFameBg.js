import styles from "./AlbumFameBg.module.scss";
import StarBg from "../StarBg";
export default function AlbumFameBg() {
  return (
    <>
      <StarBg left="10vw" top="20vh" duration="2" />
      <StarBg left="5vw" top="50vh" duration="2" />
      <StarBg left="20vw" top="80vh" duration="1.5" />
      <StarBg right="10vw" top="20vh" duration="1.5" />
      <StarBg right="50vw" top="5vh" duration="1.5" />
      <StarBg right="5vw" top="80vh" duration="2" />
      <img className={styles.constellation1} src="Constellation1.png" />
      <img className={styles.constellation2} src="Constellation2.png" />
      <img className={styles.constellation3} src="Constellation3.png" />
    </>
  );
}
