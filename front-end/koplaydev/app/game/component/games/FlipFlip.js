import BackScoreBtn from "@/app/component/buttons/BackScoreBtn";
import styles from "./FlipFlip.module.scss";
import GameBg from "@/app/component/background/GameBg";
import GameStartBtn from "../GameStartBtn";
import FlipFlipGameCardArray from "../flipflip/FlipFlipGameCardDeck";



export default function FilpFlip() {
    // 선택한 레벨
    const chooseLevel = 5; 

    return (
        <>

            <BackScoreBtn text="뒤로가기" left="1vw" top="3vh" />
            <BackScoreBtn score="5" question="5" left="86vw" top="3vh" />
            {/* <GameStartBtn /> */}

            <FlipFlipGameCardArray Level={chooseLevel}/>
            <GameBg />
        </>
    );
}