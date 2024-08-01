"use client";

import { useRouter } from "next/navigation";
import styles from "./ChildProfileCard.module.scss";

export default function ChildProfileCard({ isBgBlue, name, birth, src, idx }) {

    const router = useRouter();
    const studentIdx = idx;

    // DB student 테이블의 student_idx를 가져옴?
    // const handleClick = () => {
    //     router.push({
    //         pathname: "/parent/child",
    //         query: { idx }
    //     });
    // };

    return (
        <>
            <div className={`${styles.profileCardBg} ${isBgBlue ? styles.blueProfileCardBg : ''}`}>
            </div>
            <div className={`${styles.profileCard} ${isBgBlue ? styles.blueProfileCard : ''}`} onClick={() => router.push("/parent/child")}>
                <img className={styles.closeButton} src="close.png" alt="" />
                <div className={styles.profileInput}>
                    <img className={styles.profileImg} src={src} alt="" />
                </div>
                <h1 className={styles.profileName}>{name}</h1>
                <h2 className={styles.profileBirth}>{birth}</h2>
            </div>
        </>
    )
}