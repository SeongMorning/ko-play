import WordRain from "../component/games/WordRain";
import Smugogae from "../component/games/Smugogae";
import FilpFlip from "../component/games/FlipFlip";
import RankTest from "../component/rankgame/rankTest";

// async function fetchData() {
//   // 실제 데이터 패칭
//   await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기 (데이터 패칭 시뮬레이션)
// }

export default async function game({ params }) {

  return <GameSelector gameidx={params.id} />;
}

const GameSelector = (props) => {
  if (props.gameidx === "1") {
    return <WordRain />;
  } else if (props.gameidx === "2") {
    return <FilpFlip />;
  } else if (props.gameidx === "3") {
    return <Smugogae />;
  } else if(props.gameidx === "4"){
    return <RankTest />;
  }
};
