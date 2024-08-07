"use client";

import styles from "./page.module.scss";
import DetailpageChildProfileCard from "../../component/DetailpageChildProfileCard";
import ParentBg from "@/app/component/background/ParentBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import { useSelector } from "react-redux";



export default function Child({ params }) {
    //id로 해당 계정 정보 가져오기
    const selectProfileById = (state, id) => {
        return state.parentChilds.find(profile => profile.id === id)
    };

    const profile = useSelector(state => selectProfileById(state, params.id));
    console.log(params.id)

    return (
        <>
            <div><BackScoreBtn className={styles.backButton} left={27} top={20} text="뒤로가기" /></div>
            <div>
                <DetailpageChildProfileCard child={profile} />
                <ParentBg />
            </div>
        </>
    );
}