import styles from './MainIcons.module.scss';

export default function MainIcons() {
  return (
    <>
      <img className={styles.hehe} src="/hehe.png" alt="" />
      <img className={styles.normalGame} src="/normal-game2.png" alt="" />
      <img className={styles.rankGame} src="rank-game.png" alt="" />
      <img className={styles.speechBubble} src="speechBubble.png" alt="" />
    </>
  );
}
