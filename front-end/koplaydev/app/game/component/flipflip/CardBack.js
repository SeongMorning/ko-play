// import styles from "./CardBack.module.scss";

// export default function CardBack() {
//   return (
//       <img src="/flipflip-game-card2.png" className={styles.card}/>
//   );
// }
import styles from "./CardBack.module.scss";

export default function CardBack() {
  return (
      <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        <img src="/flipflip-game-card-back.png" className={styles.cardImage} />
      </div>
    </div>
  );
}
