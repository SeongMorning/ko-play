'use client'

import { useSelector } from "react-redux";
import ClickedPinkBtn from "./ClickedPinkBtn";
import styles from "./MyPageInfo.module.scss";
import YellowBox from "./YellowBox";
import Score from "./Score";
import Correct from "./Correct";

let myPageList = ["최근 전적", "정답률", "경험치 변화", "레이팅"];

export default function MyPageInfo() {
  const myPageIdx = useSelector((state) => state.myPage);
  return (
    <div className={styles.MyPageInfo}>
      <div className={styles.MyPagePink}>
        {myPageList.map((data, index) => (
          <ClickedPinkBtn width={"100"} height={"15"} text={data} idx={index+1}/>
        ))}
      </div>
      <div className={styles.MyPageYellow}>
        <YellowBox width={"100"} height={"100"}>
          <MyPageSelector idx={myPageIdx} />
        </YellowBox>
      </div>
    </div>
  );
}

const MyPageSelector = (props) => {
  if (props.idx === 1) {
    return <Score/>;
  }else if(props.idx === 2){
    return <Correct/>;
  }else if(props.idx === 3){
    return 3;
  }else{
    return "    2차개발 드가자";
  }
};
