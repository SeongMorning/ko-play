import styles from "./LoginInput.module.scss";
export default function loginInput() {
  return (
    <div>
      <input className={styles.idInput} type="text" />
      <input className={styles.passwordInput} type="password" />
      <button className={styles.loginBtn}>로그인</button>
      <div>아이디와 비밀번호는 부모님 계정에서 발급 가능합니다.</div>
    </div>
  );
}
