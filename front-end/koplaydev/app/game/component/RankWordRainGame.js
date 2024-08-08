'use client'

import { useSelector } from "react-redux"
import WordRainEnd from "./WordRainEnd";
import RankTest2 from "./rankgame/RankTest2";
import RankGameStartBtn from "./RankGameStartBtn";

export default function RankWordRainGame(){
    const loading = useSelector((state)=> state.loading);
    if(loading === -1){
        return <RankGameStartBtn/>
    }else if(loading === 0){
        return <RankTest2/>
    }else if(loading === 1){
        return <WordRainEnd />
    }else{
        return "뭔가 잘못됐습니다"
    }
}