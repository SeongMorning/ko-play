"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./DetailpageChildProfileCard.module.scss";
import CheckChildInfo from "./CheckChildInfo";
import Correct from "../child/[id]/statistic/component/Correct";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";
import ClickedPinkBtn from "../child/[id]/component/ClickedPinkBtn";
import YellowBox from "../child/[id]/component/YellowBox";
import { changeParentChaildStatistic } from "@/redux/slices/parentChaildStatisticSlice";

export default function DetailpageChildProfileCard({ child }) {
    const parent = useSelector((state) => state.parent)
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    let myPageList = ["정답률", "진도 현황", "성취도 비교", "스냅샷"];


    const clickIcon = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const fetchstudentStatistics = async () => {
            const res = await parentChildStatisticsAxios(child.id);
            changeParentChaildStatistic(res);
        };
        fetchstudentStatistics();
    }, []);


    const MyPageSelector = (props) => {
        const [statistic, setStatistic] = useState([[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]);
        const [score, setScore] = useState([])
        useEffect(() => {
            const fetchstudentStatistics = async () => {
                const res = await parentChildStatisticsAxios(child.id);
                changeParentChaildStatistic(res);
            };
            fetchstudentStatistics();
        }, []);
    }

    return (
        <>
            <div>
                <div className={styles.profileCardBg}></div>
                <div className={styles.profileCard}>
                    <img
                        className={styles.settingIcon}
                        src="/settingIcon2.png"
                        onClick={clickIcon}
                    />
                    <div className={styles.profileInput}>
                        <div className={styles.profileImgBg}>
                            <img
                                className={styles.profileImg}
                                src={child.profileImg || "/hehe.png"}
                                onError={(e) => { e.target.src = "/hehe.png"; }}
                            />
                        </div>
                        <h1 className={styles.profileName}>{child.name}</h1>
                    </div>
                </div>
                <div>
                    <div className={styles.inputTotal}>
                        <div className={styles.MyPagePink}>
                            {myPageList.map((data, index) => (
                                <ClickedPinkBtn
                                    key={index}
                                    width={"100"}
                                    height={"15"}
                                    text={data}
                                    idx={index + 1}
                                    onClick={() =>
                                        router.push(`parent/child/${child.id}/statistic?view=${index + 1}`)
                                    }
                                />
                            ))}
                        </div>
                        <div className={styles.MyPageYellow}>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <CheckChildInfo onClose={closeModal} child={child} />}
        </>
    );
}
