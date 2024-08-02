import styles from "./CardBack.module.scss";

export default function CardBack(props) {
  return (
    <div className={styles.GameCard}>
      <img src="/card-game.png" style={{ left: props.left, top: props.top }} />
    </div>
  );
}
