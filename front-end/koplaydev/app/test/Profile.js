import styles from "./Profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.pictureBox}>
        <img src="hehe.png" />
      </div>
      <div className={styles.profileInfo}>
        <img src="/korea-3.png" alt="" />
        <div>
          <span>123123</span>
          <span>456</span>
        </div>
        <span>123123</span>
        <span>123123</span>
      </div>
    </div>
  );
}
