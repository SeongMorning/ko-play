"use client";
import styles from "./ParentLogin.module.scss";
import { useRouter } from "next/navigation";

export default function ParentLogin() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <img
        src="/kakao_login_large_narrow.png"
        // onClick={router.push("/parent")}
      />
      <img
        src="/web_light_sq_ctn@2x.png"
        //   onClick={router.push("/parent")}
      />
    </div>
  );
}
