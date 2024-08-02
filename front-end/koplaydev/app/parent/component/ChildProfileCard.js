"use client";

import { useRouter } from "next/navigation";
import styles from "./ChildProfileCard.module.scss";

export default function ChildProfileCard({ name, birth, src, idx, bgColor }) {
    const router = useRouter();

    return (
        <div className={styles.profileCard} style={{ backgroundColor: bgColor }} onClick={() => router.push("/parent/child")}>
            <img className={styles.closeButton} src="close.png" alt="" />
            <div className={styles.profileInput}>
                <img className={styles.profileImg} src={src} alt="" />
            </div>
            <h1 className={styles.profileName}>{name}</h1>
            <h2 className={styles.profileBirth}>{birth}</h2>
        </div>
    );
}
