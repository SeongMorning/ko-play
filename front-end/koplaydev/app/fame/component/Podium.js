"use client";
import styles from "./Podium.module.scss";

// props : left, top, users[name, image, plays, level]
export default function Podium(props) {
  return (
    <>
      <div
        className={styles.podium}
        style={{ left: props.left, top: props.top }}
      >
        <img src="/podium.png" alt="시상대" />
        <div className={`${styles.face1}`}>
          <img src={props.users.user1.image} alt="1등" />
        </div>
        <div className={styles.light1}></div>
        <div className={`${styles.face2}`}>
          <img src={props.users.user2.image} alt="2등" />
        </div>
        <div className={styles.light2}></div>
        <div className={`${styles.face3}`}>
          <img src={props.users.user3.image} alt="3등" />
        </div>
        <div className={styles.light3}></div>
      </div>
      <div className={styles.info}>
        <div className={`${styles.info} ${styles.info1}`}>
          이름 : {props.users.user1.name}
          <br />
          주간 판 수 : {props.users.user1.plays}
        </div>
        <div className={`${styles.info} ${styles.info2}`}>
          이름 : {props.users.user2.name}
          <br />
          주간 판 수 : {props.users.user2.plays}
        </div>
        <div className={`${styles.info} ${styles.info3}`}>
          이름 : {props.users.user3.name}
          <br />
          주간 판 수 : {props.users.user3.plays}
        </div>
      </div>
    </>
  );
}
