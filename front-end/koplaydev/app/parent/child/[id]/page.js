"use client";

import styles from "./page.module.scss";
import ParentBg from "@/app/component/background/ParentBg";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import { useSelector } from "react-redux";
import DetailpageChildProfileCard from "./component/DetailpageChildProfileCard";
import useSound from "@/app/utils/useSound";

const albumBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/albumBGM.wav';

export default function Child({ params }) {
    useSound(albumBGM, 0.8, 0);
    const translationWords = useSelector((state) => state.translationWords);

    //id로 해당 계정 정보 가져오기
    const selectProfileById = (state, id) => {
        return state.parentChilds.find(profile => profile.id === id)
    };

    const profile = useSelector(state => selectProfileById(state, params.id));
    // console.log(params.id)

    return (
        <>
            <div>
                <BackScoreBtn className={styles.backButton} left={27} top={20} text={translationWords.backScoreBtn} />
            </div>
            <div>
                <DetailpageChildProfileCard child={profile} />
                <ParentBg />
            </div>
        </>
    );
}