'use client'

import { useSelector } from "react-redux"
import GameStartBtn from "./GameStartBtn";
import WordRainStart from "./WordRainStart";
import WordRainEnd from "./WordRainEnd";

export default function WordRainGame(){
    const loading = useSelector((state)=> state.loading);
    if(loading === -1){
        return <GameStartBtn/>
    }else if(loading === 0){
        return <WordRainStart/>
    }else if(loading === 1){
        return <WordRainEnd />
    }else{
        return "뭔가 잘못됐습니다"
    }
}