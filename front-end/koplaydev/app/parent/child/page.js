"use client";

import styles from "./page.module.scss";
import DetailpageChildProfileCard from "../component/DetailpageChildProfileCard";
import ParentBg from "@/app/component/background/ParentBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";


export default function Child() {
    return (
        <>
        <div><BackScoreBtn className={styles.backButton} left={27} top={20} text="뒤로가기" /></div>
        <div>
            <DetailpageChildProfileCard name="홍길동"/>            
            <ParentBg />
        </div>
    </>
    );
}