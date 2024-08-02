import WordRain from "../component/games/WordRain";

// 단어비 게임 페이지.
export default function game({params}) {
  return (
    <>
      <GameSelector gameidx={params.id}/>
    </>
  );
}

const GameSelector = (props) => {
  if(props.gameidx === '1'){
    return <WordRain/>;
  }else if(props.gameidx === '2'){
    return "두번째 게임";
  }
}