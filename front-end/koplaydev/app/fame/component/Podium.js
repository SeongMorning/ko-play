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
        <div className={styles.face1}>
          <img src={props.users[0].student.profileImg|| "hehe.png"} alt="1등"
          onError={(e) => { e.target.src = "hehe.png"; }}
          />
        </div>
        <div className={styles.light1}></div>
        <div className={styles.face2}>
          <img src={props.users[1].student.profileImg|| "hehe.png"} alt="2등"
           onError={(e) => { e.target.src = "hehe.png"; }}
          />
        </div>
        <div className={styles.light2}></div>
        <div className={styles.face3}>
          <img src={props.users[2].student.profileImg|| "hehe.png"} alt="3등" 
          onError={(e) => { e.target.src = "hehe.png"; }}
 />
        </div>
        <div className={styles.light3}></div>
      </div>
      <div className={styles.info}>
        <div className={`${styles.info} ${styles.info1}`}>
          이름 : {props.users[0].student.name}
          <br />
          주간 판 수 : {props.users[0].gameCount}
        </div>
        <div className={`${styles.info} ${styles.info2}`}>
          이름 : {props.users[1].student.name}
          <br />
          주간 판 수 : {props.users[1].gameCount}
        </div>
        <div className={`${styles.info} ${styles.info3}`}>
          이름 : {props.users[2].student.name}
          <br />
          주간 판 수 : {props.users[2].gameCount}
        </div>
      </div>
    </>
  );
}
