"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DetailBox from "./DetailBox";
import styles from "./DetailpageChildProfileCard.module.scss";
import CheckChildInfo from "./CheckChildInfo";

export default function DetailpageChildProfileCard({ child }) {
    const router = useRouter();
    const [ openModal, setOpenModal ] = useState(false);

    const clickIcon = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <><div>
            <div className={`${styles.profileCardBg}`}></div>
            <div className={`${styles.profileCard}`}>

                    <img
                    className={styles.settingIcon}
                    src="/settingIcon2.png"
                    onClick={clickIcon} />
                <div className={styles.profileInput}>
                    <div className={styles.profileImgBg}>
                        <img className={styles.profileImg} src={child.profileImg || "/hehe.png"} onError={(e) => { e.target.src = "/hehe.png"; }}/>
                    </div>
                    <h1 className={styles.profileName}>{child.name}</h1>
                </div>
            </div>

            <div className={styles.inputTotal}>
                <div className={styles.inputContainer}>
                    <div className={styles.detailBox}>
                        <DetailBox
                            onClick={() => router.push("/parent/child/statistic")}
                            text="분야별, 레벨별 정답률"
                            width={220}
                            height={92} />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.detailBox}>
                        <DetailBox
                            onClick={() => router.push("/parent/child/statistic")}
                            text="학습 진도 현황"
                            width={220}
                            height={92} />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.detailBox}>
                        <DetailBox
                            onClick={() => router.push("/parent/child/statistic")}
                            text="학습 성취도 비교"
                            width={220}
                            height={92} />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.detailBox}>
                        <DetailBox
                            onClick={() => router.push("/parent/child/statistic")}
                            text="주간 학습 리포트"
                            width={220}
                            height={92} />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.detailBox}>
                        <DetailBox
                            onClick={() => router.push("/parent/child/statistic")}
                            text="스냅샷"
                            width={220}
                            height={92} />
                    </div>
                </div>
            </div>
        </div>
        { openModal && <CheckChildInfo onClose={closeModal}  child={child} />}
        </>
    )
}