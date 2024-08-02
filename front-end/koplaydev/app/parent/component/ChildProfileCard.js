"use client";

import { useRouter } from "next/navigation";
import styles from "./ChildProfileCard.module.scss";

export default function ChildProfileCard({ name, birth, src, idx, bgColor }) {
    const color = {backgroundColor: bgColor};

    const router = useRouter();

    return (
        <div className={`${styles.profileCard} ${styles.profileCardBg}`} style={ color } onClick={() => router.push("/parent/child")}>
            <img className={styles.closeButton} src="close.png" alt="close" />
            <div className={styles.profileInput}>
                <img className={styles.profileImg} src={src} alt={name} />
            </div>
            <h1 className={styles.profileName}>{name}</h1>
            <h2 className={styles.profileBirth}>{birth}</h2>
        </div>
    );
}

