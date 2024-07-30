import styles from "./GameCard.module.scss";

export default function GameCard(props) {
  return (
    <div className={styles.GameCard}>
      <img src="/card-game.png" style={{ left: props.left, top: props.top }} />
    </div>
  );
}
