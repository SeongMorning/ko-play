"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DetailpageChildProfileCard.module.scss";
import CheckChildInfo from "./CheckChildInfo";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";
import { changeParentChaildStatistic } from "@/redux/slices/parentChaildStatisticSlice";
import ClickedPinkBtn from "./ClickedPinkBtn";

export default function DetailpageChildProfileCard({ child }) {
    const parent = useSelector((state) => state.parent)
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const statisticData = useSelector((state) => state.parentChaildStatistic)

    let myPageList = ["분야별/레벨별 정답률", "진도 현황", "성취도 비교", "스냅샷"];


    const clickIcon = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const fetchstudentStatistics = async () => {
            const res = await parentChildStatisticsAxios(child.id);
            dispatch(changeParentChaildStatistic(res));
        };
        fetchstudentStatistics();
    }, []);

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
                                    id={child.id}
                                    idx={index + 1}
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
