"use client"

import { useSelector } from "react-redux";
import styles from "./FlipFlip.module.scss";
import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import GameBg from "@/app/component/background/GameBg";
import FlipFlipGame from "../flipflip/FlipFlipGame";




export default function FilpFlip() {
    const FlipFlipLevel = useSelector((state) => state.level);
    // console.log(FlipFlipLevel[1]);
    
    const getQuestion = () => { 
    if(FlipFlipLevel[1] === 1 || FlipFlipLevel[1] === 2) {
        return 4;
    } else if(FlipFlipLevel[1] === 3 || FlipFlipLevel[1] === 4) {
        return 6;
    } else {
        return 8;
    }}

    const question = getQuestion();

    return (
        <>

            {/* <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" /> */}
            <BackScoreBtn score={question} question={question} left="86vw" top="3vh" />
            <FlipFlipGame />
            <GameBg />

        </>
    );
}