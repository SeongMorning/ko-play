"use client"

import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./FlipFlip.module.scss";
import GameBg from "@/app/component/background/GameBg";
import GameStartBtn from "../GameStartBtn";
import FlipFlipGame from "../flipflip/FlipFlipGame";
import { useState } from "react";



export default function FilpFlip() {

    // 선택한 레벨
    const chooseLevel = 3;

    const getQuestion = () => { 
    if(chooseLevel === 1 || chooseLevel === 2) {
        return 4;
    } else if(chooseLevel === 3 || chooseLevel === 4) {
        return 6;
    } else {
        return 8;
    }}

    const question = getQuestion();

    return (
        <>

            {/* <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" /> */}
            <BackScoreBtn score={question} question={question} left="86vw" top="3vh" />
            {/* <GameStartBtn /> */}

            {/* <FlipFlipGame Level={chooseLevel} Recommend={recommendLevel}/> */}
            <FlipFlipGame />
            <GameBg />

        </>
    );
}