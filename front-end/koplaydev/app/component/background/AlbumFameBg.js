import styles from "./AlbumFameBg.module.scss";
import StarBg from "../StarBg";
export default function AlbumFameBg() {
  return (
    <>
      <StarBg
        left="10vw"
        top="10vh"
        duration="2"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        left="5vw"
        top="50vh"
        duration="2.3"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        left="20vw"
        top="30vh"
        duration="3"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        left="20vw"
        top="80vh"
        duration="1.5"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        right="15vw"
        top="20vh"
        duration="1"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        right="30vw"
        top="15vh"
        duration="3.5"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        right="2vw"
        top="14vh"
        duration="1.2"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        left="40vw"
        top="70vh"
        duration="1.6"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        right="50vw"
        top="5vh"
        duration="2.1"
        imgSrc="Star-fame-yellow-bg.png"
      />
      <StarBg
        right="20vw"
        top="80vh"
        duration="2"
        imgSrc="Star-fame-yellow-bg.png"
      />

      <img className={styles.constellation1} src="Constellation1.png" />
      <img className={styles.constellation2} src="Constellation2.png" />
      <img className={styles.constellation3} src="Constellation3.png" />
    </>
  );
}
